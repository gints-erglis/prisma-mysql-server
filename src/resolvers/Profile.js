function user(parent, args, context) {
  return context.prisma.profile({ id: parent.id }).user()
}

module.exports = {
  user,
}