import { IGame } from './IGame';
import { GameType } from './GameType';
import { GameState } from './GameState';
import { WordGame } from './words/WordGame';
import { WordResult } from './words/guess_processor/WordResult';
import { ElementGame } from './elements/ElementGame';
import { ElementData } from './elements/ElementData';
import { ElementResult } from './elements/guess_processor/ElementResult';

export class GameFactory {
    public static Create(gameType: GameType, gameState: GameState): IGame {
        const { answer, turnCount, history } = gameState;
        switch (gameType) {
            case GameType.WORD:
                return new WordGame(answer as string, turnCount, history as WordResult[]);
            case GameType.ELEMENT:
                return new ElementGame(answer as ElementData, turnCount, history as Array<ElementResult>);
            default:
                throw `Unknown game type ${gameType}`;
        }
    }
}
