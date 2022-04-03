import { ProcessedResult } from '../../../game/word_processor/ProcessedResult';

export type GameState = {
    answer: string;
    history: Array<ProcessedResult>;
    turnCount?: number;
};
