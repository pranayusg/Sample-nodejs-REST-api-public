# Sample-nodejs-REST-api

This project is build to understand various concepts used in a Nodejs REST api  <br />
<a href="https://sample-nodejs-rest-api.herokuapp.com/api-docs/">Try out Live<a/> <br />

## Table of Contents

- [Requirement](#requirement)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure) / [Configuration](#configuration) / [CLI and ORM](#cli-and-orm)
- [Controllers](#controllers) / [Models](#models) / [Views](#views)
- [Frontend Assets](#frontend-assets)
- [Session Management](#session-management)
- [Nodemon and Webpack](#nodemon-and-webpack)
- [Lint Checks and Formatting](#lint-checks-and-formatting)
- [Logging](#logging)
- [Testing](#Testing)
- [Changelog](#changelog)
- [License](#license)

## Requirement

This project starter should be working as expected with the following minimal version of Node/NPM, respectively:

| Dependency |  Version   |
| ---------- | :--------: |
| Node       |  v14.17.3  |
| NPM        |   6.14.13  |

**[Back to top](#table-of-contents)**

## Quick Start

1. Clone the git repository into your new project folder and install required dependencies by running the command below:

```bash
# cloning git repository into `my-project` folder
git clone https://github.com/pranayusg/Sample-nodejs-REST-api-public.git
  
# install project dependencies
cd Sample-nodejs-REST-api-public && npm install
```

2. Running application by executing one of the following scripts:

**Development**

```bash
npm run dev
```

**Production**

  ```bash
npm run prod
```

To run tests:

**Test**

```bash
npm test
```

**[Back to top](#table-of-contents)**  
  
## Project Structure

Below is a overview of project structure

  ![image](https://user-images.githubusercontent.com/66126225/129399953-fe42694b-44ef-473b-805c-fe7958262124.png)
  

**src folder** 

  ![image](https://user-images.githubusercontent.com/66126225/129400060-b6ec201c-ba37-4f6a-b512-550c8d142edd.png)
  
**[Back to top](#table-of-contents)**

## Configuration

**Environment Variables**
  
`dotenv` package is used for managing environment variables. The .env is environment sepecific and is loaded based on the defined `process.env.NODE_ENV` value  
  
![image](https://user-images.githubusercontent.com/66126225/129401161-db0402a2-1ee6-43f4-b61e-32fd3968834c.png)
  
## ORM  
 `Sequelize` ORM is used to do operations with `MYSQL`  
 Connections to DB and all operations related to specific tables is done in models folder

  ![image](https://user-images.githubusercontent.com/66126225/129401730-5b35a609-9d34-4bf8-8f1d-6cf4c5a317d8.png)

## Lint Checks and Formatting

- `ESLint` is being used for JS lint checks. `Prettier` is also used in conjunction with ESLint plugins for code formatting.

- There are several pre-defined lint rules in respective individual configuration files.

  ![image](https://user-images.githubusercontent.com/66126225/129402516-a9c2aab4-cd7a-486c-a236-21ebc727ba0b.png)
 
**[Back to top](#table-of-contents)**  
  
## Logging

- This project uses `winston` and `morgan ` loggers for logging exception error,info and http request logs. Please check out the winston logger file (`./src/lib/logger.js`) and     morgan logger to work with winston (`./src/middlewares/morgan.middleware.js.js`)

- All log files will go into `./storage/logs` folder.

  ![image](https://user-images.githubusercontent.com/66126225/129403317-3d3acb09-a9a4-4987-9872-21b1384465c0.png)

**[Back to top](#table-of-contents)**

  
## Testing

- All test files reside in `./tests` folder. [Jest](https://jestjs.io/) framework is used for running tests. All Jest related config can be seen under `jest.config.js` file.

- Besides, `vue-jest` and `jest-serializer-vue` are also included for testing `.vue` components.

**[Back to top](#table-of-contents)**
  
  
