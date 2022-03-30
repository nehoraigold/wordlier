export interface IGuessValidator {
    Validate(guess: string): Promise<boolean>;
}
