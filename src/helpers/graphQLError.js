import { createError } from 'apollo-errors';

const GraphQLError = createError('GraphQLError', {
  message: 'Error occurred'
});

export default GraphQLError;
