import { Router } from 'express';
import { IRouter } from './IRouter';

export abstract class RouterBase implements IRouter {
    protected readonly router: Router;

    protected constructor() {
        this.router = Router();
    }

    protected abstract initializeRouter(): void;

    public Load(): Router {
        this.initializeRouter();
        return this.router;
    }
}
