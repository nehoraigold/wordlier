import { IAnswerRetriever } from './IAnswerRetriever';

export class HardCodedAnswerRetriever implements IAnswerRetriever {
    public async RetrieveAnswer(numberOfCharacters: number): Promise<string> {
        switch (numberOfCharacters) {
            case 1:
                return 'a';
            case 2:
                return 'it';
            case 3:
                return 'not';
            case 4:
                return 'from';
            case 5:
                return 'house';
            case 6:
                return 'prunes';
            default:
                return '';
        }
    }
}