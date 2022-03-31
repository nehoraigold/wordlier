import { DEFAULT_WORD_LENGTH } from '../../utils/constants';
import { AnswerRetrieverFactory } from '../../answer_retriever/AnswerRetrieverFactory';
import { AnswerRetrieverType } from '../../answer_retriever/AnswerRetrieverType';
import { IAnswerRetriever } from '../../answer_retriever/IAnswerRetriever';
import { CliGuessRetriever } from '../../guess_retriever/CliGuessRetriever';
import { GuessValidatorFactory } from '../../guess_validator/GuessValidatorFactory';
import { GuessValidatorType } from '../../guess_validator/GuessValidatorType';
import { IGuessValidator } from '../../guess_validator/IGuessValidator';
import { InitializationParams } from '../../utils/InitializationParams';
import { WordnikApiClient } from '../../utils/WordnikApiClient';
import { CliAppConfig } from './CliAppConfig';
import { CliRenderer } from '../../utils/CliRenderer';
import { Game } from '../../game/Game';
import { IApp } from '../IApp';

export class CliApp implements IApp {
    private readonly config: CliAppConfig;
    private answerRetriever: IAnswerRetriever;
    private guessValidator: IGuessValidator;

    constructor(config: CliAppConfig) {
        this.config = config;
        this.answerRetriever = null;
        this.guessValidator = null;
    }

    public async Initialize(): Promise<boolean> {
        try {
            const initializationParams = this.createInitializationParams();
            this.answerRetriever = AnswerRetrieverFactory.Create(this.config.answerRetrieverType, initializationParams);
            this.guessValidator = GuessValidatorFactory.Create(this.config.guessValidatorType, initializationParams);
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    private createInitializationParams(): InitializationParams {
        const initializationParams = {} as InitializationParams;

        const { answerRetrieverType, guessValidatorType } = this.config;
        if (
            answerRetrieverType === AnswerRetrieverType.WORDNIK_API ||
            guessValidatorType === GuessValidatorType.WORDNIK_API
        ) {
            const { wordnikApiKey } = this.config;
            initializationParams.wordnikClient = new WordnikApiClient(wordnikApiKey);
        }

        return initializationParams;
    }

    public async Run(): Promise<void> {
        const game = new Game();
        const answer = await this.answerRetriever.RetrieveAnswer(DEFAULT_WORD_LENGTH);
        const guessRetriever = new CliGuessRetriever(DEFAULT_WORD_LENGTH, this.guessValidator);

        if (!(await game.Start({ answer }))) {
            CliRenderer.Error('Unable to start game!');
            return;
        }

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
