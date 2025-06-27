<template>
  <div class="App">
    <AppHeader :title='name' v-show="$route.path !== '/StoryPlay' || $route.path !== '/BookStory' || $route.path !== '/StoryMenu'"></AppHeader>
    <AppFooter v-show="$route.path === '/Home' || $route.path === '/EnglishHome'"></AppFooter>
    <router-view></router-view>
  </div>
</template>

<script>

import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
export default {
  data(){
    return {
      name: '虚拟天空',
      url: 'http://virtual-sky.online'
    }
  },
  components: {
    'AppHeader': AppHeader,
    'AppFooter': AppFooter,
  }
}
</script>

<style lang="less" scoped>
@font-face {
  font-family: 'MyFont';
  src: url('@/assets/font/alimama/DaoLiTi/AlimamaDaoLiTi.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

*{
  overflow-y: auto;
  margin: 0;
  padding: 0;
}
</style>