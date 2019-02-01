import db from '../../db';

import GraphQLError from '../../helpers/graphQLError';

const locationsPopulationResolver = async (parent, args, { request }) => {
  try {
    const allLocations = await db.location.findAll();

    return allLocations;
  } catch(e) {
    throw new GraphQLError({
      message: e.toString().substr(7),
    });
  }
}

export default locationsPopulationResolver;
