import store from '@/store'
import configs from '@/plugins/configs'
import codes from '@/plugins/codes'
import {
  getCloudSessionValidation
} from '@/plugins/healthCheck'
import {
  cloudLogout
} from '@/adLogin/authLogout'

const axios = require('axios')

const Utils = (() => {
  return {
    getCompanyList () {
      const config = {
        params: {}
      }
      return this.callAxios(
        codes.requests.getCompanyList.method,
        codes.requests.getCompanyList.url,
        config
      ).then(res => {
        if (res.status === 204) return null
        return res.data.companyList.map(row => {
          return row.code
        })
      })
    },
    getRealUrl (url) {
      return service.getRealUrl(url)
    },
    async callAxios (method, url, config = {}) {
      url = service.getRealUrl(url)
      store.commit('auth/refreshTime')
      config.headers = await service.getRequestHeader()
      return new Promise(function (resolve, reject) {
        if (method.toLowerCase() === 'get') {
          service
            .getWithAxios(url, config)
            .then(res => {
              return resolve(res)
            })
            .catch(error => {
              if (!url.endsWith('common/login')) {
                if (error.response.status === 401 || error.response.status === 403) {
                  service.checkTokenError(error.response.data.responseMessage)
                }
              }
              reject(error)
            })
        } else if (method.toLowerCase() === 'delete') {
          service
            .deleteWithAxios(url, config)
            .then(res => {
              return resolve(res)
            })
            .catch(error => {
              if (error.response.status === 401 || error.response.status === 403) {
                service.checkTokenError(error.response.data.responseMessage)
              }
              reject(error)
            })
        }
      })
    },
    async callAxiosWithBody (method, url, data, config = {}) {
      url = service.getRealUrl(url)
      store.commit('auth/refreshTime')
      config.headers = await service.getRequestHeader()
      return new Promise(function (resolve, reject) {
        if (method.toLowerCase() === 'post') {
          service
            .postWithAxios(url, data, config)
            .then(res => {
              return resolve(res)
            })
            .catch(error => {
              if (!url.endsWith('common/login')) {
                if (error.response.status === 401 || error.response.status === 403) {
                  service.checkTokenError(error.response.data.responseMessage)
                }
              }
              reject(error)
            })
        } else if (method.toLowerCase() === 'put') {
          service
            .putWithAxios(url, data, config)
            .then(res => {
              return resolve(res)
            })
            .catch(error => {
              if (error.response.status === 401 || error.response.status === 403) {
                service.checkTokenError(error.response.data.responseMessage)
              }
              reject(error)
            })
        } else if (method.toLowerCase() === 'patch') {
          service
            .patchWithAxios(url, data, config)
            .then(res => {
              return resolve(res)
            })
            .catch(error => {
              if (error.response.status === 401 || error.response.status === 403) {
                service.checkTokenError(error.response.data.responseMessage)
              }
              reject(error)
            })
        }
      })
    },
    getBlobFromUrl (url) {
      const vuex = JSON.parse(localStorage.getItem('vuex'))
      const headers = {
      }
      headers.Authorization = `Bearer ${vuex.auth.tokenAPI.accessToken}`
      return fetch(url, {
        method: 'GET',
        headers
      })
        .then(response => response.blob())
        .then(blob => blob)
    }
  }
})()

const service = {
  checkTokenError (message) {
    if (message.indexOf('TOKEN_EXPIRED') !== -1 || message.indexOf('TOKEN_NOT_FOUND_IN_REQUEST') !== -1 ||
      message.indexOf('TOKEN_IS_INVALID') !== -1 || message.indexOf('TOKEN_SIGNATURE_NOT_VALID') !== -1 ||
      message.indexOf('TOKEN_MALFORMED') !== -1 || message.indexOf('NO_CUSTOMERS_EXISTS_OR_ALL_CUSTOMERS_LICENSE_EXPIRED') !== -1 || message.indexOf('COMPANY_NOT_FOUND') !== -1) {
      store.dispatch('auth/logout').then(r => {
        store.dispatch('dataStore/CLEAN')
        cloudLogout()
      })
    }
  },
  getRealUrl (url) {
    if (url.startsWith('/api')) return url.replace('/api', configs.ApiUrl)
    return url
  },
  async getCallApi_Get (url, params) {
    return axios
      .get(url, {
        params: params
      }, await service.getRequestHeader())
      .then(response => {
        return Promise.resolve(response)
      })
      .catch(ex => {
        return Promise.reject(ex)
      })
  },
  getWithAxios (url, config) {
    return axios
      .get(url, config)
      .then(response => {
        return Promise.resolve(response)
      })
      .catch(error => {
        return Promise.reject(error)
      })
  },
  deleteWithAxios (url, config) {
    return axios
      .delete(url, config)
      .then(response => {
        return Promise.resolve(response)
      })
      .catch(ex => {
        return Promise.reject(ex)
      })
  },
  postWithAxios (url, data, config) {
    return axios
      .post(url, data, config)
      .then(response => {
        return Promise.resolve(response)
      })
      .catch(ex => {
        return Promise.reject(ex)
      })
  },
  putWithAxios (url, data, config) {
    return axios
      .put(url, data, config)
      .then(response => {
        return Promise.resolve(response)
      })
      .catch(ex => {
        return Promise.reject(ex)
      })
  },
  patchWithAxios (url, data, config) {
    return axios
      .patch(url, data, config)
      .then(response => {
        return Promise.resolve(response)
      })
      .catch(ex => {
        return Promise.reject(ex)
      })
  },
  checkSessionOut (error) {
    const sessionValidator = getCloudSessionValidation
    if (!sessionValidator(error)) {
      if (store.state.auth.tokenAPI) {
        cloudLogout()
      }
      store.dispatch('dataStore/CLEAN')
    }
  },
  async getRequestHeader () {
    // const vuex = await JSON.parse(localStorage.getItem('vuex'))
    const hearder = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json;charset=UTF-8'
    }
    const url = configs.ApiUrl
    hearder['solum-origin'] = 'DASHBOARD'
    if (url && url.toLowerCase().includes('https://')) {
      hearder['api-key'] = configs.ApiKey
    }
    hearder.Authorization = ''
    return hearder
  }
}

Utils.install = function (Vue) {
  Vue.prototype.$utils = Utils
}

export default Utils
