import { HEADER_CORNER_CHAR, HEADER_HORIZONTAL_CHAR, HEADER_SPACING, HEADER_VERTICAL_CHAR } from './constants';

export const GetHeader = (header: string): string => {
    const border =
        HEADER_CORNER_CHAR + HEADER_HORIZONTAL_CHAR.repeat(header.length + HEADER_SPACING * 2) + HEADER_CORNER_CHAR;
    const title =
        HEADER_VERTICAL_CHAR + ' '.repeat(HEADER_SPACING) + header + ' '.repeat(HEADER_SPACING) + HEADER_VERTICAL_CHAR;
    return `${border}\n${title}\n${border}\n`;
};
