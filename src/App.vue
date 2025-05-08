<template>
  <div class="App">
    <AppPage :pageTitle='name' :pageUrl='url'></AppPage>
  </div>
</template>

<script>

export default {
  data(){
    return {
      name: '虚拟天空',
      url: 'https://www.mhua5.com/index.php'
    }
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