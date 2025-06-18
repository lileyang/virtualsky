/*
import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import AppPage from './components/AppPage.vue'
import 'normalize.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
//资源文件
import {resource} from '@/data/resource.js'

// 创建 axios 实例（可选）
const axiosInstance = axios.create({
  baseURL: 'http://172.16.0.93', // 替换为你的接口地址
  timeout: 10000
})

Vue.use(VueAxios, axiosInstance) 

Vue.prototype.$axios = axiosInstance 

import router from './router/index.js'


Vue.config.productionTip = true

Vue.component('AppPage', AppPage)

Vue.prototype.$resource = resource;

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
*/
import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import AppPage from './components/AppPage.vue'
import 'normalize.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router/index.js'

Vue.use(VueAxios, axios)
Vue.prototype.$axios = axios

Vue.config.productionTip = false
Vue.component('AppPage', AppPage)

// 在 new Vue 之前，先异步加载 resource.json
axios.get('/resource.json')
  .then(({ data }) => {
    // data 就是你原来的 resource 对象
    Vue.prototype.$resource = data

    // 只有拿到资源后再挂载根实例
    new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  })
  .catch(err => {
    console.error('加载 resource.json 失败', err)
    // 即使失败，也可继续启动，只是 $resource 为空或默认
    Vue.prototype.$resource = { bookList: [] }
    new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  })

