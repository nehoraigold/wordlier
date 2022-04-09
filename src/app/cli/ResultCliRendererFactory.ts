import { IResultRenderer } from '../../game/abstract/IResultRenderer';
import { ElementResultCliRenderer } from '../../game/elements/ElementResultCliRenderer';
import { GameType } from '../../game/GameType';
import { WordResultCliRenderer } from '../../game/words/WordResultCliRenderer';

export class ResultCliRendererFactory {
    public static Create(gameType: GameType): IResultRenderer {
        switch (gameType) {
            case GameType.ELEMENT:
                return new ElementResultCliRenderer();
            case GameType.WORD:
                return new WordResultCliRenderer();
        }
    }
}
