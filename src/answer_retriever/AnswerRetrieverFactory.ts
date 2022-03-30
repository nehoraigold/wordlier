import { InitializationParams } from '../utils/InitializationParams';
import { IAnswerRetriever } from './IAnswerRetriever';
import { AnswerRetrieverType } from './AnswerRetrieverType';
import { HardCodedAnswerRetriever } from './HardCodedAnswerRetriever';
import { RandomWordApiAnswerRetriever } from './RandomWordApiAnswerRetriever';
import { WordnikApiAnswerRetriever } from './WordnikApiAnswerRetriever';

export class AnswerRetrieverFactory {
    public static Create(type: AnswerRetrieverType, initializationParams: InitializationParams): IAnswerRetriever {
        switch (type) {
            case AnswerRetrieverType.HARD_CODED:
                return new HardCodedAnswerRetriever();
            case AnswerRetrieverType.WORDNIK_API:
                const { wordnikClient } = initializationParams;
                return new WordnikApiAnswerRetriever(wordnikClient);
            case AnswerRetrieverType.RANDOM_WORD_API:
            default:
                return new RandomWordApiAnswerRetriever();
        }
    }
}
