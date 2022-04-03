import { Request, Response } from 'express';
import { Game } from '../../../game/Game';
import { SERVICE_JSON_FIELD } from '../../../utils/constants';
import { GameState } from './GameState';
import { IGameApiProtocol } from './IGameApiProtocol';

export class JsonBodyGameApiProtocol implements IGameApiProtocol {
    public FromRequest(req: Request): Game {
        if (!req?.body) {
            return null;
        }
        try {
            const { answer, turnCount, history } = req.body as GameState;
            return new Game(answer, turnCount, history);
        } catch (err) {
            global.logger.Error(err);
            return null;
        }
    }

    public ToResponse(game: Game, res: Response): Response {
        res.locals[SERVICE_JSON_FIELD] = {
            answer: game.Answer,
            history: game.History,
        } as GameState;
        return res;
    }
}
