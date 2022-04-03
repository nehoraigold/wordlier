import { Logger } from './utils/Logger';

declare module NodeJS {
    interface Global {
        logger: Logger;
    }
}
