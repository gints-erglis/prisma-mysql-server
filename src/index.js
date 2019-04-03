const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Profile = require('./resolvers/Profile')

const resolvers = {
  Query,
  Mutation,
  User,
  Profile,
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => {
    return {
      ...request,
      prisma,
    }
  },
})

const SESSION_SECRET = "lsdfjlkjlkewaqra";

server.express.use(session({
    key: "id",
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7
    }
  })
);

server.use(cookieParser(SESSION_SECRET));


const cors = {
  credentials: true,
  origin: "http://localhost:3000"
};

//server.start(() => console.log(`Server is running on http://localhost:4000`))
server.start({ cors }, () =>
console.log(`Server is running on http://localhost:4000`)
);