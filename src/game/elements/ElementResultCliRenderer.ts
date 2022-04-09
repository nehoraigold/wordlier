import { IResultRenderer } from '../abstract/IResultRenderer';
import { ElementData } from './ElementData';
import { ElementResult } from './guess_processor/ElementResult';
import { NumericalComparison } from './NumericalComparison';

export class ElementResultCliRenderer implements IResultRenderer {
    public GetRenderableResult(result: ElementResult): string {
        const res = {};
        for (const [key, val] of Object.entries(result)) {
            res[key] = val === NumericalComparison.EQUALS ? '✅' : val === NumericalComparison.LOWER ? '⬇️' : '⬆️';
        }
        return JSON.stringify(res, null, 4);
    }

    public GetRenderableAnswer(answer: ElementData): string {
        return answer.name;
    }
}
