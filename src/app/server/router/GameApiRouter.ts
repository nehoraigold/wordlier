import { Request, Response } from 'express';
import { IAnswerRetriever } from '../../../game/abstract/answer_retriever/IAnswerRetriever';
import { ElementGameConfig } from '../../../game/elements/ElementGameConfig';
import { GameFactory } from '../../../game/GameFactory';
import { GameType } from '../../../game/GameType';
import { IGame } from '../../../game/IGame';
import { RegexGuessValidator } from '../../../game/words/guess_validator/RegexGuessValidator';
import { WordGameConfig } from '../../../game/words/WordGameConfig';
import { SERVICE_JSON_FIELD } from '../../../utils/constants';
import { AppConfig } from '../../AppConfig';
import { ApiProtocolFactory } from '../protocol/ApiProtocolFactory';
import { GameState } from '../../../game/GameState';
import { IGameApiProtocol } from '../protocol/IGameApiProtocol';
import { RouterBase } from './RouterBase';

export class GameApiRouter extends RouterBase {
    private readonly config: AppConfig;
    private readonly gameConfig: WordGameConfig | ElementGameConfig;
    private readonly gameRoute: string;
    private readonly protocol: IGameApiProtocol;
    private readonly answerRetriever: IAnswerRetriever;

    constructor(config: AppConfig, answerRetriever: IAnswerRetriever) {
        super();
        this.config = config;
        this.gameConfig = config.gameConfigs[config.gameType];
        this.gameRoute = '/game';
        this.answerRetriever = answerRetriever;
        this.protocol = ApiProtocolFactory.Create(config.serverConfig);
    }

    protected initializeRouter(): void {
        this.router.get(`${this.gameRoute}/new`, async (req, res) => {
            try {
                const answer = await this.answerRetriever.RetrieveAnswer();
                const gameState: GameState = {
                    answer,
                    turnCount: this.gameConfig.turnCount,
                };
                const game = GameFactory.Create(this.config.gameType, gameState);
                res = this.protocol.ToResponse(game, res);
                this.handle200Ok(res);
            } catch (err) {
                global.logger.Error(err);
                this.handle500ServerError(res);
            }
        });

        this.router.post(`${this.gameRoute}/turn`, async (req, res) => {
            const game = this.protocol.FromRequest(req);
            if (!game) {
                return this.handle400BadRequest(res, 'unable to parse game from request');
            }
            if (game.IsOver) {
                return this.handle400BadRequest(res, 'turn cannot be played on a completed game');
            }

            const guess = this.extractGuessFromBody(req, game);
            if (!guess) {
                return this.handle400BadRequest(res, 'invalid guess');
            }

            await this.handleValidRequest(res, game, guess);
        });
    }

    private handle400BadRequest(res: Response, error: string): void {
        res.status(400).json({ error });
    }

    private handle500ServerError(res: Response): void {
        res.sendStatus(500);
    }

    private handle200Ok(res: Response): void {
        const jsonResponse = { ...res.locals[SERVICE_JSON_FIELD] };
        res.status(200).json(jsonResponse);
    }

    private async handleValidRequest(res: Response, game: IGame, guess: string): Promise<void> {
        await game.PlayTurn(guess);
        res.locals[SERVICE_JSON_FIELD] = {};
        res = this.protocol.ToResponse(game, res);

        Object.assign(res.locals[SERVICE_JSON_FIELD], {
            message: this.getPlayTurnResponseMessage(guess, game),
        });
        this.handle200Ok(res);
    }

    private extractGuessFromBody(req: Request, game: IGame): string {
        const pattern = new RegexGuessValidator((game.Answer as string).length);
        const { guess } = req.body;
        if (guess && pattern.Validate(guess)) {
            return guess;
        }
        return '';
    }

    private getPlayTurnResponseMessage(guess: string, game: IGame): string {
        if (game.DidWin) {
            return `Congratulations! The word was ${game.Answer}.`;
        } else if (game.IsOver) {
            return `You lost. The word was ${game.Answer}.`;
        }
        return `You guessed ${guess}.`;
    }
}
