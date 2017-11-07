/*
En este archivo implementaremos el servidor al que realizaremos peticiones basadas en GraphQL.
*/

import express from 'express';
import graphqlHTTP from 'express-graphql';

import log4js from './common/logger';
var logger = log4js.getLogger('server');

import { environment, serverConf }  from './config';

const app = express();

app.use(
    '/graphql', 
    graphqlHTTP((request, response, graphQLParams) => ({
        graphiql: (environment.match('development')) ? true : false
    }))
);

app.listen(
    serverConf.api_gql.port,
    () => {
        logger.info('##########################################################');
        logger.info('#####            STARTING GRAPHQL SERVER             #####');
        logger.info('##########################################################\n');
        logger.info(`App running on ${environment.toUpperCase()} mode and listening on port ${serverConf.api_gql.port} ...`);
    }
);