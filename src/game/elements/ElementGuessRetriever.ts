import { CliRenderer } from '../../app/cli/CliRenderer';
import { IGuessRetriever } from '../../app/cli/guess_retriever/IGuessRetriever';
import { IGuessValidator } from '../abstract/guess_validator/IGuessValidator';
import { IElementProvider } from './element_provider/IElementProvider';
import { ElementData } from './ElementData';

export class ElementGuessRetriever implements IGuessRetriever {
    private readonly elementProvider: IElementProvider;
    private readonly guessValidator: IGuessValidator;

    constructor(elementProvider: IElementProvider, guessValidator?: IGuessValidator) {
        this.elementProvider = elementProvider;
        this.guessValidator = guessValidator;
    }

    public async RetrieveGuess(): Promise<ElementData> {
        let guess = '';
        let elementData = null;
        let isFirstGuess = true;
        while (!elementData) {
            guess = await this.retrieveFromCli(isFirstGuess);
            elementData = await this.getElementData(guess);
            isFirstGuess = false;
        }
        return elementData;
    }

    private async retrieveFromCli(isFirstGuess: boolean): Promise<string> {
        if (!isFirstGuess) {
            CliRenderer.Message('Invalid guess. Please try again.');
        }
        return await CliRenderer.Prompt();
    }

    private async getElementData(guess: string): Promise<ElementData> {
        if (!guess) {
            return null;
        }
        const MAX_SYMBOL_LENGTH = 2;
        if (guess.length <= MAX_SYMBOL_LENGTH) {
            return await this.elementProvider.GetElementBySymbol(guess);
        }
        return await this.elementProvider.GetElementByName(guess);
    }
}
