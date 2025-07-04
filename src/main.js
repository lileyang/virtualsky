import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import AppPage from './components/AppPage.vue'
import 'normalize.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router/index.js'

Vue.config.productionTip = false
Vue.component('AppPage', AppPage)

// 设置基础 rem（适配移动端）
const baseSize = 16
function setRem() {
  const scale = document.documentElement.clientWidth / 375
  document.documentElement.style.fontSize = (baseSize * Math.min(scale, 2)) + 'px'
}
setRem()
window.addEventListener('resize', setRem)

// ✅ 先加载资源配置，再启动应用
axios.get('/resource.json')
  .then(({ data }) => {
    Vue.prototype.$resource = data

    new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  })
  .catch(err => {
    console.error('加载 resource.json 失败', err)
    Vue.prototype.$resource = { bookList: [] }

    new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  })

//console.log(window.location)

// ✅ 设置 axios 基础配置
const hostname = window.location.hostname
//const protocol = window.location.protocol
// 自动适配本地开发 / 线上部署，全部请求 "/api" 路由
if (hostname === 'virtualsky.pages.dev') {
  axios.defaults.baseURL = '/api';  // 会请求当前域名下的 /api
} else if (hostname === 'localhost') {
  axios.defaults.baseURL = 'http://localhost:8080/api';
} else {
  axios.defaults.baseURL = '/api';  // 其他情况默认也走当前域的代理
}


//axios.defaults.baseURL = 'https://virtual-sky.online:8080/api'
//axios.defaults.baseURL = 'http://172.16.0.93:8080'
// axios.defaults.baseURL = 'https://localhost:8080'
axios.defaults.timeout = 10000

// ✅ 拦截器：自动添加 token
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
    return config
  },
  error => Promise.reject(error)
)

Vue.use(VueAxios, axios)
Vue.prototype.$axios = axios