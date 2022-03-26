export interface IGuessRetriever {
    RetrieveGuess(): Promise<string>;
}