import { constants as HttpStatus } from 'http2';
import axios from 'axios';

export class WordnikApiClient {
    private readonly apiKey: string;
    private readonly baseUrl: string;
    private readonly wordApi: string;
    private readonly wordsApi: string;

    constructor(apiKey: string) {
        if (!apiKey) {
            throw `No Wordnik API key defined!`;
        }
        this.apiKey = apiKey;
        this.baseUrl = 'https://api.wordnik.com/v4/';
        this.wordApi = 'word.json';
        this.wordsApi = 'words.json';
    }

    public async IsWord(word: string): Promise<boolean> {
        const endpoint = `${this.wordApi}/${word}/definition`;
        const params = {
            limit: 1,
            includeRelated: false,
        };
        const { status } = await this.sendApiRequest(endpoint, params);
        return status === HttpStatus.HTTP_STATUS_OK;
    }

    public async GetRandomWords(minLength: number, maxLength: number, limit: number): Promise<string[]> {
        const params = {
            hasDictionaryDef: true,
            minDictionaryCount: 3,
            minLength,
            maxLength,
            limit,
        };
        const endpoint = `${this.wordsApi}/randomWords`;
        const { data } = (await this.sendApiRequest(endpoint, params)) as { data: Array<{ id: number; word: string }> };
        return data.map((wordInfo) => wordInfo.word);
    }

    private async sendApiRequest(endpoint: string, params?: Record<string, string | boolean | number>): Promise<any> {
        const paramString = this.convertParamsToString({ ...params, api_key: this.apiKey });
        const path = `${this.baseUrl}${endpoint}?${paramString}`;
        return await axios.get(path);
    }

    private convertParamsToString(params: Record<string, string | boolean | number>): string {
        if (!params) {
            return '';
        }

        const entries = Object.entries(params);
        if (entries.length === 0) {
            return '';
        }

        return entries.map(([param, val]) => `${param}=${val}`).join('&');
    }
}
