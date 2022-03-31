import { CliApp } from './app/cli/CliApp';

const main = async (): Promise<void> => {
    const app = new CliApp(JSON.parse(`{"answerRetrieverType":"random_word_api","guessValidatorType":"none"}`));

    if (!(await app.Initialize())) {
        console.error('Unable to initialize app!');
        return;
    }
    await app.Run();
    await app.Close();
};

main();
