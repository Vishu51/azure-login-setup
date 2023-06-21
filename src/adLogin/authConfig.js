import { b2cPolicies } from './policies'
import { apiConfig } from './apiConfig'

/**
 * Config object to be passed to MSAL on creation.
 * For a full list of msal.js configuration parameters,
 * visit https://azuread.github.io/microsoft-authentication-library-for-js/docs/msal/modules/_configuration_.html
 * */
export const msalConfig = {
  auth: {
    clientId: azureConfig.VUE_APP_AD_CLINET_ID,
    authority: b2cPolicies.authorities.signUpSignIn.authority,
    // redirectUri: ['http://localhost:8080/login', 'https://dc-00-01.dtonic.io:9444/login'],
    redirectUri: azureConfig.VUE_APP_AD_REDIRECT_URI,
    // postLogoutRedirectUrl : 솔루엠 요청으로 추가
    postLogoutRedirectUrl: azureConfig.VUE_APP_AD_REDIRECT_URI,
    validateAuthority: false
  },
  cache: {
    cacheLocation: 'localStorage', // This configures where your cache will be stored
    storeAuthStateInCookie: false // Set this to "true" to save cache in cookies to address trusted zones limitations in IE (see: https://github.com/AzureAD/microsoft-authentication-library-for-js/wiki/Known-issues-on-IE-and-Edge-Browser)
  }
}

/**
 * Scopes you enter here will be consented once you authenticate. For a full list of available authentication parameters,
 * visit https://azuread.github.io/microsoft-authentication-library-for-js/docs/msal/modules/_authenticationparameters_.html
 */
export const loginRequest = {
  scopes: ['openid', 'profile']
}

// Add here scopes for access token to be used at the API endpoints.
export const tokenRequest = {
  scopes: [...apiConfig.b2cScopes, 'offline_access', 'openid', 'profile'] // e.g. ["https://fabrikamb2c.onmicrosoft.com/helloapi/demo.read"]
}
