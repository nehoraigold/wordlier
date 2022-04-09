import { AnswerTypeMap } from '../game/abstract/AnswerType';
import { AppMode } from './AppMode';
import { StringAnswerRetrieverType } from '../game/words/answer_retriever/StringAnswerRetrieverType';
import { GuessValidatorType } from '../game/abstract/GuessValidatorType';
import { ApiProtocolType } from './server/protocol/ApiProtocolType';

export type AppConfig = {
    appMode: AppMode;
    gameType: keyof AnswerTypeMap;
    stringAnswerRetrieverType: StringAnswerRetrieverType;
    guessValidatorType: GuessValidatorType;
    apiProtocolType?: ApiProtocolType;
    wordnikApiKey?: string;
    wordLength?: number;
    turnCount?: number;
};
