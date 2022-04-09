import { GuessValidatorType } from '../abstract/GuessValidatorType';
import { WordAnswerRetrieverType } from './answer_retriever/WordAnswerRetrieverType';
import { WordResult } from './guess_processor/WordResult';
import { WordnikApiClient } from './WordnikApiClient';

export type WordGameConfig = {
    wordLength: number;
    turnCount: number;
    answerRetrieverType: WordAnswerRetrieverType;
    guessValidatorTypes?: GuessValidatorType[];
    wordnikApiKey?: string;
    wordnikApiClient?: WordnikApiClient;
    history?: Array<WordResult>;
};
