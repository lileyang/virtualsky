<template>
    <div class="app-container">
        <div class="header" v-show="this.$route.path !== '/Search'">
            <div class="icon">
            </div>
            <div class="title" @click="goPage('/Home')">
            {{ title }}
            </div>
            <div class="search" @click="goSearch()">
                <span class="iconfont icon-icon-test"></span>
                <span>点击搜索你想要的</span>
                
            </div>
            <div class="user iconfont icon-user-circle"></div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: String
    },
    methods:{
        showAlert(msg){
            alert(msg)
        },
        goPage(path){
            if (this.$route.path !== path) {
                this.$router.push({ path}).catch(() => {})
                sessionStorage.setItem('storyScrollY', 0)
            }   
        },
        goSearch(){
            this.$router.push('/Search').catch(() => {});
        },
    }
}
</script>

<style lang="less" scoped>
.app-container {
  max-width: 960px; // 约等于 960px（16px * 60）
  margin: 0 auto;
  width: 100%;
}

.header {
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 60rem;
  margin: 0 auto;
  padding: 0 1rem;
  height: 3.75rem; // 60px
  background-color: white;
  box-sizing: border-box;

  .icon {
    flex-shrink: 0;
    width: 2.5rem;   // 40px
    height: 2.5rem;
    background-image: url('../assets/icon/web-icon.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  .title {
    flex-shrink: 0;
    font-size: 1.25rem; // 20px
    color: green;
    font-weight: 800;
    font-family: 'MyFont', sans-serif;
    cursor: pointer;
    margin-left: 0.625rem;  // 10px
    margin-right: auto;
  }

  .search {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    height: 2.5rem;
    padding: 0 0.75rem;
    margin-right: 0.75rem;
    border-radius: 1.25rem;
    border: 1px solid green;
    background-color: white;
    font-family: 'MyFont', sans-serif;
    color: green;
    white-space: nowrap;
    cursor: pointer;

    span:nth-child(1) {
      font-size: 1.25rem;
      margin-right: 0.375rem;
    }
    span:nth-child(2) {
      font-size: 0.875rem;
    }
  }

  .user {
    flex-shrink: 0;
    font-size: 1.5rem;
    color: saddlebrown;
  }
}


</style>