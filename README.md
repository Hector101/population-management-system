[![Build Status](https://travis-ci.org/Hector101/population-management-system.svg?branch=master)](https://travis-ci.org/Hector101/population-management-system) [![Coverage Status](https://coveralls.io/repos/github/Hector101/population-management-system/badge.svg?branch=master)](https://coveralls.io/github/Hector101/population-management-system?branch=master)


# Population Management System

**Collect the population details of residents in different locations**

## Technologies Used
- **Node.js** -- Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine, used to write server side application.
- **ExpressJS** -- A Framework built on top of Node.js for building flexible and scalable web applications.
- **GraphQL** -- GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools.
- **PostgresQL** -- PostgreSQL is a powerful, open source object-relational database system with over 30 years of active development that has earned it a strong reputation for reliability, feature robustness, and performance.
- **Jest** -- Jest is a delightful JavaScript Testing Framework with a focus on simplicity
- **Supertest** -- Module for testing node.js HTTP servers using a fluent API.

## API Documentation
A detailed API documentation for the application can be found. [here](https://pms-lms.herokuapp.com)


## Tessting Application
Visit the following [Link](https://pms-lms.herokuapp.com/graphql) to test the the following GraphQL Mutations (`createLocation`, `updateLocation`, `deleteLocation`) and GraphQL Query (`locationsPopulation`).

##### Examples:
```
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
```

```
mutation {
  createLocation(name: "Anthony", malePopulation: 10, femalePopulation: 15, parentId: "Optional ID") {
    id
    malePopulation
    femalePopulation
    totalPopulation
    parentId
  }
  updateLocation(id: "Existing location population ID Eg: e9067445-7c1c-4ccd-b36f-2ccd556ac163", name: "Ilupeju", malePopulation: 10) {
    message
  }
  deleteLocation(id: "Existing location population ID Eg: e9067445-7c1c-4ccd-b36f-2ccd556ac163") {
    message
  }
}
```




## Prerequisites
The following should be installed in your machine
- Node v10.13.0

## How To Install And Run The Application

* Clone this Repo and `cd` into it
* Install all the dependancies by running the `npm install`
* Run `npm run dev:migration` to setup the database tables.
* Start the application on development mode by running `npm run dev`
* Visit `http://localhost:5000` to see API documentation.
* Visit `http://localhost:5000/graphql` to test all functionalities.


## How To Contribute
Kindly refer to the guide above to setup, and reachout to admin for further instructions

### Issues
Issues are always very welcome. Please be sure to create a constructive issue when neccessary.

### Pull requests
We're glad to get pull request if anything is missing or something is buggy. However, there are a couple of things you can do to make life easier for the maintainers:

- Explain the issue that your PR is solving - or link to an existing issue
- Follow the repository structure, and new sections in the corresponding folders
- Ask questions to admin if unclear
