const jwt = require('jsonwebtoken')
const APP_SECRET = 'GraphQL-is-aw3some'

// If using a JWT
function getUserIdByToken(context) {
  const Authorization = context.request.get('Authorization')
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const { userId } = jwt.verify(token, APP_SECRET)
    return userId
  }
  return null
}

function getUserId(context) {
  if (context.request.session.userId) {
    return context.request.session.userId;
  }
  return null
}

module.exports = {
  APP_SECRET,
  getUserId,
  getUserIdByToken,
}