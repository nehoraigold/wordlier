import { AppConfig } from '../../../app/AppConfig';
import { ElementAnswerRetriever } from '../../elements/answer_retriever/ElementAnswerRetriever';
import { PeriodicTableCache } from '../../elements/element_provider/PeriodicTableCache';
import { ElementGameConfig } from '../../elements/ElementGameConfig';
import { PeriodicTableApiClient } from '../../elements/element_provider/PeriodicTableApiClient';
import { GameType } from '../../GameType';
import { HardCodedAnswerRetriever } from '../../words/answer_retriever/HardCodedAnswerRetriever';
import { RandomWordApiAnswerRetriever } from '../../words/answer_retriever/RandomWordApiAnswerRetriever';
import { WordAnswerRetrieverType } from '../../words/answer_retriever/WordAnswerRetrieverType';
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
        let { cachedElementProvider, elementProvider } = gameConfig;
        if (!elementProvider) {
            elementProvider = cachedElementProvider
                ? new PeriodicTableCache(new PeriodicTableApiClient())
                : new PeriodicTableApiClient();
            gameConfig.elementProvider = elementProvider;
        }
        return new ElementAnswerRetriever(elementProvider);
    }

    private static createWordAnswerRetriever(gameConfig: WordGameConfig): IAnswerRetriever {
        const { answerRetrieverType } = gameConfig;
        switch (answerRetrieverType) {
            case WordAnswerRetrieverType.HARD_CODED:
                return new HardCodedAnswerRetriever();
            case WordAnswerRetrieverType.WORDNIK_API:
                let apiClient = gameConfig.wordnikApiClient;
                if (!apiClient) {
                    apiClient = new WordnikApiClient(gameConfig.wordnikApiKey);
                    gameConfig.wordnikApiClient = apiClient;
                }
                return new WordnikApiAnswerRetriever(apiClient);
            case WordAnswerRetrieverType.RANDOM_WORD_API:
            default:
                return new RandomWordApiAnswerRetriever();
        }
    }
}
