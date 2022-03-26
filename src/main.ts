import { CliGuessRetriever } from './guess_retriever/CliGuessRetriever';
import { LetterSpaceResult } from './word_processor/ProcessedResult';
import { HardCodedAnswerRetriever } from './answer_retriever/HardCodedAnswerRetriever';
import { WordProcessor } from './word_processor/WordProcessor';

const main = async (): Promise<void> => {
    const CHARACTER_COUNT = 5;
    const NUMBER_OF_TURNS = 6;

    const answerRetriever = new HardCodedAnswerRetriever();
    const guessRetriever = new CliGuessRetriever(CHARACTER_COUNT);
    const processor = new WordProcessor();

    const answer = await answerRetriever.RetrieveAnswer(CHARACTER_COUNT);
    let guess: string;

    for (let i = 0; i < NUMBER_OF_TURNS; i++) {
        guess = await guessRetriever.RetrieveGuess();
        const { results } = processor.Process(guess, answer);
        console.log(JSON.stringify(results, null, 4));
        if (results.every((letter) => letter.result === LetterSpaceResult.CORRECT_LOCATION)) {
            break;
        }
    }
    console.log(guess === answer ? 'You win!' : 'You lose.');
    return;
};

main();
