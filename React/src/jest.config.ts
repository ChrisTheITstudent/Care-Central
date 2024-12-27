import type { Config } from '@jest/types';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

const config: Config.InitialOptions = {
    verbose: true,
    clearMocks: true,
    resetMocks: true
}

export default config;
