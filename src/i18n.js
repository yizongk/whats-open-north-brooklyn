import { addMessages, init, getLocaleFromNavigator } from 'svelte-i18n'

import en from './i18n-dictionaries/en.json'
import es from './i18n-dictionaries/es.json'
import zhHans from './i18n-dictionaries/zh-Hans.json'
import zhHant from './i18n-dictionaries/zh-Hant.json'

addMessages('en', en)
addMessages('es', es)
addMessages('zh-Hans', zhHans)
addMessages('zh-Hant', zhHant)


init({
  fallbackLocale: 'en',
  initialLocale: getLocaleFromNavigator(),
})
