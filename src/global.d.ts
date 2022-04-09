import { Logger } from './app/server/Logger';

declare module NodeJS {
    interface Global {
        logger: Logger;
    }
}
