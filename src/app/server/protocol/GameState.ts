import { WordResult } from '../../../game/words/guess_processor/WordResult';

export type GameState = {
    answer: string;
    history: Array<WordResult>;
    turnCount?: number;
};
