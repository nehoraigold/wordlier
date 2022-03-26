export interface IAnswerRetriever {
    RetrieveAnswer(wordLength: number): Promise<string>;
}
