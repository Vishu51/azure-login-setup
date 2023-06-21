<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
import store from '@/store'
import { apiConfig } from './adLogin/apiConfig'
import { msalConfig } from './adLogin/authConfig'
const handleResponse = (response) => {
  if (response !== null) {
  }
}
export default {
  data: () => ({
    drawer: null,
    checkingInterval: null
  }),
  created () {

  },
  updated () {
    setTimeout(() => {
      const classExists = document.getElementsByClassName(
        'v-dialog__content--active'
      ).length > 0
      const boxes = document.querySelector('.v-overlay--active')
      if (classExists === false) {
        if (boxes !== null) {
          boxes.style.visibility = 'hidden'
        }
      }
    }, 2000)
  },
  async mounted () {
    this.checkingInterval = setInterval(async function () {
      if (store.state && store.state.auth && store.state.auth.tokenAPI && store.state.auth.tokenAPI.idTokenClaims) {
        const idTokenClaims = store.state.auth.tokenAPI.idTokenClaims
        if (idTokenClaims) {
          const forceRefresh = (new Date(idTokenClaims.exp * 1000 - (10 * 60000)) < new Date(Date.now()))
          if (forceRefresh) {
            const currentAccounts = await this.$msal.getAllAccounts()
            // this.aquireTokenSilent(currentAccounts[0].localAccountId, true).then(async res => {
            //   res.homeAccountId = currentAccounts[0].homeAccountId
            //   store.commit('auth/UPDATE_TOKEN', res)
            // })
            const res = await this.aquireTokenSilent(currentAccounts && currentAccounts.length > 0 && currentAccounts[0].localAccountId, true)
            res.homeAccountId = currentAccounts && currentAccounts.length > 0 && currentAccounts[0].homeAccountId
            store.commit('auth/UPDATE_TOKEN', res)
          }
        }
      }
    }.bind(this), 60000)

    const currentAccounts = await this.$msal.getAllAccounts()
    if (currentAccounts && currentAccounts.length > 0) {
      this.redirectUser()
    }
  },
  destroyed () {
    clearInterval(this.checkingInterval)
  },
  methods: {
    redirectUser () {
      this.$msal
        .handleRedirectPromise()
        .then(handleResponse)
        .then(() => this.getAccounts())
        .catch((e) => console.log(e))
    },
    aquireToken (account, forceRefresh = false) {
      return this.$msal.acquireTokenSilent({
        account: account,
        scopes: [
          'openid',
          'offline_access',
          msalConfig.auth.clientId
        ]
      }).then((res) => { return res })
        .catch(e => {
          console.warn('silent token acquisition fails. acquiring token using interactive method', e)
          if (e) {
            return this.$msal.acquireTokenRedirect({
              account: account,
              scopes: [
                'openid',
                'offline_access',
                msalConfig.auth.clientId
              ]
            })
              .catch(error => {
                console.error(error)
              })
          } else {
            console.warn(e)
          }
        })
    },
    async getAccounts () {
      const currentAccounts = await this.$msal.getAllAccounts()
      const localAccountId = currentAccounts && currentAccounts.length > 0 && currentAccounts[0].localAccountId
      if (currentAccounts === null || currentAccounts === undefined) {
        console.error('no accounts detected')
      } else if (currentAccounts.length > 1) {
        console.warn('Multiple accounts detected.')
        // Add choose account code here
        // this.aquireToken(localAccountId).then(res => {
        //   res.homeAccountId = currentAccounts && currentAccounts.length > 0 && currentAccounts[0].homeAccountId
        //   store.commit('auth/UPDATE_TOKEN', res)
        // })
        const res = await this.aquireToken(localAccountId)
        res.homeAccountId = currentAccounts && currentAccounts.length > 0 && currentAccounts[0].homeAccountId
        store.commit('auth/UPDATE_TOKEN', res)
      } else if (currentAccounts.length === 1) {
        const res = await this.aquireToken(localAccountId)
        res.homeAccountId = currentAccounts && currentAccounts.length > 0 && currentAccounts[0].homeAccountId
        store.commit('auth/UPDATE_TOKEN', res)
      } else {
        this.$msal.acquireTokenRedirect({
          account: '',
          scopes: [
            'openid',
            'offline_access',
            msalConfig.auth.clientId
          ]
        })
          .catch(error => {
            console.error(error)
          })
      }
    },
    aquireTokenSilent (account, forceRefresh = false) {
      const accessTokenRequest = {
        account: account,
        scopes: apiConfig.b2cScopes,
        forceRefresh: forceRefresh
      }
      return this.$msal.acquireTokenSilent(accessTokenRequest).then((res) => { return res })
        .catch(error => {
          console.warn('silent token acquisition fails. acquiring token using interactive method', error)
          if (error.errorMessage && error.errorMessage.indexOf('interaction_required') !== -1) {
            // call acquireTokenRedirect in case of InteractionRequiredAuthError failure
            this.$msal.acquireTokenRedirect(accessTokenRequest)
          }
        })
    }
  }
}
</script>
<style>
@font-face {
  font-family: "Manrope-VariableFont";
  src: url("./assets/fonts/Manrope-VariableFont_wght.ttf");
}
.theme--light.v-tabs > .v-tabs-bar .v-tab:not(.v-tab--active) {
  background: #e2e2e2 !important;
}
.v-tabs-slider-wrapper {
  height: 0px !important;
}
.v-tab {
  letter-spacing: 0 !important;
}
.v-tab--active {
  font-weight: bolder !important;
}
</style>
