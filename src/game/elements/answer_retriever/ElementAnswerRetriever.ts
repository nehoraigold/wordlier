import { NUMBER_OF_ELEMENTS } from '../../../utils/constants';
import { IAnswerRetriever } from '../../abstract/answer_retriever/IAnswerRetriever';
import { ElementData } from '../ElementData';
import { IElementProvider } from '../element_provider/IElementProvider';

export class ElementAnswerRetriever implements IAnswerRetriever {
    private readonly elementProvider: IElementProvider;

    constructor(elementProvider: IElementProvider) {
        this.elementProvider = elementProvider;
    }

    public async RetrieveAnswer(): Promise<ElementData> {
        const atomicNumber = this.getRandomAtomicNumber();
        return await this.elementProvider.GetElementByAtomicNumber(atomicNumber);
    }

    private getRandomAtomicNumber(): number {
        return Math.floor(NUMBER_OF_ELEMENTS * Math.random()) + 1;
    }
}
