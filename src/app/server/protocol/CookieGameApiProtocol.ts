import { Request, Response } from 'express';
import { GameFactory } from '../../../game/GameFactory';
import { GameType } from '../../../game/GameType';
import { IGame } from '../../../game/IGame';
import { WordResult } from '../../../game/words/guess_processor/WordResult';
import { WordGameConfig } from '../../../game/words/WordGameConfig';
import { GameState } from '../../../game/GameState';
import { IGameApiProtocol } from './IGameApiProtocol';

const WORDLIER_COOKIE_NAME = '_wordlier';

export class CookieGameApiProtocol implements IGameApiProtocol {
    public FromRequest(req: Request): IGame {
        const gameStateCookie = req.cookies[WORDLIER_COOKIE_NAME];
        if (!gameStateCookie) {
            global.logger.Debug(`no ${WORDLIER_COOKIE_NAME} cookie on request`);
            return null;
        }

        try {
            const gameState: GameState = JSON.parse(
                Buffer.from(gameStateCookie, 'base64').toString('utf8'),
            );
            return GameFactory.Create(GameType.WORD, gameState);
        } catch (err) {
            global.logger.Error('Unable to parse game state from cookie:', err);
            return null;
        }
    }

    public ToResponse(game: IGame, res: Response): Response {
        const gameState: GameState = {
            answer: game.Answer,
            history: game.History,
        };

        const cookie = Buffer.from(JSON.stringify(gameState)).toString('base64');
        res.cookie(WORDLIER_COOKIE_NAME, cookie);
        return res;
    }
}
