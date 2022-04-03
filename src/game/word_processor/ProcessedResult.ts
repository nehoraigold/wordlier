export type ProcessedResult = Array<LetterSpace>;

export type LetterSpace = {
    char: string;
    result: LetterSpaceResult;
};

export enum LetterSpaceResult {
    NOT_IN_WORD,
    INCORRECT_LOCATION,
    CORRECT_LOCATION,
}
