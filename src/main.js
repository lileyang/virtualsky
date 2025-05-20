import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import AppPage from './components/AppPage.vue'
import 'normalize.css'
import axios from 'axios'
import VueAxios from 'vue-axios'

// 创建 axios 实例（可选）
const axiosInstance = axios.create({
  baseURL: 'http://172.16.0.93', // 替换为你的接口地址
  timeout: 10000
})

Vue.use(VueAxios, axiosInstance) 

import router from './router/index.js'


Vue.config.productionTip = true

Vue.component('AppPage', AppPage)


new Vue({
  render: h => h(App),
  router
}).$mount('#app')

