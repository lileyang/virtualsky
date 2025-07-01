<template>
  <div class="App">
    <AppHeader :title='name' v-show="this.$route.path !== '/Search' && this.$route.path !== '/BookStory' && this.$route.path !== '/StoryMenu' && this.$route.path !== '/StoryPlay' && this.$route.path !== '/UserProfile'"></AppHeader>
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
      url: this.$axios.defaults.baseURL,
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