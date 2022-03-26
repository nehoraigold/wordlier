import { CliApp } from './CliApp';

const main = async (): Promise<void> => {
    const app = new CliApp();
    if (!(await app.Initialize())) {
        console.log('Unable to initialize app!');
        return;
    }
    await app.Run();
    await app.Close();
};

main();
