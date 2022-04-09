import { IGuessValidator } from '../../abstract/guess_validator/IGuessValidator';
import { IElementProvider } from '../element_provider/IElementProvider';

export class ElementGuessValidator implements IGuessValidator {
    private readonly elementProvider: IElementProvider;

    constructor(elementProvider: IElementProvider) {
        this.elementProvider = elementProvider;
    }

    public async Validate(guess: string): Promise<boolean> {
        if (!guess) {
            return false;
        }
        const MAX_SYMBOL_LENGTH = 2;
        if (guess.length <= MAX_SYMBOL_LENGTH) {
            return await this.validateFromSymbol(guess);
        }
        return await this.validateFromName(guess);
    }

    private async validateFromName(elementName: string): Promise<boolean> {
        return !!(await this.elementProvider.GetElementByName(elementName));
    }

    private async validateFromSymbol(elementSymbol: string): Promise<boolean> {
        return !!(await this.elementProvider.GetElementBySymbol(elementSymbol));
    }
}
