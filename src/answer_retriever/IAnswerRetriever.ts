export interface IAnswerRetriever {
    RetrieveAnswer(numberOfCharacters: number): Promise<string>;
}
