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

  context.request.session.userId = user.id;

  return {
    user,
  }
}
async function newProfile(parent, args, context, info) {

  const profile = await context.prisma.createProfile({ ...args })

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

  context.request.session.userId = user.id;

  return {
    user,
  }
}

module.exports = {
  signup,
  login,
  newProfile,
}