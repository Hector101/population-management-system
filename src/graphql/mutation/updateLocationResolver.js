import db from '../../db';

import GraphQLError from '../../helpers/graphQLError';

const updateLocationResolver = async (parent, {
  id,
  name,
  malePopulation,
  femalePopulation,
  totalPopulation,
  parentId
}, { request }) => {
  try {
    const updateFields = Object.assign({},
      name && { name },
      malePopulation && { malePopulation },
      femalePopulation && { femalePopulation },
      totalPopulation && { totalPopulation },
    );
    const currentLocation = await db.location.findById(id);

    if(!currentLocation) {
      throw new Error('Location does not exist, try again');
    }

    await currentLocation.update(updateFields);
    
    return {
      message: 'Location population successfully updated'
    };
  } catch(e) {
    throw new GraphQLError({
      message: e.toString().substr(7),
    });
  }
}

export default updateLocationResolver;
