import VueRouter from 'vue-router'
import Vue from 'vue'
import StoryMenu from '@/views/StoryMenu.vue'
import StoryPlay from '@/views/StoryPlay.vue'
import BookMenu from '@/views/BookMenu.vue'
import PdfViewer from '@/views/PdfViewer'
import SearchView from '@/views/SearchView.vue'
import Home from '@/views/Home.vue'
import StoryList from '@/views/StoryList.vue'

Vue.use(VueRouter) 

const router = new VueRouter({
    mode: 'history',
    routes: [
      {path:'/', redirect:'/Home'},
      {path:'/Home', component: Home},
      {path:'/StoryList', component: StoryList},
      {path:'/StoryMenu', component: StoryMenu},
      {path:'/StoryPlay', component:StoryPlay},
      {path:'/BookMenu', component: BookMenu},
      {path:'/PdfViewer', component: PdfViewer},
      {path:'/Search', component: SearchView}
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