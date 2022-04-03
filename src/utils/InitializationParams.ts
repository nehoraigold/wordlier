import { WordnikApiClient } from './WordnikApiClient';

export type InitializationParams = {
    wordnikClient?: WordnikApiClient;
    wordLength?: number;
};
