import { ElementData } from '../../elements/ElementData';
import { InitializationParams } from '../../../utils/InitializationParams';
import { HardCodedAnswerRetriever } from '../../words/answer_retriever/HardCodedAnswerRetriever';
import { RandomWordApiAnswerRetriever } from '../../words/answer_retriever/RandomWordApiAnswerRetriever';
import { StringAnswerRetrieverType } from '../../words/answer_retriever/StringAnswerRetrieverType';
import { WordnikApiAnswerRetriever } from '../../words/answer_retriever/WordnikApiAnswerRetriever';
import { AnswerTypeMap } from '../AnswerType';
import { IAnswerRetriever } from './IAnswerRetriever';

export class AnswerRetrieverFactory {
    public static Create<AnswerT extends keyof AnswerTypeMap>(
        answerType: AnswerT,
        initializationParams: InitializationParams,
    ): IAnswerRetriever<AnswerTypeMap[AnswerT]> {
        let answerRetriever = null;
        switch (answerType) {
            case 'string':
                answerRetriever = this.createStringAnswerRetriever(initializationParams);
                break;
            case 'element':
                answerRetriever = this.createElementAnswerRetriever(initializationParams);
                break;
        }
        return answerRetriever;
    }

    private static createElementAnswerRetriever(
        initializationParams: InitializationParams,
    ): IAnswerRetriever<ElementData> {
        return null;
    }

    private static createStringAnswerRetriever(initializationParams: InitializationParams): IAnswerRetriever<string> {
        switch (initializationParams.stringAnswerRetrieverType) {
            case StringAnswerRetrieverType.HARD_CODED:
                return new HardCodedAnswerRetriever();
            case StringAnswerRetrieverType.WORDNIK_API:
                const { wordnikClient } = initializationParams;
                return new WordnikApiAnswerRetriever(wordnikClient);
            case StringAnswerRetrieverType.RANDOM_WORD_API:
            default:
                return new RandomWordApiAnswerRetriever();
        }
    }
}
