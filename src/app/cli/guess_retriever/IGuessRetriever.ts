import { GuessType } from '../../../game/GuessType';

export interface IGuessRetriever {
    RetrieveGuess(): Promise<GuessType>;
}
