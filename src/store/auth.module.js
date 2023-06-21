import AuthService from '@/auth/auth.service'
import commons from '@/plugins/commons'

const ttl = 30 * (1000 * 60)

export const auth = {
  namespaced: true,
  state: null,
  expiry: null,
  tokenAPI: null,
  user: {
    account: '',
    accountGroup: '',
    accountInfo: {},
    aliveInterval: '',
    company: '',
    companyList: [],
    domain: '',
    firstName: '',
    loginMode: '',
    managedStores: [],
    portalRevision: '',
    responseCode: '',
    responseMessage: '',
    releaseVersion: '',
    coreRevision: '',
    tokenEmail: '',
    sessionId: '',
    sessionTimeout: 0,
    pwMinimumLength: 0,
    isSolumAdmin: false,
    pwPolicyEnable: false,
    lbsEnable: false,
    otaEnable: false,
    templateGroupEnable: false
  },
  getters: {
    IS_LOGINED: auth => {
      const now = new Date()
      let isLogined = true
      if (auth.expiry == null) {
        // 로그인 시간이 없을 경우
        isLogined = false
      } else if (now.getTime() > auth.expiry) {
        // 로그인 시간이 만료 되었을경우
        isLogined = false
      }
      return isLogined
    },
    refreshTime () {
      // 현재 로그인 상태인지 확인 (true/false)
      return true
    },
    GET_USER (state) {
      if (state.user && commons.isValidStr(state.user.account)) {
        return state.user
      }
    },
    GET_ACCOUNT (state) {
      if (commons.isValidStr(state.user.account)) return state.user.account
    },
    GET_INTERVAL: state => state.user && state.user.aliveInterval,
    GET_USER_LEVEL: state => state.user.accountInfo.accessLevel,
    GET_ACC_MENU: state => state.user && state.user.accountInfo.accessMenu,
    GET_ACC_BTN: state => state.user && state.user.accountInfo.accessAction
  },
  mutations: {
    UPDATE_INTERVAL: (state, value) => {
      state.user.aliveInterval = value
    },
    UPDATE_TOKEN: (state, value) => {
      state.tokenAPI = value
    },
    refreshTime (state) {
      const now = new Date()
      if (!commons.isNull(state.user)) {
        state.expiry = now.getTime() + state.user.sessionTimeout * 1000
      } else {
        state.expiry = now.getTime() + ttl
      }
    },
    loginSuccess (state, user) {
      const now = new Date()
      user.companyList = user.company.slice()
      user.company = user.company[0]
      if (!commons.isNull(user) && user !== '') state.user = user
      state.user.tokenEmail = user.accountEmail
      if (
        !commons.isNull(state.user) ||
        commons.isValidStr(state.user.sessionTimeout)
      ) {
        state.loginState = true
        state.expiry = now.getTime() + state.user.sessionTimeout * 1000
      } else {
        state.expiry = now.getTime() + ttl
      }
    },
    loginFailure (state) {
      state.status = {}
      state.user = {}
    },
    logout (state) {
      state.loginState = false
      state.loginMode = null
      state.expiry = null
      state.tokenAPI = null
      state.user = {}
    },
    setCompany (state, company) {
      state.user.company = company
    },
    setAccessMenu (state, accessMenu) {
      state.user.accountInfo.accessMenu = [...accessMenu]
    },
    setAccessAction (state, accessAction) {
      state.user.accountInfo.accessAction = [...accessAction]
    }
  },
  actions: {
    login ({ commit }, user) {
      console.debug(`Login Mode : ${user.loginMode}`)
      return AuthService.loginAPI(user)
        .then(userData => {
          commit('loginSuccess', userData)
          return userData
        })
        .catch(error => {
          throw error.response.data
        })
    },
    logout ({ commit }) {
      AuthService.logout()
      commit('logout')
    },
    isAccessMenu (context, code) {
      const flag = context.state.user.accountInfo.accessMenu.includes(code)
      return Promise.resolve(flag)
    },
    getDisabledBtn (context, code) {
      const flag = !context.rootState.auth.user.accountInfo.accessAction.includes(
        code
      )
      return Promise.resolve(flag)
    },
    UPDATE_INTERVAL ({ commit }, payload) {
      commit('UPDATE_INTERVAL', payload)
    },
    UPDATE_TOKEN ({ commit }, payload) {
      commit('UPDATE_TOKEN', payload)
    },
    refreshTime ({ commit }, auth) {
      commit('refreshTime', auth)
    },
    updateAccessMenu (context, accessMenu) {
      context.commit('setAccessMenu', accessMenu)
    },
    updateAccessAction (context, accessAction) {
      context.commit('setAccessAction', accessAction)
    }
  }
}
