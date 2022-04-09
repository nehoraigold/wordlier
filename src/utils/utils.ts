import fs from 'fs';
import { AppConfig } from '../app/AppConfig';
import { GuessValidatorType } from '../game/abstract/GuessValidatorType';
import { GameType } from '../game/GameType';

import { StringAnswerRetrieverType } from '../game/words/answer_retriever/StringAnswerRetrieverType';
import { WordGameConfig } from '../game/words/WordGameConfig';
import { WordnikApiClient } from '../game/words/WordnikApiClient';
import { InitializationParams } from './InitializationParams';

export const CreateInitializationParams = (config: AppConfig) => {
    const { gameType, gameConfigs } = config;

    switch (gameType) {
        case GameType.WORD:
            return createWordGameInitializationParams(gameConfigs[gameType]);
        case GameType.ELEMENT:
            return {};
        default:
            throw `Unknown game type ${gameType}`;
    }
};

const createWordGameInitializationParams = (gameConfig: WordGameConfig): InitializationParams => {
    const initializationParams: InitializationParams = Object.assign({}, gameConfig);
    const { answerRetrieverType, guessValidatorTypes } = gameConfig;
    if (
        answerRetrieverType === StringAnswerRetrieverType.WORDNIK_API ||
        guessValidatorTypes.includes(GuessValidatorType.WORDNIK_API)
    ) {
        const { wordnikApiKey } = gameConfig;
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

export const IsSelectionValid = <T>(selection: T, options: Array<T> | Record<string, T>) => {
    if (!Array.isArray(options)) {
        options = Object.values(options);
    }
    return options.includes(selection);
};

export const ForArrayOrValue = async <Type>(
    value: Array<Type> | Type,
    callback: (value: Type) => void | Promise<void>,
) => {
    if (Array.isArray(value)) {
        for (const val of value) {
            await callback(val);
        }
    } else {
        await callback(value);
    }
};
