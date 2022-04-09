import { ElementData } from '../ElementData';
import { IElementProvider } from './IElementProvider';
import { PeriodicTableApiClient } from './PeriodicTableApiClient';

export class PeriodicTableCache implements IElementProvider {
    private readonly client: PeriodicTableApiClient;
    private inMemoryCache: Array<ElementData>;

    constructor(apiClient: PeriodicTableApiClient) {
        this.client = apiClient;
        this.inMemoryCache = [];
    }

    public async GetAllElements(): Promise<Array<ElementData>> {
        await this.populateCacheIfNeeded();
        return this.inMemoryCache;
    }

    public async GetElementByAtomicNumber(atomicNumber: number): Promise<ElementData> {
        await this.populateCacheIfNeeded();
        return this.inMemoryCache.find(({ atomicNumber: atomicNum }) => atomicNum === atomicNumber);
    }

    public async GetElementByName(elementName: string): Promise<ElementData> {
        await this.populateCacheIfNeeded();
        return this.inMemoryCache.find(({ name }) => name.toLowerCase() === elementName.toLowerCase());
    }

    public async GetElementBySymbol(elementSymbol: string): Promise<ElementData> {
        await this.populateCacheIfNeeded();
        return this.inMemoryCache.find(({ symbol }) => elementSymbol.toLowerCase() === symbol.toLowerCase());
    }

    private async populateCacheIfNeeded(): Promise<void> {
        if (this.inMemoryCache.length === 0) {
            this.inMemoryCache = await this.client.GetAllElements();
        }
    }
}
