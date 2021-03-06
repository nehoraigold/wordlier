import { DEFAULT_WORD_LENGTH } from '../../utils/constants';
import { AnswerRetrieverFactory } from '../../answer_retriever/AnswerRetrieverFactory';
import { IAnswerRetriever } from '../../answer_retriever/IAnswerRetriever';
import { CliGuessRetriever } from '../../guess_retriever/CliGuessRetriever';
import { GuessValidatorFactory } from '../../guess_validator/GuessValidatorFactory';
import { IGuessValidator } from '../../guess_validator/IGuessValidator';
import { CreateInitializationParams } from '../../utils/utils';
import { AppConfig } from '../AppConfig';
import { CliRenderer } from '../../utils/CliRenderer';
import { Game } from '../../game/Game';
import { IApp } from '../IApp';

export class CliApp implements IApp {
    private readonly config: AppConfig;
    private answerRetriever: IAnswerRetriever;
    private guessValidator: IGuessValidator;

    constructor(config: AppConfig) {
        this.config = config;
        this.answerRetriever = null;
        this.guessValidator = null;
    }

    public async Initialize(): Promise<boolean> {
        try {
            const initializationParams = CreateInitializationParams(this.config);
            this.answerRetriever = AnswerRetrieverFactory.Create(this.config.answerRetrieverType, initializationParams);
            this.guessValidator = GuessValidatorFactory.Create(this.config.guessValidatorType, initializationParams);
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    public async Run(): Promise<void> {
        const answer = await this.answerRetriever.RetrieveAnswer(DEFAULT_WORD_LENGTH);
        const guessRetriever = new CliGuessRetriever(DEFAULT_WORD_LENGTH, this.guessValidator);
        const game = new Game(answer);

        while (!game.IsOver) {
            CliRenderer.Title(`Turn ${game.TurnNumber}`);
            const guess = await guessRetriever.RetrieveGuess();
            const result = await game.PlayTurn(guess);
            CliRenderer.Result(result);
            CliRenderer.NewLine();
        }
        const message = game.DidWin ? 'You win!' : `You lost. The word was ${answer.toUpperCase()}.`;
        CliRenderer.Message(message);
    }

    public async Close(): Promise<void> {
        return;
    }
}
