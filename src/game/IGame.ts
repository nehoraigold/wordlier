import { GuessType } from './GuessType';
import { GuessResultType } from './GuessResultType';

export interface IGame {
    PlayTurn(guess: GuessType): Promise<GuessResultType>;
    History: Array<GuessResultType>;
    Answer: GuessType;
    TurnNumber: number;
    DidWin: boolean;
    IsOver: boolean;
}
