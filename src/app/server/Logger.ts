import chalk from 'chalk';
import { LogLevel } from './LogLevel';
import { CliRenderer } from '../cli/CliRenderer';

export class Logger {
    private readonly logLevel: LogLevel;

    constructor(logLevel?: LogLevel) {
        this.logLevel = logLevel || LogLevel.INFO;
    }

    public Debug(...message: string[]) {
        CliRenderer.Message(chalk.blue(this.formatMessage(LogLevel.DEBUG, ...message)));
    }

    public Info(...message: string[]) {
        CliRenderer.Message(chalk.white(this.formatMessage(LogLevel.INFO, ...message)));
    }

    public Warning(...message: string[]) {
        CliRenderer.Message(chalk.yellowBright(this.formatMessage(LogLevel.WARN, ...message)));
    }

    public Error(...message: string[]) {
        CliRenderer.Message(chalk.redBright(this.formatMessage(LogLevel.ERROR, ...message)));
    }

    private formatMessage(logLevel: LogLevel, ...message: string[]): string {
        return `${new Date(Date.now()).toISOString()}: [${logLevel.toString()}] ${message.join(' ')}`;
    }
}
