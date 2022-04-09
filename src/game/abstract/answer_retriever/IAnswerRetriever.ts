import { GuessType } from '../../GuessType';

export interface IAnswerRetriever {
    RetrieveAnswer(): Promise<GuessType>;
}
