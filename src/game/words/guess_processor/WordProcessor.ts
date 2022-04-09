import { IGuessProcessor } from '../../abstract/guess_processor/IGuessProcessor';
import { WordResult, LetterSpaceResult } from './WordResult';

export class WordProcessor implements IGuessProcessor {
    public Process(guess: string, answer: string): WordResult {
        let results: WordResult = [];
        const answerLetters = this.getCharCountMap(answer);

        results = this.processCorrectLocation(guess, answer, answerLetters, results);
        results = this.processIncorrectLocation(guess, answerLetters, results);
        results = this.processNotInWord(guess, results);

        return results;
    }

    private processCorrectLocation(
        guess: string,
        answer: string,
        answerLetters: Map<string, number>,
        results: WordResult,
    ): WordResult {
        guess.split('').forEach((letter, index) => {
            if (answer[index] === letter) {
                const count = answerLetters.get(letter);
                answerLetters.set(letter, count - 1);
                results[index] = { char: letter, result: LetterSpaceResult.CORRECT_LOCATION };
            }
        });
        return results;
    }

    private processIncorrectLocation(
        guess: string,
        answerLetters: Map<string, number>,
        results: WordResult,
    ): WordResult {
        guess.split('').forEach((letter, index) => {
            if (results[index]) {
                return;
            }

            const numOfCharsLeft = answerLetters.get(letter);
            if (numOfCharsLeft > 0) {
                answerLetters.set(letter, numOfCharsLeft - 1);
                results[index] = { char: letter, result: LetterSpaceResult.INCORRECT_LOCATION };
            }
        });
        return results;
    }

    private processNotInWord(guess: string, results: WordResult): WordResult {
        guess.split('').forEach((letter, index) => {
            if (!results[index]) {
                results[index] = { char: letter, result: LetterSpaceResult.NOT_IN_WORD };
            }
        });
        return results;
    }

    private getCharCountMap(str: string): Map<string, number> {
        const map = new Map<string, number>();
        str.split('').forEach((char) => {
            const charCount = map.get(char);
            charCount ? map.set(char, charCount + 1) : map.set(char, 1);
        });
        return map;
    }
}
