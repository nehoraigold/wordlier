import chalk from 'chalk';
import { IResultRenderer } from '../abstract/IResultRenderer';
import { GuessType } from '../GuessType';

import { LetterSpaceResult, WordResult } from './guess_processor/WordResult';

export class WordResultCliRenderer implements IResultRenderer {
    public GetRenderableAnswer(answer: string): string {
        return answer.toUpperCase();
    }

    public GetRenderableResult(result: WordResult): string {
        let letters: Array<string> = [];
        result.forEach((letterSpace) => {
            let char = ' ' + letterSpace.char.toUpperCase() + ' ';
            switch (letterSpace.result) {
                case LetterSpaceResult.CORRECT_LOCATION:
                    char = chalk.bgGreen.black(char);
                    break;
                case LetterSpaceResult.INCORRECT_LOCATION:
                    char = chalk.bgYellow.black(char);
                    break;
                case LetterSpaceResult.NOT_IN_WORD:
                    char = chalk.bgGray.black(char);
                    break;
            }
            letters.push(char);
        });
        return letters.join(' ');
    }
}
