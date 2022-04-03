import { Request, Response } from 'express';
import { Game } from '../../../game/Game';

export interface IGameApiProtocol {
    FromRequest(req: Request): Game;
    ToResponse(game: Game, res: Response): Response;
}
