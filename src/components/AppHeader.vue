<template>
  <div class="app-container">
    <div class="header">
      <div class="icon" @click="goPage('/Home')"></div>

      <!-- <div class="title" @click="goPage('/Home')">
        {{ title }}
      </div> -->

      <div class="search" @click="goSearch()">
        <span class="iconfont icon-icon-test"></span>
        <span>点击搜索你想要的</span>
      </div>

      <!-- 用户信息块：用户名 + 头像 -->
      <div 
        class="user-info" 
        @click="goPage('/UserProfile')" 
        title="点击查看用户资料"
      >
        <img class="avatar" src="@/assets/icon/avstar.svg" alt="头像" />
        <span class="username">{{ username == ''?'未登录':username }}</span>
        
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from '@/utils/EventBus';

export default {
  props: {
    title: String,
  },
  data() {
    return {
      username: '', // 初始化为空，等待接口获取
    };
  },
  created() {
    this.fetchUserProfile();

    EventBus.$on('auth-change', () => {
      this.username = '';
      this.fetchUserProfile();
    });
  },
  methods: {
    async fetchUserProfile() {
      try {
        const token = localStorage.getItem('token'); // 或 sessionStorage
        if (!token) return;

        const res = await this.$axios.get('/api/user/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (res.data && res.data.username) {
          this.username = res.data.username;
        }
      } catch (err) {
        console.error('获取用户信息失败', err);
      }
    },
    goPage(path) {
      if(path === '/UserProfile'){
        if(this.username === '未登录'){
          this.goPage('/Login');
        }
      }
      if (this.$route.path !== path) {
        this.$router.push({ path }).catch(() => {});
        sessionStorage.setItem('storyScrollY', 0);
      }
    },
    goSearch() {
      this.$router.push('/Search').catch(() => {});
    }
  }
};
</script>

<style lang="less" scoped>
.app-container {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.header {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  height: 3.75rem;
  background-color: white;
  box-sizing: border-box;
  overflow: hidden;

  min-width: 0;  // 让flex子元素可以缩小

  .icon {
    flex: 0 0 auto;
    width: 2rem;
    height: 2rem;
    background-image: url('../assets/icon/web-icon.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    cursor: pointer;
    margin-right: 4px;
  }

  .title {
    flex: 1 1 30%;  // 允许伸缩，基础宽度30%
    font-size: 1rem;
    color: green;
    font-weight: 800;
    font-family: 'MyFont', sans-serif;
    cursor: pointer;
    margin-right: 0.5rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 4rem;
    max-width: 40%;  // 宽度最大40%，手机端会自动收缩
    min-width: 0;    // 避免内容撑开
  }

  .search {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    height: 2.5rem;
    padding: 0 0.5rem;
    margin-right: 0.5rem;
    border-radius: 1.25rem;
    border: 1px solid green;
    background-color: white;
    font-family: 'MyFont', sans-serif;
    color: green;
    white-space: nowrap;
    cursor: pointer;
    min-width: 10rem;  // 手机端可缩小
    max-width: 12rem;
  }

  .user-info {
    display: flex;
    align-items: center;
    cursor: pointer;
    flex: 0 1 30%;       // 宽度基础30%，可缩小
    max-width: 35%;      // 最大35%
    min-width: 5rem;
    overflow: hidden;
    padding-left: 0.3rem;

    .username {
      margin-left: 4px;
      font-family: 'MyFont', sans-serif;
      font-size: 0.875rem;
      font-weight: 600;
      color: #3a3a3a;
      background: linear-gradient(135deg, #97795d 0%, #aa8c6b 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;

      margin-right: 0.4rem;
      max-width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      flex-shrink: 1;
      flex-grow: 1;
      min-width: 0;
    }

    .avatar {
      width: 1.5rem;
      height: 1.5rem;
      flex-shrink: 0;
    }
  }

}

</style>
