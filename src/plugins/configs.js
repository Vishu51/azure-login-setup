
const config = {
  ApiUrl: ''
}
// console.info('Default config' + JSON.stringify(config))

const getRuntimeConfig = async (baseUrl) => {
  const runtimeConfig = await fetch(baseUrl + 'properties_cloud.json')
  return await runtimeConfig.json()
}

const getServerIp = (json) => {
  // Server 설치버전에서 사용자가 localhost 주소로 접속한 경우 API서버 localhost로 덮어씌운다.
  return json.serverIp
}

const init = async () => {
  const baseUrl = process.env.BASE_URL
  // const mapUrl = process.env.VUE_APP_MAP_SERVER_URL
  if (process.env.VUE_APP_USING_PROPERTIES) {
    return await getRuntimeConfig(baseUrl).then(function (json) {
      console.debug('Runtime config: ' + JSON.stringify(json))
      const protocol = json.protocolType || 'http'
      const serverIp = getServerIp(json)
      const serverPort = json.serverPort || ''
      const serverDomain = json.serverDomain || '/'
      const ServerAddress = `${protocol}://${serverIp}:${serverPort}`
      const newConfig = {
        ApiUrl: ServerAddress + (serverDomain || '') + '/'
      }
      Object.assign(config, newConfig)
      return newConfig
    })
  }
}

const appliedConfig = init()
config.appliedConfig = appliedConfig

export default config
