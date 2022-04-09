import { IGuessProcessor } from './abstract/guess_processor/IGuessProcessor';
import { LetterSpaceResult, WordResult } from './words/guess_processor/WordResult';
import { WordProcessor } from './words/guess_processor/WordProcessor';

export class Game<AnswerType, ResultType> {
    private readonly processor: IGuessProcessor<AnswerType, ResultType>;
    private readonly answer: AnswerType;
    private readonly turnCount: number;
    private readonly history: Array<ResultType>;

    constructor(answer: AnswerType, turnCount?: number, history?: Array<ResultType>) {
        this.throwIfInvalidParameters(answer, turnCount, history);
        this.processor = new WordProcessor();
        this.answer = answer;
        this.turnCount = turnCount || answer.length + 1;
        this.history = history || [];
    }

    public async PlayTurn(guess: string): Promise<ResultType> {
        if (this.IsOver) {
            throw `Game is over, cannot play turn!`;
        }

        const results = this.processor.Process(guess, this.answer);
        this.history.push(results);
        return results;
    }

    public get History(): Array<ResultType> {
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
        if (history.length > turnCount || !history.every((turn) => turn && turn.length === answer.length)) {
            throw `game history is invalid`;
        }
    }
}
