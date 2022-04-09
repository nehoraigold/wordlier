import { GuessResultType } from './GuessResultType';
import { GuessType } from './GuessType';

export type GameState = {
    answer: GuessType;
    history?: Array<GuessResultType>;
    turnCount?: number;
};
