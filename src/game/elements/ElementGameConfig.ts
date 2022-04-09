import { IElementProvider } from './element_provider/IElementProvider';

export type ElementGameConfig = {
    turnCount: number;
    cachedElementProvider?: boolean;
    elementProvider?: IElementProvider;
};
