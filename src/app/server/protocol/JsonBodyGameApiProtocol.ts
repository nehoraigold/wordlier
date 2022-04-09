import { Request, Response } from 'express';
import { GameFactory } from '../../../game/GameFactory';
import { GameType } from '../../../game/GameType';
import { IGame } from '../../../game/IGame';
import { SERVICE_JSON_FIELD } from '../../../utils/constants';
import { GameState } from '../../../game/GameState';
import { IGameApiProtocol } from './IGameApiProtocol';

export class JsonBodyGameApiProtocol implements IGameApiProtocol {
    public FromRequest(req: Request): IGame {
        if (!req?.body) {
            return null;
        }
        try {
            const { answer, turnCount, history } = req.body as GameState;
            return GameFactory.Create(GameType.WORD, { answer, turnCount, history });
        } catch (err) {
            global.logger.Error(err);
            return null;
        }
    }

    public ToResponse(game: IGame, res: Response): Response {
        res.locals[SERVICE_JSON_FIELD] = {
            answer: game.Answer,
            history: game.History,
        } as GameState;
        return res;
    }
}
