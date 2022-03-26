import { stdin as input, stdout as output } from 'process';
import * as readline from 'readline';
import { IGuessRetriever } from './IGuessRetriever';

export class CliGuessRetriever implements IGuessRetriever {
    private readonly validatorRegex: RegExp;

    constructor(wordLength: number) {
        this.validatorRegex = new RegExp(`^[A-Za-z]{${wordLength}}$`);
    }

    public async RetrieveGuess(): Promise<string> {
        let guess = '';
        while (!this.validatorRegex.test(guess)) {
            guess = await this.getGuess();
        }
        return guess.toLowerCase();
    }

    private getGuess(): Promise<string> {
        return new Promise<string>((resolve) => {
            const rl = readline.createInterface({ input, output });
            rl.question('Enter guess: ', (ans) => {
                rl.close();
                resolve(ans);
            });
        });
    }
}
