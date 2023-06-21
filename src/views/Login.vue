<template>
  <div class="home col-12 page-background">
     <div v-show="redirectUserLoading">
        <v-dialog
        v-model="redirectUserLoading"
        width="400"
        persistent
        style="z-index: 50000"
        id="redirectPopup"
      >

        <v-card class="popup add_store_popup" align="center" justify="center"  style="text-align:center">
          <v-row style="justify-content:center">
            <v-col style="height:95px;">
              <p v-text="'Loading...'"></p>
              <p v-text="'Please wait we are fetching details'"></p>
              <p>&nbsp;</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-progress-linear value="15" indeterminate></v-progress-linear>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>
    </div>
    <div>
        <v-dialog v-model="messageDialog" width="300" persistent>
          <v-card class="popup add_store_popup" align="center" justify="center">
            <v-row align="center">
              <v-col>
                <span v-text="messageText"></span>
              </v-col>
            </v-row>
            <v-card-actions class="d-flex justify-center">
              <v-btn text icon @click="logOutUser" class="btn">{{
                $t("OK")
              }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
  </div>
</template>

<script>
// Cloud
import User from '@/models/user'
import { cloudLogout } from '@/adLogin/authPopup'
// Utils
import EventBus from '@/plugins/eventBus'
import commons from '@/plugins/commons'
// import codes from '@/plugins/codes'
import { msalConfig } from '../adLogin/authConfig'
import store from '@/store'
import configs from '@/plugins/configs.js'
const handleResponse = (response) => {
  if (response !== null) {
  }
}
export default {
  name: 'Login',
  data () {
    return {
      companyCode: null,
      cloudMode: false,
      productionType: process.env.VUE_APP_PRODUCTION_TYPE,
      dialog: false,
      messageDialog: false,
      messageText: '',
      loginMode: { code: 'local', name: 'Local Mode Login' },
      domainInputShow: false,
      user: new User('', ''),
      licenseExpired: false,
      passwordExpired: false,
      passwordExpiredAccount: '',
      staySignedIn: false,
      account: null,
      accountList: [],
      redirectUserLoading: true,
      customPolicyLoaded: false,
      userRediectAfterLogin: true,
      skipDisplay: true,
      setInt: null
    }
  },
  watch: {
    loginMode (val) {
      if (this.loginMode.code === 'domain') {
        this.domainInputShow = true
      } else {
        this.domainInputShow = false
      }
    }
  },
  async created () {
    commons.clearVuex()
  },
  // computed: {
  //   getLoginInfo () {
  //     return this.$store.state.auth.loginState
  //   }
  // },
  async mounted () {
    var urlParam = this.$route.params.user
    const currentAccounts = await this.$msal.getAllAccounts()
    if (currentAccounts && currentAccounts.length > 0) {
      this.redirectUser()
    } else {
      if (urlParam) {
        setTimeout(() => {
          this.$axios.get(configs.ApiUrl + '/common/custom/policies').then((res) => {
            // this.customPolicyLoaded = false
            if (res && res.data && res.data.policyNameList) {
              azureConfig.VUE_APP_AD_CUST_POLICIES = res.data.policyNameList
              if (urlParam) {
                this.companyCode = urlParam
                this.continueCust()
              }
            }
          }).catch((ex) => {
            // this.customPolicyLoaded = false
            console.log('ERROR!! ', ex)
          })
        }, 1000)
      } else {
        const path = window.location.pathname
        const getUser = path.split('/')
        if (
          getUser[getUser.length - 1] === 'login'
        // || getUser[getUser.length - 1] === 'logout'
        ) {
        // localStorage.removeItem('policyName')
        }
        // else {
        //   this.redirectUser()
        // }
        this.continueCust()
      }
    }
    // if (window.location.href.indexOf('#state=') > -1) {
    //   // if (urlParam) {
    //   //   this.redirectUserLoading = true
    //   // }
    //   // this.redirectUser()
    // }
  },
  methods: {
    continueCust () {
      // const companyCode = this.companyCode && this.companyCode.toLowerCase()
      // const custPolicy = azureConfig.VUE_APP_AD_CUST_POLICIES.filter(
      //   (x) => {
      //     const custCode = x.customerCode.toLowerCase()
      //     return custCode === companyCode
      //   }
      // )
      // if (custPolicy && custPolicy.length > 0) {
      //   this.$msal.config.auth.authority =
      //     azureConfig.VUE_APP_AD_POLICY_AUTHORITY +
      //     '/' +
      //     custPolicy[0].policyName
      //   this.$msal.config.auth.knownAuthorities = [
      //     this.$msal.config.auth.authority
      //   ]
      //   localStorage.setItem('policyName', custPolicy[0].policyName)
      // } else {
      this.$msal.config.auth.authority =
          azureConfig.VUE_APP_AD_POLICY_AUTHORITY + '/' + 'B2C_1_signupsignin1'
      this.$msal.config.auth.knownAuthorities = [
        this.$msal.config.auth.authority
      ]
      localStorage.removeItem('policyName')
      // }
      // localStorage.removeItem('redirecting', true)
      this.redirectUser()
    },
    redirectUser () {
      this.$msal
        .handleRedirectPromise()
        .then(handleResponse)
        .then(() => this.getAccounts()

        )
        .catch((e) => {
          console.log(e.errorCode, JSON.stringify(e))
          if (e.errorCode === 'access_denied' && JSON.stringify(e).indexOf('AADB2C90091') > -1) {
            this.$msal.loginRedirect()
          }
        }
        )
    },
    aquireToken (account, forceRefresh = false) {
      return this.$msal
        .acquireTokenSilent({
          account: account,
          scopes: ['openid', 'offline_access', msalConfig.auth.clientId]
        })
        .then((res) => {
          return res
        })
        .catch((e) => {
          console.warn(
            'silent token acquisition fails. acquiring token using interactive method',
            e
          )
          if (e) {
            return this.$msal
              .acquireTokenRedirect({
                account: account,
                scopes: ['openid', 'offline_access', msalConfig.auth.clientId]
              })
              .catch((error) => {
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
      if (currentAccounts === null) {
        console.error('no accounts detected')
      } else if (currentAccounts.length > 1) {
        console.warn('Multiple accounts detected.')
        const res = await this.aquireToken(localAccountId)
        res.homeAccountId = currentAccounts && currentAccounts.length > 0 && currentAccounts[0].homeAccountId
        store.commit('auth/UPDATE_TOKEN', res)
      } else if (currentAccounts.length === 1) {
        const res = await this.aquireToken(localAccountId)
        res.homeAccountId = currentAccounts && currentAccounts.length > 0 && currentAccounts[0].homeAccountId
        store.commit('auth/UPDATE_TOKEN', res)
        this.$router.push('/')
      } else {
        this.$msal
          .acquireTokenRedirect({
            account: '',
            scopes: ['openid', 'offline_access', msalConfig.auth.clientId]
          })
          .catch((error) => {
            console.error(error)
          })
      }
    },
    logOutUser () {
      this.messageDialog = false
      store.dispatch('auth/logout').then(r => {
        store.dispatch('dataStore/CLEAN')
        cloudLogout()
      })
    },
    messageAlert (text) {
      this.messageText = text
      this.messageDialog = true
    },
    onLogin () {
      if (commons.isNull(this.user.account)) {
        this.$refs.account.$el.getElementsByTagName('input')[0].focus()
        return
      }
      if (commons.isNull(this.user.password)) {
        this.$refs.password.$el.getElementsByTagName('input')[0].focus()
        return
      }
      this.user.loginMode = this.loginMode.code
      this.$store
        .dispatch('auth/login', this.user)
        .then((res) => {
          this.redirectUserLoading = false
          // Storing Refresh token in Vuex
          var keys = Object.keys(localStorage)
          for (var i = 0; i < keys.length; i++) {
            var key = keys[i]
            if (localStorage[key].includes('RefreshToken')) {
              this.$store.dispatch('dataStore/UPDATE_REFRESH_TOKEN', JSON.parse(localStorage[key]).secret)
            }
          }
          console.log('Login res => ', res)
          localStorage.setItem('isUserLogout', 'NO')
          this.$store.dispatch(
            'dataStore/updateStaySignedIn',
            this.staySignedIn
          )
          this.$store.dispatch('dataStore/INIT_SELECTED_STORE', this.$store)

          this.$router.push('/')
        })
        .catch((error) => {
          this.redirectUserLoading = false
          this.loading = false
          this.messageText = error.responseMessage || 'Failed to login'
          switch (error.responseMessage) {
            case 'LICENSE_EXPIRED':
              this.messageText = 'License Expired'
              break
            case 'Account not approved':
              this.messageText = 'Your account not approved. Please contact administrator to get approved.'
              break
            case 'COMPANY_NOT_FOUND':
              this.messageText = 'Invalid customer'
              break
            default:
              this.messageText = error.responseMessage || 'Failed to login'
              break
          }
          this.messageDialog = true
        })
    },
    hideActivateLicenseBtn () {
      this.licenseExpired = false
    },
    hideChangePasswordBtn () {
      this.passwordExpired = false
    },
    showLoginLicenseActivation () {
      EventBus.$emit('showLoginLicenseActivation')
    },
    showLoginPasswordChange () {
      EventBus.$emit('showLoginPasswordChange')
    }
  },
  beforeDestroy () {
    clearInterval(this.setInt)
  }
}
</script>
<style scoped>
.copyright {
  color: #43425d;
  font-size: 10px;
}
.company-code > .v-divider--vertical {
  border-width: 0px thin 0px 1px !important;
}
::v-deep .company-code > .v-btn.type-search .v-btn__content {
  box-shadow: 0px 3px 3px #00000029;
  border: 0.30000001192092896px solid #001e38;
  border-radius: 8px;
  font-weight: bold !important;
  font-size: 15px !important;
  background: #001e38 !important;
}
.company-code {
  width: 100%;
  color: white;
}
.page-background {
  background-image: url("~@/assets/img/AimsSaaS_bg_lg.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.page-logo-class {
  display: block;
  margin-left: auto;
  margin-right: auto;
  height: 40px;
}
.panel-default {
  padding: 40px 30px;
  margin-top: auto;
  margin-bottom: auto;
  /* height: 100%; */
  min-height: 550px;
  max-width: 90%;
  background-color: #fff;
}
.panel-default .panel-body {
  max-width: 380px;
  width: auto;
  margin: 0 auto;
  padding: 0;
}
.panel-default #api {
  display: table;
  margin: 0;
  width: 100%;
}
.col-lg-6 {
  max-width: 470px;
  width: 100%;
  float: none;
  display: inline-block;
  vertical-align: top;
  padding: 0;
}
::v-deep .v-text-field .v-input__prepend-inner,
.v-text-field .v-input__append-inner {
  margin-top: 8px !important;
  font-weight: bold;
  padding-right: 5px !important;
  margin-right: 10px !important;
}
.companyLogo {
 max-width:60%
}
</style>
