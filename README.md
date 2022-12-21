## Logger Adapter Typescript

# Copiando para o projeto Typescript

1 - Para utilizar o logger adapter baster copia o folder "adapters" para dentro do projeto junto com o arquivo "intances.ts" que será responsável por instanciar a classe dentro dos demais arquivos. 

2 - O projeto precisará das seguintes dependencias 'elastic-apm-node' , '@sentry/node' e 'json-stringify-safe', portanto executar os comandos: 

npm i elastic-apm-node
npm i @sentry/node
npm i json-stringify-safe

3 - O projeto precisará das respectivas ENVs configuradas: 

#Sentry
SENTRY_ENV: local
SENTRY_DSN: https://example.com.br

#Elastic - APM

ELASTIC_APM_SECRET_TOKEN: your_token
ELASTIC_APM_SERVER_URL: https://example.com.br
ELASTIC_APM_ENVIRONMENT: local

4 - Após configuradas as envs, para realizar a incusão dos logs de erro na sua aplicação você deverá realizar o import do {logger} em instances para o arquivo no qual deseja usa-lo. 

Obs: deixei um arquivo de teste neste repositorio com o dome de logger.spec.ts

Exemplo index.ts

import {logger} from './instances'

```
try {
    console.log('sucesso')
} catch(error){
    logger.error({
        transactionName: '[TESTING] Error',
        transactionData: { response: 'Erro teste!' }, 
        transactionTags: { example: 'test'}
    });
}
```


