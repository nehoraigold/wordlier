import fs from 'fs';

export const LoadJson = (filepath: string) => {
    if (!fs.existsSync(filepath)) {
        return null;
    }
    const contents = fs.readFileSync(filepath, 'utf8');
    return JSON.parse(contents);
};

export const IsSelectionValid = <T>(selection: T, options: Array<T> | Record<string, T>) => {
    if (!Array.isArray(options)) {
        options = Object.values(options);
    }
    return options.includes(selection);
};

export const ForArrayOrValue = async <Type>(
    value: Array<Type> | Type,
    callback: (value: Type) => void | Promise<void>,
) => {
    if (Array.isArray(value)) {
        for (const val of value) {
            await callback(val);
        }
    } else {
        await callback(value);
    }
};
