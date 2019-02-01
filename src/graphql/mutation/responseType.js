import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

export default new GraphQLObjectType({
  name: 'message',
  description: 'Response message',
  fields: {
    message: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'message after successful location population modification'
    },
  },
})