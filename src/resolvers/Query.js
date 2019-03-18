const { getUserId } = require('../utils')


async function logedin(parent, args, context, info) {

  const userId = getUserId(context)

  if (userId) {
    return {ok: true}
  }

  return {ok: false}

}

async function logout(parent, args, context, info) {

  delete context.request.session.userId;

  return {ok: true}

}

module.exports = {
  logedin,
  logout,
}