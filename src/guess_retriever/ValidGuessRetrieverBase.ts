import { IGuessValidator } from '../guess_validator/IGuessValidator';
import { IGuessRetriever } from './IGuessRetriever';

export abstract class ValidGuessRetrieverBase implements IGuessRetriever {
    private readonly validatorRegex: RegExp;
    private readonly guessValidator: IGuessValidator;

    protected constructor(wordLength: number, guessValidator?: IGuessValidator) {
        this.validatorRegex = new RegExp(`^[A-Za-z]{${wordLength}}$`);
        this.guessValidator = guessValidator;
    }

    public async RetrieveGuess(): Promise<string> {
        let guess = '';
        while (!(await this.isValidGuess(guess))) {
            guess = await this.retrieve();
        }
        return guess.toLowerCase();
    }

    protected abstract retrieve(): Promise<string>;

    private async isValidGuess(guess: string): Promise<boolean> {
        if (!this.validatorRegex.test(guess)) {
            return false;
        }

        if (this.guessValidator) {
            return await this.guessValidator.Validate(guess);
        }

        return true;
    }
}
