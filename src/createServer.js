import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import graghqlHttp from 'express-graphql';
import * as graphql from 'graphql';
import * as graphqlUtilities from 'graphql/utilities';
import fs from 'fs';
import path from 'path';

import logger from './helpers/logger';
import loggerMiddleware from './helpers/loggerMiddleware';

import graphqlSchema from './graphql/schema';

dotenv.config();

const graphqlRequest = (req) => {
  return {
    schema: graphqlSchema,
    graphiql: true,
    formatError: (error) => ({
      message: error.message,
      details: error.stack,
    }),
    context: {
      request: req,
      logging: sql => logger.info({ request: req, sql, })
    }
  }
};

export async function saveNewGraphqlSchema () {
  if (process.env.NODE_ENV === 'development') {
    let schemaJson = await graphql.graphql(graphqlSchema, graphqlUtilities.introspectionQuery);
    let graphQLSchema = graphqlUtilities.buildClientSchema(schemaJson.data);

    // Save schema.json for IDE/tools
    fs.writeFileSync(path.resolve(__dirname, path.join('..', 'schema.json')), JSON.stringify(schemaJson, null, 2));

    // Save user readable schema.graphql
    fs.writeFileSync(path.resolve(__dirname, path.join('..', 'schema.graphql')), graphqlUtilities.printSchema(graphQLSchema));
  }
}

export const createApp =  () => {
  const app = express();
  app.enable('trust proxy');

  app.use(loggerMiddleware());

  app.use(bodyParser.json({ limit: '10mb'}));
  app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

  app.use('/graphql', graghqlHttp(graphqlRequest));
  app.use(express.static('doc'));

  app.use('*', (req, res) => {
    return res.status(404).send('Not found');
  });

  return app;
};


export const startServer =  () => {
  createApp().listen(process.env.PORT || 5000, () => {
    logger.info(`Express server started on port ${ process.env.PORT || 5000}`);
  });
};