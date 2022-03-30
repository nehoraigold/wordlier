import { IGuessRetriever } from '../guess_retriever/IGuessRetriever';
import { IGuessValidator } from '../guess_validator/IGuessValidator';
import { LetterSpaceResult, ProcessedResult } from '../word_processor/ProcessedResult';
import { WordProcessor } from '../word_processor/WordProcessor';
import { GameConfiguration } from './GameConfiguration';

export class Game {
    private readonly processor: WordProcessor;
    private readonly guessRetriever: IGuessRetriever;
    private readonly guessValidator: IGuessValidator;
    private answer: string;
    private turnCount: number;
    private history: Array<ProcessedResult>;

    constructor(guessRetriever: IGuessRetriever, guessValidator: IGuessValidator) {
        this.guessRetriever = guessRetriever;
        this.guessValidator = guessValidator;
        this.processor = new WordProcessor();
    }

    public async Start(config: GameConfiguration): Promise<boolean> {
        this.answer = config.answer;
        this.turnCount = config.turnCount;
        this.history = [];
        return true;
    }

    public async PlayTurn(): Promise<ProcessedResult> {
        if (this.IsOver) {
            throw `Game is over, cannot play turn!`;
        }

        let guess: string;
        do {
            guess = await this.guessRetriever.RetrieveGuess();
        } while (!(await this.isValidGuess(guess)));

        const results = this.processor.Process(guess, this.answer);
        this.history.push(results);
        return results;
    }

    private async isValidGuess(guess: string): Promise<boolean> {
        if (this.guessValidator) {
            return await this.guessValidator.Validate(guess);
        }
        return true;
    }

    public get DidWin(): boolean {
        const lastResult = this.history[this.history.length - 1];
        if (!lastResult) {
            return false;
        }
        return lastResult.every((letter) => letter.result === LetterSpaceResult.CORRECT_LOCATION);
    }

    public get TurnNumber(): number {
        return this.history.length + 1;
    }

    public get IsOver(): boolean {
        return this.turnCount < this.TurnNumber || this.DidWin;
    }
}
