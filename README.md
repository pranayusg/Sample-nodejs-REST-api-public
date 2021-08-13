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
- [Unit Testing](#unit-testing)
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
git clone --depth=1 https://github.com/borisding/avenue-express.git my-project

# install project dependencies
cd Sample-nodejs-REST-api-public && npm install
```

2. Running application by executing one of the following scripts:

**Development**

```bash
npm run dev
```

**Production**

Copy `.env.development` to `./config/dotenv` folder as `.env` for production usage:

```bash
cp config/dotenv/.env.development config/dotenv/.env
```

Change environment variables in `.env` to serve your app. Avoid using the same port for both development and production.

```bash
# build for production ready and start server
npm run build && npm start
```

To run tests:

**Test**

```bash
npm test
```

**[Back to top](#table-of-contents)**  

