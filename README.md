# prisma-mysql-server
Example server for learning purpose.

## Set up

### Docker
To run Prisma and MySQL server use a Docker

```
docker-compose up -d

```
To stop the containers run
```
docker-compose stop
```
To start the containers run
```
docker-compose start
```
### Node
Install dependencies
```
yarn install
```
or
```
npm install
```
Start a server
```
node src/index.js
```
### Prisma
More about deploy and generate Prisma [there](https://www.howtographql.com/graphql-js/4-adding-a-database/)

```
prisma deploy
```