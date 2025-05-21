import VueRouter from 'vue-router'
import Vue from 'vue'
import Home from '@/views/Home.vue'
import Classic from '@/views/Classic.vue'
import Cartoon from '@/views/Cartoon.vue'
import StoryMenu from '@/views/StoryMenu.vue'
import StoryPlay from '@/views/StoryPlay.vue'
Vue.use(VueRouter) 

const router = new VueRouter({
    mode: 'history',
    routes: [
      {path:'/', redirect:'/Classic'},
      {path:'/Home', component: Home},
      {path:'/Classic', component: Classic},
      {path:'/Cartoon', component: Cartoon},
      {path:'/StoryMenu', component: StoryMenu},
      {path:'/StoryPlay', component:StoryPlay},
    ],
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    }
  })



export default router