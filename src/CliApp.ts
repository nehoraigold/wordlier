import { DEFAULT_TURN_COUNT, DEFAULT_WORD_LENGTH } from './utils/constants';
import { RandomWordApiAnswerRetriever } from './answer_retriever/RandomWordApiAnswerRetriever';
import { CliGuessRetriever } from './guess_retriever/CliGuessRetriever';
import { CliRenderer } from './CliRenderer';
import { Game } from './game/Game';
import { IApp } from './IApp';

export class CliApp implements IApp {
    public async Initialize(): Promise<boolean> {
        return true;
    }

    public async Run(): Promise<void> {
        const answerRetriever = new RandomWordApiAnswerRetriever();
        const answer = await answerRetriever.RetrieveAnswer(DEFAULT_WORD_LENGTH);

        const game = new Game(new CliGuessRetriever(DEFAULT_WORD_LENGTH));
        if (!(await game.Start({ turnCount: DEFAULT_TURN_COUNT, answer }))) {
            CliRenderer.Error('Unable to start game!');
            return;
        }

        while (!game.IsOver) {
            CliRenderer.Title(`Turn ${game.TurnNumber}`);
            const result = await game.PlayTurn();
            CliRenderer.Result(result);
            CliRenderer.NewLine();
        }
        const message = game.DidWin ? 'You win!' : `You lost. The word was ${answer.toUpperCase()}.`;
        CliRenderer.Message(message);
    }

    public async Close(): Promise<void> {
        return;
    }
}
