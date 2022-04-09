import { IGame } from '../IGame';
import { WordProcessor } from './guess_processor/WordProcessor';
import { LetterSpaceResult, WordResult } from './guess_processor/WordResult';

export class WordGame implements IGame {
    private readonly processor: WordProcessor;
    private readonly answer: string;
    private readonly turnCount: number;
    private readonly history: Array<WordResult>;

    constructor(answer: string, turnCount?: number, history?: Array<WordResult>) {
        this.throwIfInvalidParameters(answer, turnCount, history);
        this.processor = new WordProcessor();
        this.answer = answer;
        this.turnCount = turnCount || answer.length + 1;
        this.history = history || [];
    }

    public async PlayTurn(guess: string): Promise<WordResult> {
        if (this.IsOver) {
            throw `Game is over, cannot play turn!`;
        }

        const results = await this.processor.Process(guess, this.answer);
        this.history.push(results);
        return results;
    }

    public get History(): Array<WordResult> {
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

    private throwIfInvalidParameters(answer: string, turnCount?: number, history?: Array<WordResult>): void {
        if (!answer) {
            throw `no answer provided`;
        }
        turnCount = turnCount || answer.length + 1;
        history = history || [];
        if (history.length > turnCount) {
            throw `game history is invalid`;
        }
    }
}
