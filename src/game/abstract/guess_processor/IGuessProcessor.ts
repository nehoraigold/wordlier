export interface IGuessProcessor<AnswerType, ResultType> {
    Process(guess: AnswerType, answer: AnswerType): ResultType | Promise<ResultType>;
}
