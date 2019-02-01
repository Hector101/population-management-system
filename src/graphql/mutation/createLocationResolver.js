import db from '../../db';

import GraphQLError from '../../helpers/graphQLError';

const createLocationResolver = async (parent, {
  name,
  malePopulation,
  femalePopulation,
  parentId
}, { request }) => {
  try {
    const whereQueryOptions = Object.assign({},
      parentId && { id: parentId },
    );

    const parentLocation = await db.location.findOne({
      where: {
        ...whereQueryOptions
      },
    });

    if(!parentLocation && parentId) {
      throw new Error('Parent location does not exist, try again');
    }

    const newLocation = await db.location.findOrCreate({
      where: { name },
      defaults: {
        name,
        malePopulation,
        femalePopulation,
        totalPopulation: malePopulation + femalePopulation,
        parentId:  parentId || null,
     }
    }).spread((location, created) => {
      if(!created) return null;
      return location;
    });

    if(!newLocation) {
      throw new Error('Location population already created');
    }

    if(parentLocation) {
      parentLocation.update({
        malePopulation: parentLocation.malePopulation + malePopulation,
        femalePopulation: parentLocation.femalePopulation + femalePopulation,
        totalPopulation: parentLocation.totalPopulation + malePopulation + femalePopulation,
      });
    }
    
    return {
      id: newLocation.id,
      name,
      malePopulation,
      femalePopulation,
      totalPopulation: newLocation.totalPopulation,
      parentId: newLocation.parentId,
    };
  } catch(e) {
    throw new GraphQLError({
      message: e.toString().substr(7),
    });
  }
}

export default createLocationResolver;
