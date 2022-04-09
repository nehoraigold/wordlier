import { expect } from 'chai';
import { describe, it } from 'mocha';
import { LetterSpaceResult } from '../src/game/words/guess_processor/WordResult';
import { WordProcessor } from '../src/game/words/guess_processor/WordProcessor';

describe(WordProcessor.prototype.constructor.name, () => {
    describe(WordProcessor.prototype.Process.name, () => {
        const processor = new WordProcessor();
        const CORRECT_LETTER = 'a';

        const getCorrectLetterIndices = (guess: string, correctLetter: string): Array<number> => {
            return guess
                .split('')
                .map((char, index) => {
                    if (char === correctLetter) {
                        return index;
                    }
                })
                .filter((idx) => idx !== undefined);
        };

        it('should mark all letters as not in word', () => {
            // arrange
            const answer = 'abcde';
            const guess = 'vwxyz';

            // act
            const result = processor.Process(guess, answer);

            // assert
            result.forEach((letter) => {
                expect(letter.result).to.equal(LetterSpaceResult.NOT_IN_WORD);
            });
        });

        it('should mark single letter as incorrect location', () => {
            // arrange
            const answer = `${CORRECT_LETTER}bcde`;
            const guess = `lmno${CORRECT_LETTER}`;
            const correctLetterIndex = guess.indexOf(CORRECT_LETTER);

            // act
            const result = processor.Process(guess, answer);

            // assert
            expect(result[correctLetterIndex].result).to.equal(LetterSpaceResult.INCORRECT_LOCATION);
        });

        it('should mark one letter as incorrect location and one as not in word when only one exists in word', () => {
            // arrange
            const answer = `${CORRECT_LETTER}bcde`;
            const guess = `lmn${CORRECT_LETTER}${CORRECT_LETTER}`;
            const correctLetterIndex = guess.indexOf(CORRECT_LETTER);
            const correctLetterLastIndex = guess.lastIndexOf(CORRECT_LETTER);

            // act
            const result = processor.Process(guess, answer);

            // assert
            expect(result[correctLetterIndex].result).to.equal(LetterSpaceResult.INCORRECT_LOCATION);
            expect(result[correctLetterLastIndex].result).to.equal(LetterSpaceResult.NOT_IN_WORD);
        });

        it('should mark multiple letters as incorrect location when multiple exist in word', () => {
            // arrange
            const answer = `${CORRECT_LETTER}${CORRECT_LETTER}cde`;
            const guess = `lmn${CORRECT_LETTER}${CORRECT_LETTER}`;
            const correctLetterIndices = getCorrectLetterIndices(guess, CORRECT_LETTER);

            // act
            const result = processor.Process(guess, answer);

            // assert
            result.forEach((letter, index) => {
                if (correctLetterIndices.includes(index)) {
                    expect(letter.result).to.equal(LetterSpaceResult.INCORRECT_LOCATION);
                } else {
                    expect(letter.result).to.equal(LetterSpaceResult.NOT_IN_WORD);
                }
            });
        });

        it('should mark single letter as correct location', () => {
            // arrange
            const answer = `${CORRECT_LETTER}bcde`;
            const guess = `${CORRECT_LETTER}wxyz`;
            const correctLetterIndex = guess.indexOf(CORRECT_LETTER);

            // act
            const result = processor.Process(guess, answer);

            // assert
            expect(result[correctLetterIndex].result).to.equal(LetterSpaceResult.CORRECT_LOCATION);
        });

        it('should mark multiple letters as correct location when multiple exist in word', () => {
            // arrange
            const answer = `${CORRECT_LETTER}b${CORRECT_LETTER}de`;
            const guess = `${CORRECT_LETTER}w${CORRECT_LETTER}yz`;
            const correctLetterIndices = getCorrectLetterIndices(guess, CORRECT_LETTER);

            // act
            const result = processor.Process(guess, answer);

            // assert
            result.forEach((letter, index) => {
                if (correctLetterIndices.includes(index)) {
                    expect(letter.result).to.equal(LetterSpaceResult.CORRECT_LOCATION);
                } else {
                    expect(letter.result).to.equal(LetterSpaceResult.NOT_IN_WORD);
                }
            });
        });

        it('should mark one letter as correct location and one as incorrect location when multiple exist in word', () => {
            // arrange
            const answer = `${CORRECT_LETTER}b${CORRECT_LETTER}de`;
            const guess = `${CORRECT_LETTER}wx${CORRECT_LETTER}z`;
            const correctLetterIndices = getCorrectLetterIndices(guess, CORRECT_LETTER);

            // act
            const result = processor.Process(guess, answer);

            // assert
            expect(result[correctLetterIndices[0]].result).to.equal(LetterSpaceResult.CORRECT_LOCATION);
            expect(result[correctLetterIndices[1]].result).to.equal(LetterSpaceResult.INCORRECT_LOCATION);
        });
    });
});
