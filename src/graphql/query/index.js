
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} from 'graphql';

import  createLocationType from '../mutation/createLocationType';
import locationsPopulationResolver from './locationsPopulationResolver';

export default new GraphQLObjectType({
  name: 'RootQuery',
  description: 'Root Query for Population Management System',
  fields: {
    locationsPopulation: {
      type: new GraphQLList(createLocationType),
      description: 'List of all locations and their population details',
      resolve: locationsPopulationResolver,
    }
  }
});
