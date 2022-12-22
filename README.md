# Logger Adapter Typescript (NodeJs)

Este adapter foi desenvolvido com a finalidade de implementar métodos padrão para o acionamento de N Ferramentas de monitoria de uma aplicação, dentre eles o start da monitoria caso haja, captura de erros e captura de transações. 

Por padrão ele já está implementando as seguintes ferramentas: 

Elastic APM e Sentry e StackDriver (gcloud logging).

## Copiando arquivos para o seu projeto Typescript

Para utilizar o logger adapter, basta copiar o folder "adapters" para dentro do projeto junto com o arquivo "intances.ts" 

## Adicionando dependências nescessárias

O projeto precisará das seguintes dependências: 'elastic-apm-node' , '@sentry/node' e 'json-stringify-safe' . Para adicioná-las execute os seguites comandos: 

```
npm i elastic-apm-node 
npm i @sentry/node 
npm i json-stringify-safe
``` 
## Configurando Environment das ferramentas de monitoria

O projeto precisará da variáveis de ambiente das ferramentas configuradas para que o logger funcione corretamente. É indicado que sejam adicionadas ao docker-compose.yml do sua aplicação para realização de testes locais. 

```
#Sentry 
SENTRY_ENV: local
SENTRY_DSN: https://example.com.br

#Elastic - APM
ELASTIC_APM_SECRET_TOKEN: your_token
ELASTIC_APM_SERVER_URL: https://example.com.br
ELASTIC_APM_ENVIRONMENT: local 
```

## Incluindo as chamadas do logger adapter

Para realizar a inclusão dos logs em sua aplicação, você deverá realizar o import do logger para o arquivo no qual deseja usá-lo.

É importante resaltar tambem que o "instances.ts" deverá ser importado no arquivo onde a aplicação inicia, para que o agente do elastic apm consiga capturar todas as transações. 

Exemplo "index.ts": 

```javascript

import './instances.ts'

//ou

import { logger } from './instances.ts'

```

Após isto você poderá chamar o método desejado de acordo com a severidade do erro, são eles: 

:skull: logger.fatal => Deverá logar um fatal de teste nas ferramentas (Sentry, ElasticAPM e StackDriver) <br>
:x: logger.error => Deverá logar um erro de teste nas ferramentas (Sentry, ElasticAPM e StackDriver) <br>
:warning: logger.warn => Deverá logar um warn de teste nas ferramentas (Sentry e StackDriver) <br>
:information_source: logger.info => Deverá logar um info de teste nas ferramentas (StackDriver) <br>
:wrench: logger.debug => Deverá logar um debug de teste nas ferramentas (StackDriver) <br>

Ambos possuem os mesmos parametros, porem o "transactionError" só é aplicado á fatal e error. 

```
transactionName: string    //receberá o nome da transação de erro. 
transactionData: any  //receberá os dados adicionais do erro. 
transactionError: Error  //receberá o objeto de erro, caso haja. 
transactionTags: object  //receberá um objeto contendo as tags a serem exibidas no cabeçalho do sentry.

```
Obs: Há arquivo de teste neste repositório chamado "logger.spec.ts", você poderá executa-lo caso queira testar todos os métodos de uma só vez. 

### Exemplo index.ts :

```javascript
import { logger } from './instances'

try {
    // your logic here
} catch(error){
    logger.error({
        transactionName: '[TESTING] Error', 
        transactionData: { response: 'Erro teste!' }, 
        transactionTags: { example: 'test'}
    });
}

```
