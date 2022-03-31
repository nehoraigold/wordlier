import { AnswerRetrieverType } from '../../answer_retriever/AnswerRetrieverType';
import { GuessValidatorType } from '../../guess_validator/GuessValidatorType';

export type CliAppConfig = {
    answerRetrieverType: AnswerRetrieverType;
    guessValidatorType: GuessValidatorType;
    wordnikApiKey?: string;
};
