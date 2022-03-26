export type ProcessedResult = {
    results: Array<LetterSpace>;
};

export type LetterSpace = {
    letter: string;
    result: LetterSpaceResult;
};

export enum LetterSpaceResult {
    NOT_IN_WORD,
    INCORRECT_LOCATION,
    CORRECT_LOCATION,
}
