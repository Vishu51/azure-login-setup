import store from '@/store'
import { msalInstance } from 'vue-msal-browser'

// Sign-out the user
export function cloudLogout () {
  const logoutRequest = {
    account: msalInstance.getAccountByHomeId(store.state.auth.tokenAPI.homeAccountId)
  }
  msalInstance.logoutRedirect(logoutRequest)
}
