import { AppMode } from './AppMode';
import { GameType } from '../game/GameType';
import { ServerConfig } from './server/ServerConfig';
import { WordGameConfig } from '../game/words/WordGameConfig';
import { ElementGameConfig } from '../game/elements/ElementGameConfig';

export type AppConfig = {
    appMode: AppMode;
    gameType: GameType;
    serverConfig?: ServerConfig;
    gameConfigs: {
        [GameType.WORD]?: WordGameConfig;
        [GameType.ELEMENT]?: ElementGameConfig;
    };
};
