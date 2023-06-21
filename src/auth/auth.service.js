import utils from '@/plugins/utils'

class AuthService {
  loginAPI (user) {
    return utils
      .callAxiosWithBody(
        'post',
        utils.getRealUrl('/api/common/login'),
        {
          account: user.account,
          password: user.password,
          loginMode: user.loginMode,
          domain: user.domain
        },
        {}
      )
      .then(response => {
        localStorage.setItem('user', JSON.stringify(response.data))
        return response.data
      })
  }

  logout () {
    localStorage.removeItem('labelSelectedHeaders')
    localStorage.removeItem('user')
  }

  register (user) {
    return utils.callAxiosWithBody(
      'post',
      utils.getRealUrl('/api/common/signup'),
      {
        id: user.id,
        email: user.email,
        password: user.password
      },
      {}
    )
  }

  handleResponse (response) {
    if (response.status === 401) {
      this.logout()
      location.reload(true)
      const error = response.data && response.data.message
      return Promise.reject(error)
    }
    return Promise.resolve(response)
  }
}

export default new AuthService()
