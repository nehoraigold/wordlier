import chalk from 'chalk';
import { DEFAULT_TURN_COUNT, DEFAULT_WORD_LENGTH } from './utils/constants';
import { HardCodedAnswerRetriever } from './answer_retriever/HardCodedAnswerRetriever';
import { CliGuessRetriever } from './guess_retriever/CliGuessRetriever';
import { LetterSpace, LetterSpaceResult } from './word_processor/ProcessedResult';
import { Game } from './game/Game';
import { GetHeader } from './utils/utils';
import { IApp } from './IApp';

export class CliApp implements IApp {
    public async Initialize(): Promise<boolean> {
        return true;
    }

    public async Run(): Promise<void> {
        const game = new Game(new CliGuessRetriever(DEFAULT_WORD_LENGTH));

        const answerRetriever = new HardCodedAnswerRetriever();
        const answer = await answerRetriever.RetrieveAnswer(DEFAULT_WORD_LENGTH);
        if (!(await game.Start({ turnCount: DEFAULT_TURN_COUNT, answer }))) {
            console.error('Unable to start game!');
            return;
        }

        while (!game.IsOver) {
            console.log(GetHeader(`Turn ${game.TurnNumber}`));
            const result = await game.PlayTurn();
            this.displayTurnResult(result);
        }
    }

    private displayTurnResult(result: Array<LetterSpace>): void {
        let letters: Array<string> = [];
        result.forEach((letterSpace) => {
            let char = ' ' + letterSpace.letter.toUpperCase() + ' ';
            switch (letterSpace.result) {
                case LetterSpaceResult.CORRECT_LOCATION:
                    char = chalk.bgGreenBright.black(char);
                    break;
                case LetterSpaceResult.INCORRECT_LOCATION:
                    char = chalk.bgYellowBright.black(char);
                    break;
                case LetterSpaceResult.NOT_IN_WORD:
                    char = chalk.bgGray.black(char);
                    break;
            }
            letters.push(char);
        });
        console.log(letters.join(' '));
    }

    public async Close(): Promise<void> {
        return;
    }
}
