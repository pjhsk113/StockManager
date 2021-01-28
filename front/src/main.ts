import Vue from 'vue'
import App from './App.vue'
import store from './store'
import './plugins/element.js'
import ElementUI from 'element-ui'

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
