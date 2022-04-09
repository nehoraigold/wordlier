export interface IAnswerRetriever<AnswerT> {
    RetrieveAnswer(): Promise<AnswerT>;
}
