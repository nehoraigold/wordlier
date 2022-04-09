import { IAnswerRetriever } from '../../abstract/answer_retriever/IAnswerRetriever';

export class HardCodedAnswerRetriever implements IAnswerRetriever {
    public async RetrieveAnswer(): Promise<string> {
        return 'house';
    }
}
