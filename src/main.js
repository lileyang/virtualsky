import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import AppPage from './components/AppPage.vue'
import 'normalize.css'

import router from './router/index.js'


Vue.config.productionTip = true

Vue.component('AppPage', AppPage)


new Vue({
  render: h => h(App),
  router
}).$mount('#app')

