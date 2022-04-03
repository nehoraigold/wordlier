import { Request, Response } from 'express';
import { Game } from '../../../game/Game';

export interface IGameApiProtocol {
    FromRequest(request: Request): Game;
    ToResponse(game: Game, response: Response): Response;
}
