import request from 'supertest';

import { createApp } from '../createServer';

export default async (query) => {
  const resposnse = await request(createApp()).post('/graphql').send({ query });
  return resposnse;
}