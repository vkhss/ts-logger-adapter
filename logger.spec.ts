import { logger } from "./instances";

describe('Logging Error', () => {
    it('Deverá logar um erro de teste nas ferramentas (Sentry, ElasticAPM e StackDriver)', () => {
        const result = logger.error({
            transactionName: '[TESTING] Error',
            transactionData: { response: 'Erro teste!' }, 
            transactionTags: { example: 'test'}
        });
        expect(result);
    });
});

describe('Logging Warn', () => {
    it('Deverá logar um warn de teste nas ferramentas (Sentry, ElasticAPM e StackDriver)', () => {
        const result = logger.warn({
            transactionName: '[TESTING] Warn',
            transactionData: { response: 'Warn teste!' },
            transactionTags: { example: 'test'}
        });
        expect(result);
    });
});

describe('Logging Fatal', () => {
    it('Deverá logar um fatal de teste nas ferramentas (Sentry, ElasticAPM e StackDriver)', () => {
        const result = logger.fatal({
            transactionName: '[TESTING] Fatal',
            transactionData: { response: 'Fatal teste!' },
            transactionTags: { example: 'test'}
        });
        expect(result);
    });
});

describe('Logging Info', () => {
    it('Deverá logar um info de teste nas ferramentas (StackDriver)', () => {
        const result = logger.info({
            transactionName: '[TESTING] Info',
            transactionData: { response: 'Info teste!' },
            transactionTags: { example: 'test'}
        });
        expect(result);
    });
});

describe('Logging Debug', () => {
    it('Deverá logar um debug de teste nas ferramentas (StackDriver)', () => {
        const result = logger.debug({
            transactionName: '[TESTING] Debug',
            transactionData: { response: 'Debug teste!' },
            transactionTags: { example: 'test'}
        });
        expect(result);
    });
});




