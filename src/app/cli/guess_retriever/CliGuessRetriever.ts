import { stdin as input, stdout as output } from 'process';
import * as readline from 'readline';
import { CliRenderer } from '../CliRenderer';
import { IGuessValidator } from '../../../game/abstract/guess_validator/IGuessValidator';
import { ValidGuessRetrieverBase } from './ValidGuessRetrieverBase';
import { IGuessRetriever } from './IGuessRetriever';

export class CliGuessRetriever extends ValidGuessRetrieverBase {
    constructor(guessValidator?: IGuessValidator) {
        super(guessValidator);
    }

    protected async retrieve(isFirstGuess: boolean): Promise<string> {
        if (!isFirstGuess) {
            CliRenderer.Message('Invalid guess. Please try again.');
        }
        return await CliRenderer.Prompt();
    }
}
