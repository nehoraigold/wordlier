import { WordnikApiClient } from '../utils/WordnikApiClient';
import { IAnswerRetriever } from './IAnswerRetriever';

export class WordnikApiAnswerRetriever implements IAnswerRetriever {
    private readonly client: WordnikApiClient;

    constructor(client: WordnikApiClient) {
        this.client = client;
    }

    public async RetrieveAnswer(wordLength: number): Promise<string> {
        try {
            const words = await this.client.GetRandomWords(wordLength, wordLength, 1);
            return words[0];
        } catch (err) {
            console.log(err);
            return null;
        }
    }
}
