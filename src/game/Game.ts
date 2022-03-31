import { LetterSpaceResult, ProcessedResult } from './word_processor/ProcessedResult';
import { WordProcessor } from './word_processor/WordProcessor';
import { GameConfiguration } from './GameConfiguration';

export class Game {
    private readonly processor: WordProcessor;
    private answer: string;
    private turnCount: number;
    private history: Array<ProcessedResult>;

    constructor() {
        this.processor = new WordProcessor();
    }

    public async Start(config: GameConfiguration): Promise<boolean> {
        this.answer = config.answer;
        this.turnCount = config.turnCount || config.answer.length + 1;
        this.history = [];
        return true;
    }

    public async PlayTurn(guess: string): Promise<ProcessedResult> {
        if (this.IsOver) {
            throw `Game is over, cannot play turn!`;
        }

        const results = this.processor.Process(guess, this.answer);
        this.history.push(results);
        return results;
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
