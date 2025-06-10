import VueRouter from 'vue-router'
import Vue from 'vue'
import StoryMenu from '@/views/StoryMenu.vue'
import StoryPlay from '@/views/StoryPlay.vue'
import PDFMenu from '@/views/PDFMenu.vue'
import PdfViewer from '@/views/PdfViewer'
import SearchView from '@/views/SearchView.vue'
import Home from '@/views/Home.vue'
import EnglishHome from '@/views/EnglishHome.vue'
import StoryList from '@/views/StoryList.vue'
import BookMenu from '@/views/BookMenu.vue'
import BookStory from '@/views/BookStory'

Vue.use(VueRouter) 

const router = new VueRouter({
    mode: 'history',
    routes: [
      {path:'/', redirect:'/Home'},
      {path:'/Home', component: Home},
      {path:'/EnglishHome', component: EnglishHome},
      {path:'/StoryList', component: StoryList},
      {path:'/BookMenu', component: BookMenu},
      {path:'/BookStory', component: BookStory},
      {path:'/StoryMenu', component: StoryMenu},
      {path:'/StoryPlay', component:StoryPlay},
      {path:'/PDFMenu', component: PDFMenu},
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