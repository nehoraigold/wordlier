import { StringAnswerRetrieverType } from '../game/words/answer_retriever/StringAnswerRetrieverType';
import { WordnikApiClient } from '../game/words/WordnikApiClient';

export type InitializationParams = {
    stringAnswerRetrieverType?: StringAnswerRetrieverType;
    wordnikClient?: WordnikApiClient;
    wordLength?: number;
};
