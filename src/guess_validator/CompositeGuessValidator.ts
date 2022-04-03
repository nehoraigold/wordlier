import { IGuessValidator } from './IGuessValidator';

export class CompositeGuessValidator implements IGuessValidator {
    private readonly validators: Array<IGuessValidator>;

    constructor(guessValidators: Array<IGuessValidator>) {
        this.validators = guessValidators;
    }

    public async Validate(guess: string): Promise<boolean> {
        for (const validator of this.validators) {
            if (!(await validator.Validate(guess))) {
                return false;
            }
        }
        return true;
    }
}
