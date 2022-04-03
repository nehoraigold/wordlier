import { AppMode } from './AppMode';
import { AnswerRetrieverType } from '../answer_retriever/AnswerRetrieverType';
import { GuessValidatorType } from '../guess_validator/GuessValidatorType';
import { ApiProtocolType } from './server/protocol/ApiProtocolType';

export type AppConfig = {
    appMode: AppMode;
    answerRetrieverType: AnswerRetrieverType;
    guessValidatorType: GuessValidatorType;
    apiProtocolType?: ApiProtocolType;
    wordnikApiKey?: string;
};
