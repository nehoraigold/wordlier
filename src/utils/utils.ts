import fs from 'fs';

import { StringAnswerRetrieverType } from '../game/words/answer_retriever/StringAnswerRetrieverType';
import { AppConfig } from '../app/AppConfig';
import { GuessValidatorType } from '../game/abstract/GuessValidatorType';
import { InitializationParams } from './InitializationParams';
import { WordnikApiClient } from '../game/words/WordnikApiClient';

export const CreateInitializationParams = (config: AppConfig) => {
    const initializationParams = { ...config } as InitializationParams;

    const { stringAnswerRetrieverType, guessValidatorType } = config;
    if (
        stringAnswerRetrieverType === StringAnswerRetrieverType.WORDNIK_API ||
        guessValidatorType === GuessValidatorType.WORDNIK_API
    ) {
        const { wordnikApiKey } = config;
        initializationParams.wordnikClient = new WordnikApiClient(wordnikApiKey);
    }

    return initializationParams;
};

export const LoadJson = (filepath: string) => {
    if (!fs.existsSync(filepath)) {
        return null;
    }
    const contents = fs.readFileSync(filepath, 'utf8');
    return JSON.parse(contents);
};

export const ForArrayOrValue = async (
    value: Array<unknown> | unknown,
    callback: (value: unknown) => void | Promise<void>,
) => {
    if (Array.isArray(value)) {
        for (const val of value) {
            await callback(value);
        }
    } else {
        await callback(value);
    }
};
