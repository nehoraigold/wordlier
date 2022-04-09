import { ElementComparison } from './ElementComparison';
import { ElementData } from './ElementData';
import { NumericalComparison } from './NumericalComparison';

export class ElementProcessor {
    constructor() {
    }

    public ProcessResult(guess: ElementData, answer: ElementData): ElementComparison {
        const fieldNames = ['atomicNumber', 'atomicRadius', 'group', 'period', 'yearDiscovered'];
        const result = {} as ElementComparison;
        for (const fieldName of fieldNames) {
            const guessValue = this.convertValueToInt(guess[fieldName]);
            const answerValue = this.convertValueToInt(answer[fieldName]);
            result[fieldName] = this.compareValues(guessValue, answerValue);
        }
        return result;
    }

    private convertValueToInt(value: number | string): number {
        if (typeof value === 'number') {
            return value;
        }
        if (typeof value === 'string') {
            return parseInt(value);
        }
        throw `Unknown value ${value} with type ${typeof value}`;
    }

    private compareValues(guessValue: number, answerValue: number): NumericalComparison {
        if (answerValue === guessValue) {
            return NumericalComparison.EQUALS;
        } else if (answerValue > guessValue) {
            return NumericalComparison.HIGHER;
        } else {
            return NumericalComparison.LOWER;
        }
    }
}
