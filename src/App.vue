<template>
  <div class="App">
    <AppHeader :title='name'></AppHeader>
    <router-view></router-view>
  </div>
</template>

<script>

import AppHeader from '@/components/AppHeader.vue';

export default {
  data(){
    return {
      name: '虚拟天空',
      url: 'https://virtualsky.pages.dev'
    }
  },
  components: {
    'AppHeader': AppHeader,
  }
}
</script>

<style lang="less" scoped>
@font-face {
  font-family: 'MyFont';
  src: url('@/assets/font/AlimamaDaoLiTi.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

*{
  overflow: hidden;
  margin: 0;
  padding: 0;
}
</style>