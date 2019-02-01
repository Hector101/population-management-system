
import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
} from 'graphql';

import createLocationType from './createLocationType';
import responseType from './responseType';
import createLocationResolver from './createLocationResolver';
import updateLocationResolver from './updateLocationResolver';
import deleteLocationResolver from './deleteLocationResolver';

export default new GraphQLObjectType({
  name: 'RootMutation',
  description: 'Root Mutation for Population Management System',
  fields: {
    createLocation: {
      type: createLocationType,
      description: 'Create new location with the population details of location',
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString),
        },
        malePopulation: {
          type: new GraphQLNonNull(GraphQLInt),
        },
        femalePopulation: {
          type: new GraphQLNonNull(GraphQLInt),
        },
        parentId: {
          type: GraphQLString,
        },
      },
      resolve: createLocationResolver
    },
    updateLocation: {
      type: responseType,
      description: 'Update existing population details of a location',
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
        name: {
          type: GraphQLString,
        },
        malePopulation: {
          type: GraphQLInt,
        },
        femalePopulation: {
          type: GraphQLInt,
        },
        totalPopulation: {
          type: GraphQLInt,
        },
        parentId: {
          type: GraphQLString,
        },
      },
      resolve: updateLocationResolver,
    },
    deleteLocation: {
      type: responseType,
      description: 'Delete existing population details of a location',
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: deleteLocationResolver,
    }
  }
});
