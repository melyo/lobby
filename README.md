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
    "type": 256,
    "name": "Lorem ipsum dolor sit amet"
}
```