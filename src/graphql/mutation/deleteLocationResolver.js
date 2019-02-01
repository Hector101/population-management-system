import db from '../../db';

import GraphQLError from '../../helpers/graphQLError';

const deleteLocationResolver = async (parent, {
  id,
}, { request }) => {
  try {
    const currentLocation = await db.location.findById(id);

    if(!currentLocation) {
      throw new Error('Location does not exist, try again');
    };

    const { parentId, malePopulation, femalePopulation, totalPopulation } = currentLocation;

    const parentLocation = parentId && await db.location.findById(parentId);

    if(parentLocation) {
      parentLocation.update({
        malePopulation: parentLocation.malePopulation - currentLocation.malePopulation,
        femalePopulation: parentLocation.femalePopulation - currentLocation.femalePopulation,
        totalPopulation: parentLocation.totalPopulation - (currentLocation.malePopulation + currentLocation.femalePopulation),
      });
    };

    await currentLocation.destroy();
    
    return {
      message: 'Location population successfully deleted'
    };
  } catch(e) {
    throw new GraphQLError({
      message: e.toString().substr(7),
    });
  }
}

export default deleteLocationResolver;
