import { Request, Response } from 'express';
import { IGame } from '../../../game/IGame';

export interface IGameApiProtocol {
    FromRequest(req: Request): IGame;
    ToResponse(game: IGame, res: Response): Response;
}
