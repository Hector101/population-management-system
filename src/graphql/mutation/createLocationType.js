import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
} from 'graphql';

export default new GraphQLObjectType({
  name: 'location',
  description: 'Location population details',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'Location ID'
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Location name',
    },
    malePopulation: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'Male population in a location',
    },
    femalePopulation: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'Female population in a location',
    },
    totalPopulation: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'Total population of both genders in this location',
    },
    parentId: {
      type: GraphQLString,
      description: 'primary key of location\'s parent location',
    },
  }
});
