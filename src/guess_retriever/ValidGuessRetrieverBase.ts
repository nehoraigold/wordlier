import { CompositeGuessValidator } from '../game/words/guess_validator/CompositeGuessValidator';
import { IGuessValidator } from '../game/abstract/guess_validator/IGuessValidator';
import { RegexGuessValidator } from '../game/words/guess_validator/RegexGuessValidator';
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
        let isFirstGuess = true;
        while (!(await this.guessValidator.Validate(guess))) {
            guess = await this.retrieve(isFirstGuess);
            isFirstGuess = false;
        }
        return guess.toLowerCase();
    }

    protected abstract retrieve(isFirstGuess: boolean): Promise<string>;
}
