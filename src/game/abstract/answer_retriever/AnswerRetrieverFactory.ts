import { AppConfig } from '../../../app/AppConfig';
import { ElementGameConfig } from '../../elements/ElementGameConfig';
import { GameType } from '../../GameType';
import { HardCodedAnswerRetriever } from '../../words/answer_retriever/HardCodedAnswerRetriever';
import { RandomWordApiAnswerRetriever } from '../../words/answer_retriever/RandomWordApiAnswerRetriever';
import { StringAnswerRetrieverType } from '../../words/answer_retriever/StringAnswerRetrieverType';
import { WordnikApiAnswerRetriever } from '../../words/answer_retriever/WordnikApiAnswerRetriever';
import { WordGameConfig } from '../../words/WordGameConfig';
import { WordnikApiClient } from '../../words/WordnikApiClient';
import { IAnswerRetriever } from './IAnswerRetriever';

export class AnswerRetrieverFactory {
    public static Create(config: AppConfig): IAnswerRetriever {
        const { gameType, gameConfigs } = config;
        switch (gameType) {
            case GameType.WORD:
                return this.createWordAnswerRetriever(gameConfigs[gameType]);
            case GameType.ELEMENT:
                return this.createElementAnswerRetriever(gameConfigs[gameType]);
            default:
                throw `Unknown game type "${gameType}"! Must be one of ${Object.values(GameType).join(', ')}`;
        }
    }

    private static createElementAnswerRetriever(gameConfig: ElementGameConfig): IAnswerRetriever {
        return null;
    }

    private static createWordAnswerRetriever(gameConfig: WordGameConfig): IAnswerRetriever {
        const { answerRetrieverType, wordnikApiKey } = gameConfig;
        switch (answerRetrieverType) {
            case StringAnswerRetrieverType.HARD_CODED:
                return new HardCodedAnswerRetriever();
            case StringAnswerRetrieverType.WORDNIK_API:
                const wordnikClient = new WordnikApiClient(wordnikApiKey);
                return new WordnikApiAnswerRetriever(wordnikClient);
            case StringAnswerRetrieverType.RANDOM_WORD_API:
            default:
                return new RandomWordApiAnswerRetriever();
        }
    }
}
