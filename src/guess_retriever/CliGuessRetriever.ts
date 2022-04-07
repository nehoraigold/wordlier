import { stdin as input, stdout as output } from 'process';
import * as readline from 'readline';
import { CliRenderer } from '../utils/CliRenderer';
import { IGuessValidator } from '../guess_validator/IGuessValidator';
import { ValidGuessRetrieverBase } from './ValidGuessRetrieverBase';
import { IGuessRetriever } from './IGuessRetriever';

export class CliGuessRetriever extends ValidGuessRetrieverBase {
    constructor(wordLength: number, guessValidator?: IGuessValidator) {
        super(wordLength, guessValidator);
    }

    protected async retrieve(isFirstGuess: boolean): Promise<string> {
        if (!isFirstGuess) {
            CliRenderer.Message('Invalid guess. Please try again.');
        }
        return await CliRenderer.Prompt();
    }
}
