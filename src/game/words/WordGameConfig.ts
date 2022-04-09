import { GuessValidatorType } from '../abstract/GuessValidatorType';
import { StringAnswerRetrieverType } from './answer_retriever/StringAnswerRetrieverType';
import { WordResult } from './guess_processor/WordResult';

export type WordGameConfig = {
    wordLength: number;
    turnCount: number;
    answerRetrieverType: StringAnswerRetrieverType;
    guessValidatorTypes?: GuessValidatorType[];
    wordnikApiKey?: string;
    history?: Array<WordResult>;
};
