import { IGame } from '../IGame';
import { ElementData } from './ElementData';
import { ElementProcessor } from './guess_processor/ElementProcessor';
import { ElementResult } from './guess_processor/ElementResult';

export class ElementGame implements IGame {
    private readonly processor: ElementProcessor;
    private readonly answer: ElementData;
    private readonly turnCount: number;
    private readonly history: Array<ElementResult>;

    constructor(answer: ElementData, turnCount?: number, history?: Array<ElementResult>) {
        this.processor = new ElementProcessor();
        this.answer = answer;
        this.turnCount = turnCount;
        this.history = history || [];
    }

    public async PlayTurn(guess: ElementData): Promise<ElementResult> {
        const elementResult = this.processor.Process(guess, this.answer);
        this.history.push(elementResult);
        return elementResult;
    }

    public get DidWin(): boolean {
        const lastGuess = this.history[this.history.length - 1];
        if (!lastGuess) {
            return false;
        }
        return lastGuess.atomicNumber === this.answer.atomicNumber;
    }

    public get IsOver(): boolean {
        return this.turnCount < this.TurnNumber || this.DidWin;
    }

    public get TurnNumber(): number {
        return this.history.length + 1;
    }

    public get Answer(): ElementData {
        return this.answer;
    }

    public get History(): Array<ElementResult> {
        return this.history;
    }
}
