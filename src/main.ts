import { AppConfig } from './app/AppConfig';
import { IApp } from './app/IApp';
import { AppMode } from './app/AppMode';
import { CliApp } from './app/cli/CliApp';
import { ServerApp } from './app/server/ServerApp';
import { LoadJson } from './utils/utils';

const main = async (): Promise<void> => {
    const configJsonFilePath = process.argv[2] || 'config.json';
    const app = getApp(LoadJson(configJsonFilePath) as AppConfig);

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
