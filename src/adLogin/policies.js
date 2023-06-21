// Enter here the user flows and custom policies for your B2C application
// To learn more about user flows, visit https://docs.microsoft.com/en-us/azure/active-directory-b2c/user-flow-overview
// To learn more about custom policies, visit https://docs.microsoft.com/en-us/azure/active-directory-b2c/custom-policy-overview

export const b2cPolicies = {
  names: {
    signUpSignIn: 'B2C_1_signupsignin1',
    forgotPassword: 'b2c_1_passwordreset1',
    editProfile: 'b2c_1_profileediting1'
  },
  authorities: {
    signUpSignIn: {
      authority: azureConfig.VUE_APP_AD_POLICY_AUTHORITY + '/B2C_1_signupsignin1'
    },
    forgotPassword: {
      authority: azureConfig.VUE_APP_AD_POLICY_AUTHORITY + '/b2c_1_passwordreset1'
    },
    editProfile: {
      authority: azureConfig.VUE_APP_AD_POLICY_AUTHORITY + '/b2c_1_profileediting1'
    }
  }
}
