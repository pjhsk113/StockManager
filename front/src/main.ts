import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import VueGoogleCharts from 'vue-google-charts'
import { VueCsvImport } from 'vue-csv-import';

Vue.use(VueGoogleCharts)
Vue.use(ElementUI)
Vue.use(VueCsvImport)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
