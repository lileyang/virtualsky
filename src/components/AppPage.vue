<template>
  <div class="page">
    <AppHeader :title='pageTitle'></AppHeader>
    <AppFooter v-show="$route.path === '/Home' || $route.path === '/Classic' || $route.path === '/Cartoon'"></AppFooter>
    <!-- <AppBody :url='pageUrl'></AppBody> -->
    <router-view></router-view>
    
  </div>
</template>

<script>
import AppHeader from './AppHeader.vue';
//import AppBody from './AppBody.vue';
import AppFooter from './AppFooter.vue';
export default {
  props: ['pageTitle', 'pageUrl'],
  components: {
    'AppHeader': AppHeader,
    //'AppBody': AppBody,
    'AppFooter': AppFooter,
  }
}
</script>

<style lang="less" scoped>
.page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: lightgrey;
  padding: 0;
  margin: 0;

  // 让 router-view 占满除头尾之外的剩余空间
  .router-view {
    flex: 1;
    overflow-y: auto;
  }
}


</style>