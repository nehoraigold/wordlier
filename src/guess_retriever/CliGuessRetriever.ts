import { stdin as input, stdout as output } from 'process';
import * as readline from 'readline';
import { CliRenderer } from '../app/CliRenderer';
import { IGuessRetriever } from './IGuessRetriever';

export class CliGuessRetriever implements IGuessRetriever {
    private readonly validatorRegex: RegExp;

    constructor(wordLength: number) {
        this.validatorRegex = new RegExp(`^[A-Za-z]{${wordLength}}$`);
    }

    public async RetrieveGuess(): Promise<string> {
        let guess = '';
        while (!this.validatorRegex.test(guess)) {
            guess = await CliRenderer.Prompt();
        }
        return guess.toLowerCase();
    }
}
