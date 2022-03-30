import { DEFAULT_TURN_COUNT, DEFAULT_WORD_LENGTH } from '../utils/constants';
import { AnswerRetrieverFactory } from '../answer_retriever/AnswerRetrieverFactory';
import { AnswerRetrieverType } from '../answer_retriever/AnswerRetrieverType';
import { IAnswerRetriever } from '../answer_retriever/IAnswerRetriever';
import { CliGuessRetriever } from '../guess_retriever/CliGuessRetriever';
import { GuessValidatorFactory } from '../guess_validator/GuessValidatorFactory';
import { GuessValidatorType } from '../guess_validator/GuessValidatorType';
import { IGuessValidator } from '../guess_validator/IGuessValidator';
import { InitializationParams } from '../utils/InitializationParams';
import { WordnikApiClient } from '../utils/WordnikApiClient';
import { CliAppConfig } from './CliAppConfig';
import { CliRenderer } from './CliRenderer';
import { Game } from '../game/Game';
import { IApp } from './IApp';

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
            this.guessValidator = GuessValidatorFactory.Create(this.config.guessValidatorType, initializationParams);
            this.answerRetriever = AnswerRetrieverFactory.Create(this.config.answerRetrieverType, initializationParams);
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    private createInitializationParams(): InitializationParams {
        const initializationParams = {} as InitializationParams;
        if (
            this.config.answerRetrieverType === AnswerRetrieverType.WORDNIK_API ||
            this.config.guessValidatorType === GuessValidatorType.WORDNIK_API
        ) {
            const { wordnikApiKey } = this.config;
            initializationParams.wordnikClient = new WordnikApiClient(wordnikApiKey);
        }
        return initializationParams;
    }

    public async Run(): Promise<void> {
        const answer = await this.answerRetriever.RetrieveAnswer(DEFAULT_WORD_LENGTH);

        const game = new Game(new CliGuessRetriever(DEFAULT_WORD_LENGTH), this.guessValidator);
        if (!(await game.Start({ turnCount: DEFAULT_TURN_COUNT, answer }))) {
            CliRenderer.Error('Unable to start game!');
            return;
        }

        while (!game.IsOver) {
            CliRenderer.Title(`Turn ${game.TurnNumber}`);
            const result = await game.PlayTurn();
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
