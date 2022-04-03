import { AnswerRetrieverType } from '../answer_retriever/AnswerRetrieverType';
import { AppConfig } from '../app/AppConfig';
import { GuessValidatorType } from '../guess_validator/GuessValidatorType';
import { InitializationParams } from './InitializationParams';
import { WordnikApiClient } from './WordnikApiClient';

export const CreateInitializationParams = (config: AppConfig) => {
    const initializationParams = {} as InitializationParams;

    const { answerRetrieverType, guessValidatorType } = config;
    if (
        answerRetrieverType === AnswerRetrieverType.WORDNIK_API ||
        guessValidatorType === GuessValidatorType.WORDNIK_API
    ) {
        const { wordnikApiKey } = config;
        initializationParams.wordnikClient = new WordnikApiClient(wordnikApiKey);
    }

    if (guessValidatorType === GuessValidatorType.REGEX) {
        initializationParams.wordLength = config.wordLength;
    }
    return initializationParams;
};
