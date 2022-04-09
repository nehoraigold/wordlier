import { GameState } from './GameState';
import { GameType } from './GameType';
import { IGame } from './IGame';
import { WordResult } from './words/guess_processor/WordResult';
import { WordGame } from './words/WordGame';

export class GameFactory {
    public static Create(gameType: GameType, gameState: GameState): IGame {
        switch (gameType) {
            case GameType.WORD:
                const { answer, turnCount, history } = gameState;
                return new WordGame(answer as string, turnCount, history as WordResult[]);
            case GameType.ELEMENT:
            default:
                throw `Unknown game type ${gameType}`;
        }
    }
}
