import { stdin as input, stdout as output } from 'process';
import * as readline from 'readline';
import { IGuessRetriever } from './IGuessRetriever';

export class CliGuessRetriever implements IGuessRetriever {
    constructor(private readonly wordLength: number) {}

    public async RetrieveGuess(): Promise<string> {
        let guess = '';
        while (guess.length !== this.wordLength) {
            guess = await this.getGuess();
        }
        return guess.toLowerCase();
    }

    private getGuess(): Promise<string> {
        const rl = readline.createInterface({ input, output });
        return new Promise<string>((resolve) => {
            rl.question('Enter guess: ', (ans) => {
                resolve(ans);
                rl.close();
            });
        });
    }
}
