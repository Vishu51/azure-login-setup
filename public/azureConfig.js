/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "azureConfig" }] */
const azureConfig = (() => {
  return {
    VUE_APP_AIMS_SERVER_URL: 'http://seg.demo.solumesl.com/dashboardWeb',
    VUE_APP_AD_B2CSCOPES: ['https://solumb2c.onmicrosoft.com/api/demo.read'],
    VUE_APP_AD_CLINET_ID: 'e08e54ff-5bb1-4ae7-afde-b9cdc8fa23ae',
    VUE_APP_AD_POLICY_AUTHORITY: 'https://solumb2c.b2clogin.com/solumb2c.onmicrosoft.com',
    VUE_APP_AD_REDIRECT_URI: 'http://localhost:8080/login',
    VUE_APP_AD_CUST_POLICIES: []
  }
})()
