import * as Msal from 'msal'
import { msalConfig, loginRequest, tokenRequest } from './authConfig'
import { b2cPolicies } from './policies'
import { logMessage } from './ui'
// import { callApiWithAccessToken } from './api'
// import { apiConfig } from './apiConfig'
import store from '@/store'
import { msalInstance } from 'vue-msal-browser'
// import { UserAgentApplication } from 'msal'
// import { config } from '../views/config/auth'
// const auth = new UserAgentApplication(config)
// Create the main myMSALObj instance
// configuration parameters are located at authConfig.js
const myMSALObj = new Msal.UserAgentApplication(msalConfig)

// What happens after login succeed.
// 1. Get a token and Pass it the API server
// 2. Dispatch user information and the token to the vuex
// 3. Redirect the user to /
export async function signIn (user) {
  return new Promise(function (resolve, reject) {
    console.debug('=== processing Msal ===')
    console.debug(msalConfig.auth.redirectUri)
    myMSALObj
      .loginPopup(loginRequest)
      .then(async loginResponse => {
        console.debug('id_token acquired at: ' + new Date().toString())
        console.debug('myMSALObj.getAccount() :', myMSALObj.getAccount())
        // if (myMSALObj.getAccount()) {
        //   updateUI()
        // }
        const account = myMSALObj.getAccount().accountIdentifier
        await passTokenToApi()
        resolve(account)
      })
      .catch(error => {
        console.log(
          `An error occured during MSAL login process. error: ${error}`
        )
        if (error.errorMessage) {
          // Check for forgot password error
          // Learn more about AAD error codes at https://docs.microsoft.com/en-us/azure/active-directory/develop/reference-aadsts-error-codes
          if (
            error.errorMessage.indexOf('AADB2C: An exception has occurred.') >
            -1
          ) {
            myMSALObj
              .loginPopup(b2cPolicies.authorities.forgotPassword)
              .then(loginResponse => {
                console.log(loginResponse)
                redirectLogout()
                window.alert(
                  'Password has been reset successfully. \nPlease sign-in with your new password.'
                )
              })
          }
        }
      })
  })
}

// Sign-out the user
export async function cloudLogout (uniqueId) {
  localStorage.setItem('isUserLogout', 'YES')
  const account = await msalInstance.getAccountByHomeId(store.state.auth.tokenAPI && store.state.auth.tokenAPI.homeAccountId)
  const logoutRequest = {
    account: account
  }
  await msalInstance.logoutRedirect(logoutRequest)
  // myMSALObj.logout(uniqueId)
  // myMSALObj.logout(uniqueId)
  // redirectLogout(uniqueId)
  // clearInterval(this.$intervalID) // Will clear the timer.
  // auth.logout()
}

// redirect Ms Logout page
function redirectLogout (uniqueId) {
  // this.$store.state.auth.tokenAPI.uniqueId
  let logoutUrl = 'https://login.microsoftonline.com/' + uniqueId
  logoutUrl +=
    '/oauth2/logout?post_logout_redirect_uri=' + window.location.href + 'login'
  window.location.href = logoutUrl
}

function getTokenPopup (request) {
  return myMSALObj.acquireTokenSilent(request).catch(error => {
    console.log('Silent token acquisition fails. Acquiring token using popup')
    console.log(error)
    // fallback to interaction when silent call fails
    return myMSALObj
      .acquireTokenPopup(request)
      .then(tokenResponse => {
        console.log('access_token acquired at: ' + new Date().toString())
        return tokenResponse
      })
      .catch(error => {
        console.log(error)
      })
  })
}

// Acquires and access token and then passes it to the API call
export function passTokenToApi () {
  return getTokenPopup(tokenRequest).then(tokenResponse => {
    console.debug('access_token acquired at: ' + new Date().toString())
    try {
      logMessage('Request made to Web API:')
      store.commit('auth/UPDATE_TOKEN', tokenResponse)
      console.debug('tokenResponse :', tokenResponse)
      return tokenResponse
      // callApiWithAccessToken2(apiConfig.webApi, tokenResponse.accessToken)
    } catch (err) {
      console.debug(err)
    }
  })
}

// helper function to access the resource with the token
export function callApiWithAccessToken2 (endpoint, token) {
  const headers = new Headers()
  const bearer = `Bearer ${token}`

  headers.append('Authorization', bearer)

  const options = {
    method: 'GET',
    headers: headers
  }

  fetch(endpoint, options)
    .then(response => response.json())
    .then(response => {
      logMessage('Web API returned:\n' + JSON.stringify(response))
    })
    .catch(error => {
      logMessage('Error calling the Web api:\n' + error)
    })
}

export function editProfile () {
  myMSALObj
    .loginPopup(b2cPolicies.authorities.editProfile)
    .then(tokenResponse => {
      console.log('access_token acquired at: ' + new Date().toString())
      console.log(tokenResponse)
    })
}
