import { DEFAULT_WORD_LENGTH } from '../../../utils/constants';
import { WordnikApiClient } from '../WordnikApiClient';
import { IAnswerRetriever } from '../../abstract/answer_retriever/IAnswerRetriever';

export class WordnikApiAnswerRetriever implements IAnswerRetriever {
    private readonly client: WordnikApiClient;
    private readonly wordLength: number;

    constructor(client: WordnikApiClient, wordLength?: number) {
        this.client = client;
        this.wordLength = wordLength || DEFAULT_WORD_LENGTH;
    }

    public async RetrieveAnswer(): Promise<string> {
        try {
            const words = await this.client.GetRandomWords(this.wordLength, this.wordLength, 1);
            return words[0];
        } catch (err) {
            console.log(err);
            return null;
        }
    }
}
