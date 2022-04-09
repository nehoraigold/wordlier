import { stdout as output, stdin as input } from 'process';
import * as readline from 'readline';
import chalk from 'chalk';

import { GuessResultType } from '../../game/GuessResultType';
import {
    HEADER_CORNER_CHAR,
    HEADER_HORIZONTAL_CHAR,
    HEADER_SPACING,
    HEADER_VERTICAL_CHAR,
} from '../../utils/constants';
import { LetterSpaceResult, WordResult } from '../../game/words/guess_processor/WordResult';

export class CliRenderer {
    public static Error(errorMessage: string): string {
        return this.logAndReturn(chalk.redBright(errorMessage));
    }

    public static Message(msg: string): string {
        return this.logAndReturn(msg);
    }

    public static NewLine(): string {
        return this.logAndReturn('\n');
    }

    public static Title(text: string): string {
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

    public static Prompt(prompt = ''): Promise<string> {
        return new Promise<string>((resolve) => {
            const rl = readline.createInterface({ input, output });
            rl.question(prompt, (ans) => {
                rl.close();
                resolve(ans);
            });
        });
    }

    private static logAndReturn(text: string): string {
        console.log(text);
        return text;
    }
}
