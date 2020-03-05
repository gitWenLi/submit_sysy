import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import echarts from 'echarts'
import axios from 'axios'

Vue.use(ElementUI)

Vue.prototype.$axios = axios

axios.defaults.baseURL = 'http://zz.mawenli.com/'
axios.defaults.withCredentials = true
// console.log('process---: ', process)
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
