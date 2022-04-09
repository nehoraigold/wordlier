import { GuessType } from '../../GuessType';

export interface IGuessValidator {
    Validate(guess: GuessType): Promise<boolean>;
}
