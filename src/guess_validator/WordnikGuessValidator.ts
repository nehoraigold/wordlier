import { IGuessValidator } from './IGuessValidator';
import { WordnikApiClient } from '../utils/WordnikApiClient';

export class WordnikGuessValidator implements IGuessValidator {
    private readonly client: WordnikApiClient;

    constructor(client: WordnikApiClient) {
        this.client = client;
    }

    public async Validate(guess: string): Promise<boolean> {
        return await this.client.IsWord(guess);
    }
}
