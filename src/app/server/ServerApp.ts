import http from 'http';
import { Socket } from 'net';
import express, { Express } from 'express';
import cookieParser from 'cookie-parser';
import { GuessValidatorFactory } from '../../game/abstract/guess_validator/GuessValidatorFactory';

import { IApp } from '../IApp';
import { Logger } from './Logger';
import { AppConfig } from '../AppConfig';
import { IRouter } from './router/IRouter';
import { GameApiRouter } from './router/GameApiRouter';
import { GameType } from '../../game/GameType';
import { SERVICE_VERSION } from '../../utils/constants';
import { AnswerRetrieverFactory } from '../../game/abstract/answer_retriever/AnswerRetrieverFactory';

export class ServerApp implements IApp {
    private readonly app: Express;
    private readonly config: AppConfig;
    private readonly sockets: Set<Socket>;
    private routers: Array<IRouter>;
    private httpServer: http.Server;

    constructor(config: AppConfig) {
        this.app = express();
        this.config = config;
        this.sockets = new Set<Socket>();
        this.routers = null;
        this.httpServer = null;
    }

    public async Initialize(): Promise<boolean> {
        global.logger = new Logger();
        this.initializeApp();
        this.initializeRouters();
        return true;
    }

    private initializeApp(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser());
        this.app.use((req, res, next) => {
            global.logger.Debug(`${req.method} ${req.path}`);
            next();
        });
    }

    private initializeRouters(): void {
        const answerRetriever = AnswerRetrieverFactory.Create(this.config);
        const guessValidator = GuessValidatorFactory.Create(this.config);
        this.routers = [new GameApiRouter(this.config, answerRetriever, guessValidator)];
        this.routers.forEach((router) => {
            this.app.use(`/${SERVICE_VERSION}`, router.Load());
        });
    }

    public async Run(): Promise<void> {
        this.httpServer = http.createServer(this.app);
        const httpPort = process.env.PORT || '8080';
        this.httpServer.listen(httpPort, () => {
            global.logger.Info(`HTTP server listening on port ${httpPort}...`);
        });

        this.httpServer.on('connection', (socket) => {
            this.sockets.add(socket);
            const deleteSocket = () => {
                this.sockets.delete(socket);
            };

            socket.on('close', deleteSocket);
            this.httpServer.once('close', deleteSocket);
        });
    }

    public async Close(): Promise<void> {
        global.logger.Info('Shutting down HTTP server');
        for (const socket of this.sockets) {
            socket.destroy();
            this.sockets.delete(socket);
        }

        if (this.httpServer) {
            this.httpServer.close();
        }
    }
}
