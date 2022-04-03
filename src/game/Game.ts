import { LetterSpaceResult, ProcessedResult } from './word_processor/ProcessedResult';
import { WordProcessor } from './word_processor/WordProcessor';
import { GameConfiguration } from './GameConfiguration';

export class Game {
    private readonly processor: WordProcessor;
    private readonly answer: string;
    private readonly turnCount: number;
    private readonly history: Array<ProcessedResult>;

    constructor(answer: string, turnCount?: number, history?: Array<ProcessedResult>) {
        this.throwIfInvalidParameters(answer, turnCount, history);
        this.processor = new WordProcessor();
        this.answer = answer;
        this.turnCount = turnCount || answer.length + 1;
        this.history = history || [];
    }

    public async PlayTurn(guess: string): Promise<ProcessedResult> {
        if (this.IsOver) {
            throw `Game is over, cannot play turn!`;
        }

        const results = this.processor.Process(guess, this.answer);
        this.history.push(results);
        return results;
    }

    public get History(): Array<ProcessedResult> {
        return this.history;
    }

    public get Answer(): string {
        return this.answer;
    }

    public get DidWin(): boolean {
        const lastResult = this.history[this.history.length - 1];
        if (!lastResult || lastResult.length !== this.answer.length) {
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

    private throwIfInvalidParameters(answer: string, turnCount?: number, history?: Array<ProcessedResult>): void {
        if (!answer) {
            throw `no answer provided`;
        }
        turnCount = turnCount || answer.length + 1;
        history = history || [];
        if (history.length > turnCount || !history.every((turn) => turn && turn.length === answer.length)) {
            throw `game history is invalid`;
        }
    }
}
