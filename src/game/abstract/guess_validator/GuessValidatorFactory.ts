import { AppConfig } from '../../../app/AppConfig';
import { ForArrayOrValue } from '../../../utils/utils';
import { PeriodicTableApiClient } from '../../elements/element_provider/PeriodicTableApiClient';
import { PeriodicTableCache } from '../../elements/element_provider/PeriodicTableCache';
import { ElementGameConfig } from '../../elements/ElementGameConfig';
import { ElementGuessValidator } from '../../elements/guess_validator/ElementGuessValidator';
import { GameType } from '../../GameType';
import { WordGameConfig } from '../../words/WordGameConfig';
import { WordnikApiClient } from '../../words/WordnikApiClient';
import { GuessValidatorType } from '../GuessValidatorType';
import { CompositeGuessValidator } from './CompositeGuessValidator';
import { IGuessValidator } from './IGuessValidator';
import { RegexGuessValidator } from '../../words/guess_validator/RegexGuessValidator';
import { WordnikGuessValidator } from '../../words/guess_validator/WordnikGuessValidator';

export class GuessValidatorFactory {
    public static Create(config: AppConfig): IGuessValidator {
        const { gameType, gameConfigs } = config;
        switch (gameType) {
            case GameType.WORD:
                return this.createWordGuessValidator(gameConfigs[gameType]);
            case GameType.ELEMENT:
                return this.createElementGuessValidator(gameConfigs[gameType]);
            default:
                return null;
        }
    }

    private static createWordGuessValidator(gameConfig: WordGameConfig): IGuessValidator {
        const { guessValidatorTypes } = gameConfig;
        const guessValidators: Array<IGuessValidator> = [];

        ForArrayOrValue(guessValidatorTypes, (type: GuessValidatorType): void => {
            guessValidators.push(this.createSingleWordGuessValidator(type, gameConfig));
        });

        if (guessValidators.length === 0) {
            return null;
        }
        if (guessValidators.length === 1) {
            return guessValidators[0];
        }
        return new CompositeGuessValidator(guessValidators);
    }

    private static createSingleWordGuessValidator(
        guessValidatorType: GuessValidatorType,
        gameConfig: WordGameConfig,
    ): IGuessValidator {
        const { wordLength } = gameConfig;
        switch (guessValidatorType) {
            case GuessValidatorType.REGEX:
                return new RegexGuessValidator(wordLength);
            case GuessValidatorType.WORDNIK_API:
                let apiClient = gameConfig.wordnikApiClient;
                if (!apiClient) {
                    apiClient = new WordnikApiClient(gameConfig.wordnikApiKey);
                    gameConfig.wordnikApiClient = apiClient;
                }
                return new WordnikGuessValidator(apiClient);
            case GuessValidatorType.NONE:
            default:
                throw `Unknown guess validator type ${guessValidatorType}`;
        }
    }

    private static createElementGuessValidator(gameConfig: ElementGameConfig): IGuessValidator {
        let { cachedElementProvider, elementProvider } = gameConfig;
        if (!elementProvider) {
            elementProvider = cachedElementProvider
                ? new PeriodicTableCache(new PeriodicTableApiClient())
                : new PeriodicTableApiClient();
            gameConfig.elementProvider = elementProvider;
        }
        return new ElementGuessValidator(elementProvider);
    }
}
