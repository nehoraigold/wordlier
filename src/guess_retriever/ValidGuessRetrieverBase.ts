import { CompositeGuessValidator } from '../guess_validator/CompositeGuessValidator';
import { IGuessValidator } from '../guess_validator/IGuessValidator';
import { RegexGuessValidator } from '../guess_validator/RegexGuessValidator';
import { IGuessRetriever } from './IGuessRetriever';

export abstract class ValidGuessRetrieverBase implements IGuessRetriever {
    private readonly guessValidator: IGuessValidator;

    protected constructor(wordLength: number, guessValidator?: IGuessValidator) {
        const regexGuessValidator = new RegexGuessValidator(wordLength);
        this.guessValidator = guessValidator
            ? new CompositeGuessValidator([regexGuessValidator, guessValidator])
            : regexGuessValidator;
    }

    public async RetrieveGuess(): Promise<string> {
        let guess = '';
        while (!(await this.guessValidator.Validate(guess))) {
            guess = await this.retrieve();
        }
        return guess.toLowerCase();
    }

    protected abstract retrieve(): Promise<string>;
}
