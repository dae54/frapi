# IMPREST SYSTEM (Fund Request App)

Imprest System (Fund Request App) is an internal iPF App which is designed to enhance efficiency in internal iPF fund requesting process while also ensures the funds disbursed are within the budget allocated and remove manual processing of requests

## GETTING STARTED

- Clone the repository
  - click [here](https://github.com/dae54/fund-request-api.git) to copy the link
- Checkout develop branch, for development
  ```
  git checkout develop
  ```
- Run command

  ```
  npm install
  ```

  To install dependencies

- Create .env file for development environment following this format

  ```env
  PORT = 8080
  MONGO_DB_HOST_LOCAL = mongodb://localhost:27017/imprest
  MONGO_DB_HOST_REMOTE = mongodb+srv://daniel:dhbff7ybiinm@cluster0-1rhip.mongodb.net/test?retryWrites=true&w=majority
  JWT_SECRET = s3cr3t
  ```

  Run command

  ```
  npm start
  ```

  To install dependencies
