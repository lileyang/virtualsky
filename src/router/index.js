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
import UserProfile from '@/views/UserProfile.vue'
import ForgetPassword from '@/views/ForgetPassword.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/Home' },
    { path: '/login', component: LoginPage },
    { path: '/register', component: RegisterPage },
    { path: '/ForgetPassword', component: ForgetPassword },
    { path: '/Home', component: Home },
    { path: '/EnglishHome', component: EnglishHome },
    { path: '/Search', component: SearchView },
    { path: '/StoryList', component: StoryList, meta: { requiresAuth: true } },
    { path: '/BookMenu', component: BookMenu, meta: { requiresAuth: true } },
    { path: '/BookStory', component: BookStory, meta: { requiresAuth: true } },
    { path: '/StoryMenu', component: StoryMenu, meta: { requiresAuth: true } },
    { path: '/StoryPlay', component: StoryPlay, meta: { requiresAuth: true } },
    { path: '/PDFMenu', component: PDFMenu, meta: { requiresAuth: true } },
    { path: '/PdfViewer', component: PdfViewer, meta: { requiresAuth: true } },
    { path: '/UserProfile', component: UserProfile},
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { x: 0, y: 0 }
  }
})

// 防止多次校验
let isChecking = false
let tokenValid = false
let waitQueue = []

router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('token')

  // 不需要权限，直接放行
  if (!to.meta.requiresAuth) {
    return next()
  }

  // 需要权限但无 token，跳登录
  if (!token) {
    alert('请先登录')
    return
  }

  // 已经验证过有效 token，直接放行
  if (tokenValid) {
    return next()
  }

  // 正在验证 token，加入等待队列，等待结果后执行 next
  if (isChecking) {
    waitQueue.push(next)
    return
  }

  isChecking = true

  try {
    await axios.get('/api/user/check', {
      headers: { Authorization: `Bearer ${token}` }
    })

    tokenValid = true
    next()
    // 放行等待队列的所有路由
    waitQueue.forEach(cb => cb())
  } catch (error) {
    alert('登录已过期，请重新登录')
    localStorage.removeItem('token')
    
    // 等待队列全部跳登录
    waitQueue.forEach(cb => cb('/login'))
  } finally {
    isChecking = false
    waitQueue = []
  }
})

// 处理 Vue-router 的导航错误，避免控制台报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => {
    if (
      err.name === 'NavigationDuplicated' ||
      err.message.includes('Avoided redundant navigation to current location')
    ) {
      // 忽略重复导航错误
      return Promise.resolve(this.currentRoute)
    }
    // 其他错误抛出
    return Promise.reject(err)
  })
}

export default router
