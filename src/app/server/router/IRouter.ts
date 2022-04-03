import { Router } from 'express';

export interface IRouter {
    Load(): Router;
}
