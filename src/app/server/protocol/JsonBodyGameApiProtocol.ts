import { Request, Response } from 'express';
import { Game } from '../../../game/Game';
import { SERVICE_JSON_FIELD } from '../../../utils/constants';
import { GameState } from './GameState';
import { IGameApiProtocol } from './IGameApiProtocol';

export class JsonBodyGameApiProtocol implements IGameApiProtocol {
    public FromRequest(request: Request): Game {
        if (!request.body) {
            return null;
        }
        try {
            const { answer, turnCount, history } = request.body as GameState;
            return new Game(answer, turnCount, history);
        } catch (err) {
            global.logger.Error(err);
            return null;
        }
    }

    public ToResponse(game: Game, response: Response): Response {
        response.locals[SERVICE_JSON_FIELD] = {
            answer: game.Answer,
            history: game.History,
        } as GameState;
        return response;
    }
}
