import { GuessType } from '../GuessType';
import { GuessResultType } from '../GuessResultType';

export interface IResultRenderer {
    GetRenderableAnswer(answer: GuessType): string;
    GetRenderableResult(result: GuessResultType): string;
}
