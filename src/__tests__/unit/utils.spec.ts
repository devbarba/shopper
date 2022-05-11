import IConfig from 'interfaces/config';
import {
    autoLoadEnvironmentVariables,
    getEnv,
} from 'utils/env';
import { getProjectDir } from 'utils/dir';
import { verifyFields } from 'utils/validate';
import * as dotenv from 'dotenv-safe';
import Joi from 'joi';

import { Sizes } from 'interfaces/product';
import {
    defaultPayload,
    validationResponses,
    missingKeysPayload,
} from '../__mocks__/payloads.mock';

describe('Testing utils functions', () => {
    beforeAll(() => {
        dotenv.config();
    });

    describe('handling getProjectDir()', () => {
        test('expect return dir with getProjectDir()', () => {
            expect(getProjectDir('/')).toBe('/');
            expect.assertions(1);
        });
    });

    describe('handling getEnv()', () => {
        test('expect return NODE_ENV value', () => {
            expect(getEnv('NODE_ENV', 'local')).toBe('test');
            expect.assertions(1);
        });

        test('expect return NODE_ENV value = "test" because alternative NODE_ENV1 does not exists', () => {
            expect(getEnv('NODE_ENV1', 'NODE_ENV')).toBe('test');
            expect.assertions(1);
        });

        test('expect return alternate NON_EXISTENT value', () => {
            expect(getEnv('NON_EXISTENT', 'alternate_non_existent')).toBe(
                'alternate_non_existent',
            );
            expect.assertions(1);
        });
    });

    describe('handling autoLoadEnvironmentVariables()', () => {
        test('expect load all envs with autoLoadEnvironmentVariables()', () => {
            expect(autoLoadEnvironmentVariables(getProjectDir())).toMatchObject(
                {} as IConfig,
            );
            expect.assertions(1);
        });

        test('expect throw error whentry to load envs with autoLoadEnvironmentVariables()', () => {
            expect(() => autoLoadEnvironmentVariables(getProjectDir('/non-existent'))).toThrow(
                'configs dir does not exists',
            );
            expect.assertions(1);
        });
    });

    describe('handling verifyFields()', () => {
        const joiSchema = Joi.array()
            .items(
                Joi.object({
                    sku: Joi.string().regex(/^[a-zA-Z0-9-_]+$/).required(),
                    name: Joi.string().required(),
                    size: Joi.valid(Sizes.L, Sizes.M, Sizes.S, Sizes.XL, Sizes.XXL),
                    price: Joi.number().required(),
                    stockLevel: Joi.number().required(),
                }).required(),
            )
            .required();

        test('expect to return value must be an array when call verifyFields()', () => {
            expect(() => verifyFields(missingKeysPayload, joiSchema)).toThrowError(`value ${validationResponses[3]}`);
            expect.assertions(1);
        });

        test('expect to return value must be a string when call verifyFields()', () => {
            expect(() => verifyFields([{ ...missingKeysPayload, sku: 1 }], joiSchema)).toThrowError(`[0].sku ${validationResponses[2]}`);
            expect.assertions(1);
        });

        test('expect to return missing fields when call verifyFields()', () => {
            expect(() => verifyFields([missingKeysPayload], joiSchema)).toThrowError(`price ${validationResponses[1]}`);
            expect.assertions(1);
        });

        test('expect to return extra fields when call verifyFields()', () => {
            expect(() => verifyFields([{ ...defaultPayload, testing: true }], joiSchema)).toThrowError(`testing ${validationResponses[0]}`);
            expect.assertions(1);
        });

        test('expect to return void when call verifyFields()', () => {
            expect(verifyFields([defaultPayload], joiSchema)).toBeFalsy();
            expect.assertions(1);
        });

        test('expect to return validation error when call verifyFields() cause invalid field value: error', () => {
            expect(() => verifyFields(
                [{ ...defaultPayload, error: 'abc' }],
                joiSchema,
            )).toThrowError(`[0].error ${validationResponses[0]}`);
            expect.assertions(1);
        });
    });
});
