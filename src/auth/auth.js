let AuthToken = null

export default {
  isLoggedIn () {
    return AuthToken
  },
  login () {
    AuthToken = 1
    return true
  },
  logout () {
    AuthToken = null
    return true
  }
}
