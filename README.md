# IMPREST SYSTEM (Fund Request App)
Imprest System (Fund Request App) is an internal iPF App which is designed to enhance efficiency in internal iPF fund requesting process while also ensures the funds disbursed are within the budget allocated and remove manual processing of requests

## Usage
### Here is the list of available endpoints for this API
#### NB all routes require authentication Bearer Token
## For the Mobile App
- /user/login: 
    - sample request:
    ```json
      "data": {
        "email": "daniel@gmail.com",
        "password": "daniel"
        }
    ```
    - sample response:
        all responses follows 
        [Standard JSON Response](https://github.com/iPFSoftwares/starter-packs/tree/master/Standard%20JSON%20API%20Response) with an addition of a boolean `status`. See below
        ```json
        {
            "message": "You have successully created a request",
            "status": true,
            "data": {
                "status": 0,
                "_id": "5d8c8dde273501072059405a",
                "budgetItemCode": "VCH103",
                "userId": "5d8c7ea98e8e4e7c989442f2",
                "description": "i need voucher for my tour",
                "amount": 50000,
                "createdAt": "2019-09-26T10:07:26.958Z",
                "updatedAt": "2019-09-26T10:07:26.958Z",
                "__v": 0
            }
        }
        ```

- /user/changePassword:
    - `Initial password is the uppercase lastName that must be changed on first login`
    ```json
    "data": {
        "password": "daniel"
        }
    ```
-
## For the CMS
- /user/register
    - sample Request
    ```json
        "data": {
            "firstName": "daniel",
            "lastName": "ernest",
            "email": "daniel@gmail.com",
            "phoneNumber": "0693247870",
            "gender": "male",
            "physicalAddress": "segerea"
        }
    ```
- 


## GETTING STARTED
- clone the repo
    - click [here](https://github.com/dae54/fund-request-api.git) to copy the link
- checkout develop branch, for development
    ```git 
        checkout develop
- run npm install
- create .env file for development environment following this format
```env
    PORT = 8080
    MONGO_DB_HOST_LOCAL = mongodb://localhost:27017/imprest
    MONGO_DB_HOST_REMOTE = mongodb+srv://daniel:dhbff7ybiinm@cluster0-1rhip.mongodb.net/test?retryWrites=true&w=majority
    JWT_SECRET = s3cr3t
```
