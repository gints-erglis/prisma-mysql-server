function profile(parent, args, context) {
  return context.prisma.user({ id: parent.id }).profile()
}

module.exports = {
  profile,
}