import { ElementData } from '../ElementData';

export interface IElementProvider {
    GetAllElements(): Promise<Array<ElementData>>;
    GetElementByAtomicNumber(atomicNumber: number): Promise<ElementData>;
    GetElementByName(elementName: string): Promise<ElementData>;
    GetElementBySymbol(elementSymbol: string): Promise<ElementData>;
}