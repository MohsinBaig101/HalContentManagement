module.exports = async (token) => {
  try {
    const [authType, auth] = token.trim().split(' ')
    return auth
  } catch (error) {
    throw new Error('UNAUTHORIZED')
  }
}
