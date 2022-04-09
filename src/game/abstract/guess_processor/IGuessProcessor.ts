import { GuessType } from '../../GuessType';
import { GuessResultType } from '../../GuessResultType';

export interface IGuessProcessor {
    Process(guess: GuessType, answer: GuessType): GuessResultType | Promise<GuessResultType>;
}
