import axios from 'axios';
import { constants as HttpStatus } from 'http2';
import { IAnswerRetriever } from './IAnswerRetriever';

export class RandomWordApiAnswerRetriever implements IAnswerRetriever {
    private readonly baseUri: string;
    private readonly numberOfWordsToRetrieve: number;
    private readonly apiCallLimit: number;

    constructor() {
        this.baseUri = 'https://random-word-api.herokuapp.com/word';
        this.numberOfWordsToRetrieve = 20;
        this.apiCallLimit = 5;
    }

    public async RetrieveAnswer(wordLength: number): Promise<string> {
        for (let i = 0; i < this.apiCallLimit; i++) {
            const words = await this.makeApiCall();
            for (const word of words) {
                if (word.length === wordLength) {
                    return word;
                }
            }
        }
        throw `Api call limit reached!!`;
    }

    private async makeApiCall(): Promise<Array<string>> {
        const endpoint = `${this.baseUri}?number=${this.numberOfWordsToRetrieve}`;
        try {
            const { status, data } = await axios.get(endpoint);
            if (status !== HttpStatus.HTTP_STATUS_OK || !data) {
                return [];
            }
            return data;
        } catch (err) {
            console.error(err);
            return [];
        }
    }
}
