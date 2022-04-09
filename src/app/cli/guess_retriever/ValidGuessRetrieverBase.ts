import { IGuessValidator } from '../../../game/abstract/guess_validator/IGuessValidator';
import { IGuessRetriever } from './IGuessRetriever';

export abstract class ValidGuessRetrieverBase implements IGuessRetriever {
    private readonly guessValidator: IGuessValidator;

    protected constructor(guessValidator?: IGuessValidator) {
        this.guessValidator = guessValidator;
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
