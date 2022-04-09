import { AnswerRetrieverFactory } from '../../game/abstract/answer_retriever/AnswerRetrieverFactory';
import { IAnswerRetriever } from '../../game/abstract/answer_retriever/IAnswerRetriever';
import { GuessValidatorFactory } from '../../game/abstract/guess_validator/GuessValidatorFactory';
import { IGuessValidator } from '../../game/abstract/guess_validator/IGuessValidator';
import { IResultRenderer } from '../../game/abstract/IResultRenderer';
import { ElementGameConfig } from '../../game/elements/ElementGameConfig';
import { ElementGuessRetriever } from '../../game/elements/ElementGuessRetriever';
import { GameFactory } from '../../game/GameFactory';
import { GameState } from '../../game/GameState';
import { GameType } from '../../game/GameType';
import { WordGameConfig } from '../../game/words/WordGameConfig';
import { WordResultCliRenderer } from '../../game/words/WordResultCliRenderer';
import { AppConfig } from '../AppConfig';
import { IApp } from '../IApp';
import { CliRenderer } from './CliRenderer';
import { ResultCliRendererFactory } from './ResultCliRendererFactory';

export class CliApp implements IApp {
    private readonly config: AppConfig;
    private readonly gameConfig: WordGameConfig | ElementGameConfig;
    private answerRetriever: IAnswerRetriever;
    private guessValidator: IGuessValidator;
    private resultRenderer: IResultRenderer;

    constructor(config: AppConfig) {
        this.config = config;
        this.gameConfig = config.gameConfigs[config.gameType];
        this.answerRetriever = null;
        this.guessValidator = null;
        this.resultRenderer = null;
    }

    public async Initialize(): Promise<boolean> {
        try {
            this.answerRetriever = AnswerRetrieverFactory.Create(this.config);
            this.guessValidator = GuessValidatorFactory.Create(this.config);
            this.resultRenderer = ResultCliRendererFactory.Create(this.config.gameType);
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    public async Run(): Promise<void> {
        const answer = await this.answerRetriever.RetrieveAnswer();
        const guessRetriever = new ElementGuessRetriever(
            (this.gameConfig as ElementGameConfig).elementProvider,
            this.guessValidator,
        );
        const gameState: GameState = {
            answer,
            turnCount: this.gameConfig.turnCount,
        };
        const game = GameFactory.Create(this.config.gameType, gameState);

        while (!game.IsOver) {
            CliRenderer.Title(`Turn ${game.TurnNumber}`);
            const guess = await guessRetriever.RetrieveGuess();
            const result = await game.PlayTurn(guess);
            const renderableResult = this.resultRenderer.GetRenderableResult(result);
            CliRenderer.Message(renderableResult);
            CliRenderer.NewLine();
        }
        const message = game.DidWin
            ? 'You win!'
            : `You lost. The answer was ${this.resultRenderer.GetRenderableAnswer(answer)}.`;
        CliRenderer.Message(message);
    }

    public async Close(): Promise<void> {
        return;
    }
}
