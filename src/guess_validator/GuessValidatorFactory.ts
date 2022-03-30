import { InitializationParams } from '../utils/InitializationParams';
import { GuessValidatorType } from './GuessValidatorType';
import { IGuessValidator } from './IGuessValidator';
import { WordnikGuessValidator } from './WordnikGuessValidator';

export class GuessValidatorFactory {
    public static Create(type: GuessValidatorType, initializationParams: InitializationParams): IGuessValidator {
        switch (type) {
            case GuessValidatorType.WORDNIK_API:
                const { wordnikClient } = initializationParams;
                return new WordnikGuessValidator(wordnikClient);
            case GuessValidatorType.NONE:
            default:
                return null;
        }
    }
}
