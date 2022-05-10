import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv-safe';
import IConfig from 'interfaces/config';

dotenv.config({
    allowEmptyValues: true,
});

/**
 * Automatic load environment variables from configDir.
 * @param envsDir string
 * @returns IConfig
 */
function autoLoadEnvironmentVariables(envsDir: string): IConfig {
    const configDir = path.resolve(envsDir, 'config');

    if (!fs.existsSync(configDir)) {
        throw new Error('configs dir does not exists');
    }

    const configFiles = fs.readdirSync(configDir);

    if (configFiles.length === 0) {
        throw new Error('does not exist any config files');
    }

    const configurations: any = [];

    configFiles.forEach((file) => {
        const filePath = path.join(configDir, file);
        configurations[file.split('.')[0]] = require(filePath).default;
    });

    return configurations;
}

/**
 * Return environment variable by key or return alternate.
 * @param key string
 * @param alternate string | number
 * @returns string | number | undefined
 */
function getEnv(key: string, alternate: string | number): string | number | undefined {
    if (process.env[key] && process.env[key] !== null) return process.env[key];

    if (process.env[alternate] && process.env[alternate] !== null) {
        return process.env[alternate];
    }

    return alternate;
}

export { autoLoadEnvironmentVariables, getEnv };
