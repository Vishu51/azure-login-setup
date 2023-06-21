import commons from '@/plugins/commons.js'
const defaultState = {
  collapse: false,
  selectedStore: {},
  rowPerPageList: ['5', '10', '20', '50', '100'],
  timeZoneList: [],
  menuList: [
    // {
    //   active: false,
    //   icon: 'mdi-view-dashboard',
    //   url: '/',
    //   items: [
    //     { title: 'Overview', url: '/' }
    //   ],
    //   title: 'Dashboard'
    // },
  ]
}
const state = commons.copy(defaultState)
export const dataStore = {
  getters: {
    GET_COLLAPSE: (state) => state.collapse,
    GET_STORE: (state) => state.selectedStore,
    GET_MENU_LIST: (state) => state.menuList,
    GET_ROWLIST: state => state.rowPerPageList,
    GET_TIMEZONE_LIST: state => state.timeZoneList
  },
  mutations: {
    UPDATE_COLLAPSE: (state, code) => {
      state.collapse = code
    },
    UPDATE_STORE: (state, code) => {
      state.selectedStore = code
    },
    UPDATE_MENU_LIST: (state, code) => {
      if (code.index !== undefined && state.menuList[code.index] !== undefined) {
        state.menuList[code.index].active = code.state
      }
    },
    CLEAN: (state, payload) => {
      defaultState.currentLanguage = state.currentLanguage
      state = Object.assign(state, commons.copy(defaultState))
    },
    ALL_MENU_LIST: (state, payload) => {
      state.menuList = payload
    },
    UPDATE_TIMEZONE_LIST: (state, payload) => {
      state.timeZoneList = payload
    }
  },
  actions: {
    UPDATE_COLLAPSE: ({ commit }, payload) => {
      commit('UPDATE_COLLAPSE', payload)
    },
    UPDATE_STORE: ({ commit }, payload) => {
      commit('UPDATE_STORE', payload)
    },
    UPDATE_MENU_LIST: ({ commit }, payload) => {
      commit('UPDATE_MENU_LIST', payload)
    },
    CLEAN: ({ commit }, payload) => {
      commit('CLEAN', payload)
    },
    ALL_MENU_LIST: ({ commit }, payload) => {
      commit('ALL_MENU_LIST', payload)
    },
    UPDATE_TIMEZONE_LIST: ({ commit }, payload) => {
      commit('UPDATE_TIMEZONE_LIST', payload)
    }
  },
  namespaced: true,
  state: state
}
