import { Request, Response } from 'express';
import { Game } from '../../../game/Game';
import { GameState } from './GameState';
import { IGameApiProtocol } from './IGameApiProtocol';

const WORDLIER_COOKIE_NAME = '_wordlier';

export class CookieGameApiProtocol implements IGameApiProtocol {
    public FromRequest(request: Request): Game {
        const gameStateCookie = request.cookies[WORDLIER_COOKIE_NAME];
        if (!gameStateCookie) {
            global.logger.Debug(`no ${WORDLIER_COOKIE_NAME} cookie on request`);
            return null;
        }

        try {
            const { answer, history, turnCount }: GameState = JSON.parse(
                Buffer.from(gameStateCookie, 'base64').toString('utf8'),
            );
            return new Game(answer, turnCount, history);
        } catch (err) {
            global.logger.Error('Unable to parse game state from cookie:', err);
            return null;
        }
    }

    public ToResponse(game: Game, response: Response): Response {
        const gameState: GameState = {
            answer: game.Answer,
            history: game.History,
        };

        const cookie = Buffer.from(JSON.stringify(gameState)).toString('base64');
        response.cookie(WORDLIER_COOKIE_NAME, cookie);
        return response;
    }
}
