import { IGuessValidator } from '../../abstract/guess_validator/IGuessValidator';

export class RegexGuessValidator implements IGuessValidator {
    private readonly validatorRegex: RegExp;

    constructor(wordLength: number) {
        this.validatorRegex = new RegExp(`^[A-Za-z]{${wordLength}}$`);
    }

    public async Validate(guess: string): Promise<boolean> {
        return this.validatorRegex.test(guess);
    }
}
