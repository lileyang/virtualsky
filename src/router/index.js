import VueRouter from 'vue-router'
import Vue from 'vue'
import Home from '@/views/Home.vue'
import Chart from '@/views/Chart.vue'
import StoryMenu from '@/views/StoryMenu.vue'

Vue.use(VueRouter) 

const router = new VueRouter({
    routes: [
      {path:'/', redirect:'/Home'},
      {path:'/Home', component: Home},
      {path:'/Chart', component: Chart},
      {path:'/StoryMenu', component: StoryMenu}
    ]
  })



export default router