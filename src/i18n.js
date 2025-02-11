import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

// function loadLocaleMessages () {
//   const locales = require.context(
//     './locales',
//     true,
//     /[A-Za-z0-9-_,\s]+\.json$/i
//   )
//   const messages = {}
//   locales.keys().forEach(key => {
//     const matched = key.match(/([A-Za-z0-9-_]+)\./i)
//     if (matched && matched.length > 1) {
//       const locale = matched[1]
//       messages[locale] = locales(key)
//     }
//   })
//   return messages
// }

export default new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: loadLocaleMessages(),
  silentTranslationWarn: true
})

function loadLocaleMessages () {
  const data = JSON.parse(localStorage.getItem('languagecontent'))
  // console.log(data)
  const locales = data
  // console.log(locales)
  const message = {}
  for (const data1 in locales) {
    message[data1] = locales[data1]
  }
  const messages = {
    lan: message
  }
  // console.log('mesaages', messages)

  return messages
}
