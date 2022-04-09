import axios from 'axios';
import { ElementData } from '../ElementData';
import { IElementProvider } from './IElementProvider';

// https://documenter.getpostman.com/view/14793990/TzmCgD9k#intro

export class PeriodicTableApiClient implements IElementProvider {
    private readonly baseUrl: string;

    constructor() {
        this.baseUrl = 'https://periodic-table-elements-info.herokuapp.com';
    }

    public async GetElementByAtomicNumber(atomicNumber: number): Promise<ElementData> {
        const endpoint = `element/atomicNumber/${atomicNumber}`;
        const elements = await this.sendApiRequest(endpoint);
        return elements[0];
    }

    public async GetElementByName(elementName: string): Promise<ElementData> {
        const endpoint = `element/name/${elementName}`;
        const elements = await this.sendApiRequest(endpoint);
        return elements[0];
    }

    public async GetElementBySymbol(elementSymbol: string): Promise<ElementData> {
        const endpoint = `element/symbol/${this.normalizeElementSymbol(elementSymbol)}`;
        const elements = await this.sendApiRequest(endpoint);
        return elements[0];
    }

    public async GetAllElements(): Promise<Array<ElementData>> {
        const endpoint = 'elements';
        return await this.sendApiRequest(endpoint);
    }

    private normalizeElementSymbol(elementSymbol: string): string {
        return `${elementSymbol.charAt(0).toUpperCase()}${elementSymbol.substring(1)}`;
    }

    private async sendApiRequest(endpoint: string): Promise<Array<ElementData>> {
        try {
            const headers = { Accept: 'application/json' };
            const res = await axios.get(`${this.baseUrl}/${endpoint}`, { headers });
            return res?.data || [];
        } catch (err) {
            console.log(err);
            return [];
        }
    }
}