import App from './App.svelte'
import './i18n.js'

//polyfill
import 'whatwg-fetch'

const app = new App({
  target: document.body
})

export default app
