const { getUserId, getUserIdByToken } = require('../utils')


async function logedin(parent, args, context, info) {

  const userId = getUserId(context)

  if (userId) {
    return {
      ok: true,
      id: userId
    }
  }
  return {ok: false}
}

// If using a JWT
async function logedinToken(parent, args, context, info) {

  const userId = getUserIdByToken(context)

  if (userId) {
    return {ok: true}
  }
  return {ok: false}
}

async function logout(parent, args, context, info) {

  context.request.session.destroy();
  // forse creating a new session ID
  delete context.request.session;
  // delete a browser cookie
  context.response.clearCookie('id', {path: '/' });

  return {ok: true}

}

async function getUser(parent, args, context, info) {
  const user = await context.prisma.user({ id: args.id })
  return user
}

module.exports = {
  logedin,
  logedinToken,
  logout,
  getUser,
}