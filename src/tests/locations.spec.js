import request from './request';

import db from '../db';

import createLocationMock from './__mocks__/createLocation';

describe('Location', () => {

  afterAll(() => {
    db.location.destroy({
        where: {},
        truncate: true
      });
  });

  test('Successful creation of location population', async (done) => {
    const response = await request(`
      mutation {
        createLocation(name: "Lagos", malePopulation: 10, femalePopulation: 15, parentId: "") {
          id
          malePopulation
          femalePopulation
          totalPopulation
          parentId
        }
      }
    `);

      expect(response.body.data.createLocation.femalePopulation).toEqual(createLocationMock.femalePopulation);
      expect(response.body.data.createLocation.malePopulation).toEqual(createLocationMock.malePopulation);
      expect(response.body.data.createLocation.totalPopulation).toEqual(createLocationMock.totalPopulation);
      done();
  });

  test('Throw an exception if location already exists', async (done) => {
    const response = await request(`
          mutation {
            createLocation(name: "Lagos", malePopulation: 10, femalePopulation: 15, parentId: "") {
              id
              malePopulation
              femalePopulation
              totalPopulation
              parentId
            }
          }
        `);
      done();
  });

  test('Throw an exception if location already exists if invalid parent ID is supplied', async (done) => {
    const response = await request(`
          mutation {
            createLocation(name: "Maryland", malePopulation: 5, femalePopulation: 15, parentId: "ef603695-46bb-4ff9-a374-474e2659b85d") {
              id
              malePopulation
              femalePopulation
              totalPopulation
              parentId
            }
          }
        `);

      done();
  });

  test('Update parent location population after a child is added', async (done) => {
    const parent = await request(`
          mutation {
            createLocation(name: "Ilupeju", malePopulation: 150, femalePopulation: 1500, parentId: "") {
              id
              malePopulation
              femalePopulation
              totalPopulation
              parentId
            }
          }
        `);

      const child = await request(`
          mutation {
            createLocation(name: "Anthony", malePopulation: 50, femalePopulation: 100, parentId: ${parent.body.data.createLocation.id}) {
              id
              malePopulation
              femalePopulation
              totalPopulation
              parentId
            }
          }
        `);

        global.id = child.id;

      expect(parent.body.data.createLocation.totalPopulation).toEqual(1650);

      done();
  });


  test('Delete specific location successfully', async (done) => {
    const parent = await request(`
          mutation {
            createLocation(name: "Abia State", malePopulation: 3000, femalePopulation: 7000, parentId: "") {
              id
              malePopulation
              femalePopulation
              totalPopulation
              parentId
            }
          }
        `);

        
        const response = await request(`
        mutation {
          deleteLocation(id: "${parent.body.data.createLocation.id}") {
            message
          }
        }
        `);

        expect(response.body.data.deleteLocation.message).toEqual('Location population successfully deleted');

      done();
  });

  test('Failed deletion if location does not exist', async (done) => {
        const response = await request(`
        mutation {
          deleteLocation(id: "ef603695-46bb-4ff9-a374-474e2659b85d") {
            message
          }
        }
        `);

      done();
  });

  test('Update parent location when child is deleted', async (done) => {
    const parent = await request(`
          mutation {
            createLocation(name: "Imo State", malePopulation: 3000, femalePopulation: 7000, parentId: "") {
              id
              malePopulation
              femalePopulation
              totalPopulation
              parentId
            }
          }
        `);

        const child = await request(`
          mutation {
            createLocation(name: "Abia State", malePopulation: 3000, femalePopulation: 7000, parentId: "${parent.body.data.createLocation.id}") {
              id
              malePopulation
              femalePopulation
              totalPopulation
              parentId
            }
          }
        `);
      const response = await request(`
      mutation {
        deleteLocation(id: "${child.body.data.createLocation.id}") {
          message
        }
      }
      `);

    done();
  });

  test('Update a specific location population', async (done) => {
    const parent = await request(`
          mutation {
            createLocation(name: "Anambra State", malePopulation: 3000, femalePopulation: 7000, parentId: "") {
              id
              malePopulation
              femalePopulation
              totalPopulation
              parentId
            }
          }
        `);

      const response = await request(`
      mutation {
        updateLocation(id: "${parent.body.data.createLocation.id}", name: "Enugu state", malePopulation: 2000) {
          message
        }
      }
      `);

      expect(response.body.data.updateLocation.message).toEqual('Location population successfully updated');
    done();
  });

  test('Throw an exception if location population to be deleted does not exist', async (done) => {
      const response = await request(`
      mutation {
        updateLocation(id: "ef603695-46bb-4ff9-a374-474e2659b85d", name: "Enugu state", malePopulation: 2000) {
          message
        }
      }
      `);
    done();
  });

  test('All location population', async (done) => {
    const response = await request(`
      query {
        locationsPopulation {
          id
          name
          malePopulation
          femalePopulation
          totalPopulation
          parentId
        }
      }
    `);

    expect(response.body.data.locationsPopulation[0].name).toEqual('Lagos');
    expect(response.body.data.locationsPopulation[1].name).toEqual('Imo State');
    done();
  });
});

