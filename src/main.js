import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import vuetify from '@/plugins/vuetify'
import { msalConfig, tokenRequest } from './adLogin/authConfig'
import msalPlugin from 'vue-msal-browser'
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import MomentTimezone from 'moment-timezone'
import '@mdi/font/css/materialdesignicons.css'
import * as ChartModuleMore from 'highcharts/highcharts-more'
import Highcharts from 'highcharts'
import accessibility from 'highcharts/modules/accessibility'
import config from './plugins/configs'
import axios from 'axios'

const moment = require('moment')
moment.suppressDeprecationWarnings = true
require('@/assets/css/layout.css')
require('vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css')

Vue.config.productionTip = false
Vue.use(PerfectScrollbar)
Vue.use(MomentTimezone)
ChartModuleMore(Highcharts)
Vue.use(Highcharts)
accessibility(Highcharts)
Vue.filter('currency', function (value) {
  if (!value) return 0
  return Number(value)
    .toFixed(0)
    .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')
})
axios.defaults.headers.get['Content-Type'] = 'application/json; charset=utf-8'
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8'
Vue.prototype.$axios = axios

const msalConfigObj = {
  auth: {
    clientId: msalConfig.auth.clientId,
    authority: msalConfig.auth.authority,
    redirectUri: msalConfig.auth.redirectUri,
    postLogoutRedirectUrl: 'http://localhost:8080/logout',
    validateAuthority: false,
    knownAuthorities: [msalConfig.auth.authority],
    scopes: tokenRequest.scopes,
    mode: 'redirect'
  },
  cache: {
    cacheLocation: 'localStorage', // This configures where your cache will be stored
    storeAuthStateInCookie: false // Set this to "true" to save cache in cookies to address trusted zones limitations in IE (see: https://github.com/AzureAD/microsoft-authentication-library-for-js/wiki/Known-issues-on-IE-and-Edge-Browser)
  }
}
Vue.use(msalPlugin, msalConfigObj)

export default new Vue({
  router,
  vuetify,
  i18n,
  store,
  render: (h) => h(App),
  beforeMount () {
    console.log('', config)
  }
}).$mount('#app')
