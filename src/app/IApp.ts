export interface IApp {
    Initialize(): Promise<boolean>;
    Run(): Promise<void>;
    Close(): Promise<void>;
}
