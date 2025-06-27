import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'

import LoginPage from '@/views/LoginPage.vue'
import RegisterPage from '@/views/RegisterPage.vue'
import StoryMenu from '@/views/StoryMenu.vue'
import StoryPlay from '@/views/StoryPlay.vue'
import PDFMenu from '@/views/PDFMenu.vue'
import PdfViewer from '@/views/PdfViewer'
import SearchView from '@/views/SearchView.vue'
import Home from '@/views/Home.vue'
import EnglishHome from '@/views/EnglishHome.vue'
import StoryList from '@/views/StoryList.vue'
import BookMenu from '@/views/BookMenu.vue'
import BookStory from '@/views/BookStory.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/Home' },
    { path: '/login', component: LoginPage },
    { path: '/register', component: RegisterPage },
    { path: '/Home', component: Home, meta: { requiresAuth: true }},
    { path: '/EnglishHome', component: EnglishHome, meta: { requiresAuth: true }},
    { path: '/StoryList', component: StoryList, meta: { requiresAuth: true }},
    { path: '/BookMenu', component: BookMenu, meta: { requiresAuth: true }},
    { path: '/BookStory', component: BookStory, meta: { requiresAuth: true }},
    { path: '/StoryMenu', component: StoryMenu, meta: { requiresAuth: true }},
    { path: '/StoryPlay', component: StoryPlay, meta: { requiresAuth: true }},
    { path: '/PDFMenu', component: PDFMenu, meta: { requiresAuth: true }},
    { path: '/PdfViewer', component: PdfViewer, meta: { requiresAuth: true }},
    { path: '/Search', component: SearchView, meta: { requiresAuth: false }}
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('token')

  // 登录和注册页面不拦截
  if (to.path === '/login' || to.path === '/register') {
    return next()
  }

  // 没 token，直接跳登录
  if (!token) {
    alert('请先登录')
    return next('/login')
  }

  // 有 token，验证有效性
  try {
    await axios.get('http://virtual-sky.online:8080/api/user/check', {
      headers: { Authorization: `Bearer ${token}` }
    })
    next() // 放行
  } catch (err) {
    alert('登录已过期，请重新登录')
    localStorage.removeItem('token')
    next('/login')
  }
})

export default router
