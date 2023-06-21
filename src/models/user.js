export default class User {
  constructor (
    account, password, firstName, domain, company, companyList,
    loginMode, sessionId, sessionTimeout, serverType,
    accountGroup, accountInfo,
    managedStores, mappedArticleId, mappedReservedOne, isSolumAdmin,
    tokenAPI, tokenEmail, tokenRefreshAPI, tokenDashboard,
    responseCode, responseMessage,
    releaseVersion, coreRevision, portalRevision, aliveInterval
  ) {
    this.account = account
    this.password = password
    this.firstName = firstName
    this.domain = domain
    this.company = company
    this.companyList = companyList
    this.loginMode = loginMode
    this.sessionId = sessionId
    this.sessionTimeout = sessionTimeout
    this.serverType = serverType
    this.accountGroup = accountGroup
    this.managedStores = managedStores
    this.accountInfo = accountInfo
    this.mappedArticleId = mappedArticleId
    this.mappedReservedOne = mappedReservedOne
    this.isSolumAdmin = isSolumAdmin
    this.tokenAPI = tokenAPI
    this.tokenEmail = tokenEmail
    this.tokenRefreshAPI = tokenRefreshAPI
    this.tokenDashboard = tokenDashboard
    this.responseCode = responseCode
    this.responseMessage = responseMessage
    this.releaseVersion = releaseVersion
    this.coreRevision = coreRevision
    this.portalRevision = portalRevision
    this.aliveInterval = aliveInterval
  }
}
