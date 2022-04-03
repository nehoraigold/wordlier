import config from '../config.json';
import { AppConfig } from './app/AppConfig';
import { IApp } from './app/IApp';
import { AppMode } from './app/AppMode';
import { CliApp } from './app/cli/CliApp';
import { ServerApp } from './app/server/ServerApp';

const main = async (): Promise<void> => {
    const app = getApp(config as AppConfig);

    if (!(await app.Initialize())) {
        console.error('Unable to initialize app!');
        return;
    }
    await app.Run();

    process.on('SIGINT', () => {
        app.Close();
    });
};

const getApp = (config: AppConfig): IApp => {
    const { appMode } = config;
    switch (appMode) {
        case AppMode.CLI:
            return new CliApp(config);
        case AppMode.SERVER:
            return new ServerApp(config);
        default:
            throw `Unknown app mode ${appMode}! Supported options are ${Object.values(AppMode).join(', ')}`;
    }
};

main();
