import chalk from 'chalk';
import { HEADER_CORNER_CHAR, HEADER_HORIZONTAL_CHAR, HEADER_SPACING, HEADER_VERTICAL_CHAR } from '../utils/constants';
import { LetterSpaceResult, ProcessedResult } from '../word_processor/ProcessedResult';

export class CliRenderer {
    static Error(errorMessage: string): string {
        return this.logAndReturn(chalk.redBright(errorMessage));
    }

    static Message(msg: string): string {
        return this.logAndReturn(msg);
    }

    static NewLine(): string {
        return this.logAndReturn('\n');
    }

    static Title(text: string): string {
        const border =
            HEADER_CORNER_CHAR + HEADER_HORIZONTAL_CHAR.repeat(text.length + HEADER_SPACING * 2) + HEADER_CORNER_CHAR;
        const title =
            HEADER_VERTICAL_CHAR +
            ' '.repeat(HEADER_SPACING) +
            text +
            ' '.repeat(HEADER_SPACING) +
            HEADER_VERTICAL_CHAR;
        return this.logAndReturn(`${border}\n${title}\n${border}\n`);
    }

    static Result(result: ProcessedResult): string {
        let letters: Array<string> = [];
        result.forEach((letterSpace) => {
            let char = ' ' + letterSpace.letter.toUpperCase() + ' ';
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
        return this.logAndReturn(letters.join(' '));
    }

    private static logAndReturn(text: string): string {
        console.log(text);
        return text;
    }
}
