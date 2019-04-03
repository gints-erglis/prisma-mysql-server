const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')


async function signup(parent, args, context, info) {

  const password = await bcrypt.hash(args.password, 10)

  const user = await context.prisma.createUser({
    ...args,
    password,
    profile: {
      create: {
        firstName: " ",
        lastName: " "
      }
    }
  })

  // In case you use a session cookie
  context.request.session.userId = user.id;

  return {
    // In case you use a token
    token: jwt.sign({ userId: user.id }, APP_SECRET),
    user,
  }
}

async function newProfile(parent, args, context, info) {

  const profile = await context.prisma.createProfile({ ...args })

  return {
    profile
  }
}

async function editProfile(parent, args, context, info) {

  const profile = await context.prisma.updateProfile({ ...args })

  return {
    profile
  }
}

async function login(parent, args, context, info) {

  const user = await context.prisma.user({ email: args.email })
  if (!user) {
    throw new Error('No such user found')
  }

  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) {
    throw new Error('Invalid password')
  }
  // In case you use a session cookie
  context.request.session.userId = user.id;

  //context.response.cookie('id', user.id, { signed: true, httpOnly: true });

  return {
    // In case you use a token
    token: jwt.sign({ userId: user.id }, APP_SECRET),
    user,
  }
}

module.exports = {
  signup,
  login,
  newProfile,
  editProfile
}