import { ElementGameConfig } from '../../game/elements/ElementGameConfig';
import { GameFactory } from '../../game/GameFactory';
import { WordGameConfig } from '../../game/words/WordGameConfig';
import { DEFAULT_WORD_LENGTH } from '../../utils/constants';
import { AnswerRetrieverFactory } from '../../game/abstract/answer_retriever/AnswerRetrieverFactory';
import { IAnswerRetriever } from '../../game/abstract/answer_retriever/IAnswerRetriever';
import { GameState } from '../../game/GameState';
import { CliGuessRetriever } from './guess_retriever/CliGuessRetriever';
import { GuessValidatorFactory } from '../../game/abstract/guess_validator/GuessValidatorFactory';
import { IGuessValidator } from '../../game/abstract/guess_validator/IGuessValidator';
import { AppConfig } from '../AppConfig';
import { CliRenderer } from './CliRenderer';
import { IApp } from '../IApp';

export class CliApp implements IApp {
    private readonly config: AppConfig;
    private readonly gameConfig: WordGameConfig | ElementGameConfig;
    private answerRetriever: IAnswerRetriever;
    private guessValidator: IGuessValidator;

    constructor(config: AppConfig) {
        this.config = config;
        this.gameConfig = config.gameConfigs[config.gameType];
        this.answerRetriever = null;
        this.guessValidator = null;
    }

    public async Initialize(): Promise<boolean> {
        try {
            this.answerRetriever = AnswerRetrieverFactory.Create(this.config);
            this.guessValidator = GuessValidatorFactory.Create(this.config);
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    public async Run(): Promise<void> {
        const answer = await this.answerRetriever.RetrieveAnswer();
        const guessRetriever = new CliGuessRetriever(DEFAULT_WORD_LENGTH, this.guessValidator);
        const gameState: GameState = {
            answer,
            turnCount: this.gameConfig.turnCount,
        };
        const game = GameFactory.Create(this.config.gameType, gameState);

        while (!game.IsOver) {
            CliRenderer.Title(`Turn ${game.TurnNumber}`);
            const guess = await guessRetriever.RetrieveGuess();
            const result = await game.PlayTurn(guess);
            CliRenderer.Result(result);
            CliRenderer.NewLine();
        }
        const message = game.DidWin ? 'You win!' : `You lost. The answer was was ${(answer as string).toUpperCase()}.`;
        CliRenderer.Message(message);
    }

    public async Close(): Promise<void> {
        return;
    }
}
