import { GuessValidatorType } from '../game/abstract/GuessValidatorType';
import { GuessResultType } from '../game/GuessResultType';
import { StringAnswerRetrieverType } from '../game/words/answer_retriever/StringAnswerRetrieverType';
import { WordnikApiClient } from '../game/words/WordnikApiClient';

export type GameInitializationParams = {
    turnCount?: number;
    history?: Array<GuessResultType>;
};

export type AnswerRetrieverInitializationParams = {
    answerRetrieverType?: StringAnswerRetrieverType;
    wordnikClient?: WordnikApiClient;
    wordLength?: number;
};

export type GuessValidatorInitializationParams = {
    guessValidatorTypes?: Array<GuessValidatorType>;
    wordnikClient?: WordnikApiClient;
};

export type InitializationParams = GameInitializationParams &
    AnswerRetrieverInitializationParams &
    GuessValidatorInitializationParams;
