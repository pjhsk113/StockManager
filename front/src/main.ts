import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import VueGraph from 'vue-graph'
import ECharts from 'vue-echarts'
import 'element-ui/lib/theme-chalk/index.css';
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts-gl'

Vue.use(VueGraph)
Vue.use(ECharts)
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
