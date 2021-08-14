# Sample-nodejs-REST-api

This project is build to understand various concepts used in a Nodejs REST api  <br />
<a href="https://sample-nodejs-rest-api.herokuapp.com/api-docs/">Try out Live<a/> <br />

## Table of Contents

- [Requirement](#requirement)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)  
- [Configuration](#configuration) 
- [ORM](#orm)
- [Lint Checks and Formatting](#lint-checks-and-formatting)
- [Logging](#logging)
- [Testing](#Testing)
- [API Docs](#api-docs)  
- [Other features](#other-features)    
  
  

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



**Test**

  To run tests:
  
```bash
npm test
```

**[Back to top](#table-of-contents)**  
  
## Project Structure

Below is a overview of project structure

  ![image](https://user-images.githubusercontent.com/66126225/129441838-7ff6149e-2d84-4ed3-be40-1f49da4e6872.png)
  

**src folder** 

  ![image](https://user-images.githubusercontent.com/66126225/129400060-b6ec201c-ba37-4f6a-b512-550c8d142edd.png)
  
**[Back to top](#table-of-contents)**

## Configuration

**Environment Variables**
  
`dotenv` and `cross-env` package is used for managing environment variables. The .env is environment sepecific and is loaded based on the defined `process.env.NODE_ENV` value  
  
![image](https://user-images.githubusercontent.com/66126225/129401161-db0402a2-1ee6-43f4-b61e-32fd3968834c.png)
   
  
## ORM  
 `Sequelize` ORM is used to do operations with `MYSQL`  
 Connections to DB and all operations related to specific tables is done in models folder

  ![image](https://user-images.githubusercontent.com/66126225/129401730-5b35a609-9d34-4bf8-8f1d-6cf4c5a317d8.png)
  
## Authorization and Authentication
  `bcrypt` and `jsonwebtoken` are used for user authorization and authentication
  
   Check below files
  
  ![image](https://user-images.githubusercontent.com/66126225/129442998-bfe71474-ec6c-4a82-8eb4-dfdbd37fbe07.png)


## Lint Checks and Formatting

- `ESLint` is being used for JS lint checks. `Prettier` is also used in conjunction with ESLint plugins for code formatting.

- There are several pre-defined lint rules in respective individual configuration files.

  ![image](https://user-images.githubusercontent.com/66126225/129402516-a9c2aab4-cd7a-486c-a236-21ebc727ba0b.png)
  
  To run linter 
  
  ```bash
  npm lint
  ```
  
  To auto fix linting errors 
  
  ```bash
  npm lint:fix
  ```
 
**[Back to top](#table-of-contents)**  
  
## Logging

- This project uses `winston` and `morgan ` loggers for logging exception error,info and http request logs. Please check out the winston logger file (`./src/lib/logger.js`) and     morgan logger to work with winston (`./src/middlewares/morgan.middleware.js.js`)

- All log files will go into `./logs` folder.

  ![image](https://user-images.githubusercontent.com/66126225/129403317-3d3acb09-a9a4-4987-9872-21b1384465c0.png)

**[Back to top](#table-of-contents)**

  
## Testing

- All test files reside in `./tests` folder. [Jest](https://jestjs.io/) framework and `supertest` is used for running tests. `jest.setup.js` file is used to load some               configurations before test are run

  ![image](https://user-images.githubusercontent.com/66126225/129441923-6da29f46-2f09-4e4d-b8ff-1b5d6efae447.png)
  
- `Integration tests` are written in this project to test some endpoints which depend on db response
-  There are no `Unit tests`  in this project since this is a sample project
-  My `Unit Tests` can be found here

**[Back to top](#table-of-contents)**
  
## API Docs
  
- [Swagger](https://swagger.io/) is used to design and document the API
- Check out my [API Docs](https://app.swaggerhub.com/apis/pranayusg/nodejs_restapi/0.1) 
  
  ![image](https://user-images.githubusercontent.com/66126225/129442584-ae65c4ad-a07c-406d-9fe2-6e815874974f.png)

**[Back to top](#table-of-contents)**    
  
  
## Other features
  
- Express-validator is used to test the input to API
  
  ![image](https://user-images.githubusercontent.com/66126225/129442179-729e1bd7-1cad-4d3c-8a15-388abb45075b.png)

- Express-rate-limit is used to limit the number of requests to API. DB can be used to store number of requests within a window for better rate limiting
  
  ![image](https://user-images.githubusercontent.com/66126225/129442342-3d88a708-fd73-49c6-b3e1-2237e3175ba8.png)
  ![image](https://user-images.githubusercontent.com/66126225/129453534-5d98df1d-849b-4852-8186-31189d8704b0.png)

- `nodemailer` is used to sent status mails

   ![image](https://user-images.githubusercontent.com/66126225/129442453-7952dfe6-bba9-4a84-ba41-9d3cc414937e.png)

**[Back to top](#table-of-contents)**  
  
