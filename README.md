# Lobby

### Dependencies

- Node.js
- Express.js
- MySQL
- Vue.js
- Scss

### Set up

``` bash
# clone this repository
git clone https://github.com/melyo/lobby.git

# go to project root folder / directory
cd events-analytics

# install dependencies
npm install

# set up MySQL as database then create and configure .env file
cp .env.sample .env

# create lobbies and messages database tables from migrations/ folder

# build frontend for production with minification
npm run build

# run Express.js
npm start
```

### Required API Routes

| Method    | URI                           | Description               |
| ---       | ---                           | ---                       |
| GET       | /api/v1/lobbies               | get all lobbies           |
| POST      | /api/v1/lobbies               | create lobby              |
| PATCH     | /api/v1/lobbies/{id}/join     | join lobby                |
| PATCH     | /api/v1/lobbies/{id}/exit     | exit lobby                |
| DELETE    | /api/v1/lobbies/{id}          | delete lobby              |
| GET       | /api/v1/lobbies/{id}/messages | get messages from lobby   |
| POST      | /api/v1/lobbies/{id}/messages | send message within lobby |

### Request Body

POST /api/v1/lobbies

``` json
{
    "name": "Lobby001"
}
```

POST /api/v1/lobbies/{id}/messages

``` json
{
    "name": "Bot001",
    "type": "16",
    "name": "Lorem ipsum dolor sit amet"
}
```

### Standard Response

Success (200):

``` json
{
    "success": true,
    "message": "Sucess",
    "data": [], // data here
    "code": 200
}
```

Error (400,422,500):

``` json
{
    "success": true,
    "message": "Error",
    "error": [], // specific errors here
    "code": 422
}
```

### TDD Test Scripts Using Gherkin

```
Feature: Lobby System
    Test for Lobby System

    Scenario: Create a lobby named Lobby002
        Given I set header "Content-Type" with value "application/json"
        And I send a POST request to "/api/v1/lobbies" with body:
        """
        {
            "name": "Lobby001"
        }
        """
        Then the response code should be 200
        And response should contain json:
        """
        {
            "success": true,
            "message": "Lobby created successfully",
            "data": null,
            "code": 200
        }
        """

    Scenario: Create a lobby named Lobby002
        Given I set header "Content-Type" with value "application/json"
        And I send a POST request to "/api/v1/lobbies" with body:
        """
        {
            "name": "Lobby002"
        }
        """
        Then the response code should be 200
        And response should contain json:
        """
        {
            "success": true,
            "message": "Lobby created successfully",
            "data": null,
            "code": 200
        }
        """

    Scenario: Get all lobbies
        Given I set header "Content-Type" with value "application/json"
        When I send a GET request to "api/v1/lobbies"
        Then the response code should be 200
        And response should contain json:
        """
        {
            "success": true,
            "message": "Success",
            "data": [
                {
                    "id": 1,
                    "name": "Lobby01",
                    "users": 0,
                    "created_at": "2018-01-19 01:39:28"
                },
                {
                    "id": 2,
                    "name": "Lobby02",
                    "users": 0,
                    "created_at": "2018-01-19 01:39:28"
                }
            ],
            "code": 200
        }
        """

    Scenario: Join a lobby named Lobby002
        Given I set header "Content-Type" with value "application/json"
        And I send a PATCH request to "/api/v1/lobbies/2/join"
        Then the response code should be 200
        And response should contain json:
        """
        {
            "success": true,
            "message": "Joined lobby 2 successfully",
            "data": null,
            "code": 200
        }
        """

    Scenario: Exit a lobby named Lobby002
        Given I set header "Content-Type" with value "application/json"
        And I send a PATCH request to "/api/v1/lobbies/2/exit"
        Then the response code should be 200
        And response should contain json:
        """
        {
            "success": true,
            "message": "Exit lobby 2 successfully",
            "data": null,
            "code": 200
        }
        """

    Scenario: Delete a lobby named Lobby002
        Given I set header "Content-Type" with value "application/json"
        And I send a DELETE request to "/api/v1/lobbies/2"
        Then the response code should be 200
        And response should contain json:
        """
        {
            "success": true,
            "message": "Lobby deleted successful",
            "data": null,
            "code": 200
        }
        """

    Scenario: Join a lobby named Lobby001
        Given I set header "Content-Type" with value "application/json"
        And I send a PATCH request to "/api/v1/lobbies/1/join"
        Then the response code should be 200
        And response should contain json:
        """
        {
            "success": true,
            "message": "Joined lobby 1 successfully",
            "data": null,
            "code": 200
        }
        """

    Scenario: Create a message in Lobby001
        Given I set header "Content-Type" with value "application/json"
        And I send a POST request to "/api/v1/lobbies/1/messages" with body:
        """
        {
            "name": "Bot001",
            "type": "16",
            "message": "Hello World!"
        }
        """
        Then the response code should be 200
        And response should contain json:
        """
        {
            "success": true,
            "message": "Message sent successfully",
            "data": null,
            "code": 200
        }
        """

    Scenario: Get all lobbies
        Given I set header "Content-Type" with value "application/json"
        When I send a GET request to "/api/v1/lobbies/1/messages"
        Then the response code should be 200
        And response should contain json:
        """
        {
            "success": true,
            "message": "Success",
            "data": [
                {
                    "id": 1,
                    "name": "Bot001",
                    "type": "16",
                    "message": "Hello World!",
                    "created_at": "2018-01-19 01:39:28"
                }
            ],
            "code": 200
        }
        """
```
