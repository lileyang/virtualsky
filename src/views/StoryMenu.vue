<template>
  <div class="story" ref="scroll">
    <div class="head">
      <button class="back-btn" @click="goBack">返回</button>
      <div class="name">{{ this.story.name }}</div>
    </div>
    <div>
      <img class="img" :src="story.img" alt="" />
    </div>
    
    <div class="title">
      <span>目录({{ story.list ? story.list.length : 0 }})</span>      
    </div>
    <div class="menu">
      <div
        class="sub"
        v-for="(item, index) in story.list"
        :key="index"
        @click="goPlay(item)"
      >
        <span>{{ item }}</span>
        <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjhweCIgaGVpZ2h0PSIyOHB4IiB2aWV3Qm94PSIwIDAgMjggMjgiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+eGlucmVuX2ljX3BsYXlAMng8L3RpdGxlPgogICAgPGcgaWQ9Iumhtemdoi0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0i5LiT6L6R5YiG5Lqr6JC95Zyw6aG1X2g177yIMjAyMjAyMjPlrprnqL/vvInlpIfku70iIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0zMzEuMDAwMDAwLCAtNzAzLjAwMDAwMCkiPgogICAgICAgICAgICA8ZyBpZD0i57yW57uELTI4IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjAwMDAwMCwgNTU3LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC0xMCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYuMDAwMDAwLCA2Ni4wMDAwMDApIj4KICAgICAgICAgICAgICAgICAgICA8ZyBpZD0i5oyJ6ZKu5pKtIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzMTUuMDAwMDAwLCA4MC4wMDAwMDApIj4KICAgICAgICAgICAgICAgICAgICAgICA8Y2lyY2xlIGlkPSJPdmFsLTMiIGZpbGwtb3BhY2l0eT0iMC4xMjI5ODQ1NTkiIGZpbGw9IiNGRjY0NjQiIGN4PSIxNCIgY3k9IjE0IiByPSIxNCI+PC9jaXJjbGU+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTE2LjQzOTk3ODYsMTAuOTA4MzI4NyBMMjAuMjY3OTU0LDE2LjczMzUwODYgQzIwLjYyNTg1MSwxNy4yNzgxMzQ1IDIwLjQ3NDQ3NzMsMTguMDA5NzczOSAxOS45Mjk4NTE0LDE4LjM2NzY3MDkgQzE5LjczNzM4ODMsMTguNDk0MTQ2NyAxOS41MTIxMjE3LDE4LjU2MTUzODUgMTkuMjgxODIxNSwxOC41NjE1Mzg1IEwxMS42MjU4NzA4LDE4LjU2MTUzODUgQzEwLjk3NDE3NDgsMTguNTYxNTM4NSAxMC40NDU4NzA4LDE4LjAzMzIzNDUgMTAuNDQ1ODcwOCwxNy4zODE1Mzg1IEMxMC40NDU4NzA4LDE3LjE1MTIzODMgMTAuNTEzMjYyNiwxNi45MjU5NzE3IDEwLjYzOTczODMsMTYuNzMzNTA4NiBMMTQuNDY3NzEzNywxMC45MDgzMjg3IEMxNC44MjU2MTA3LDEwLjM2MzcwMjcgMTUuNTU3MjUwMSwxMC4yMTIzMjkxIDE2LjEwMTg3NjEsMTAuNTcwMjI2MSBDMTYuMjM2NDY5MSwxMC42NTg2NzI5IDE2LjM1MTUzMTgsMTAuNzczNzM1NyAxNi40Mzk5Nzg2LDEwLjkwODMyODcgWiIgaWQ9IuS4ieinkuW9ouWkh+S7vS0yIiBmaWxsPSIjRkY0NjQ2IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNS40NTM4NDYsIDEzLjk4NDYxNSkgcm90YXRlKC0yNzAuMDAwMDAwKSB0cmFuc2xhdGUoLTE1LjQ1Mzg0NiwgLTEzLjk4NDYxNSkgIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      story: {},
    }
  },
  mounted() {
    const queryStory = this.$route.query.story
    if (queryStory && typeof queryStory === 'object') {
      this.story = queryStory
      localStorage.setItem('cachedStory', JSON.stringify(queryStory))
    } else {
      const cached = localStorage.getItem('cachedStory')
      if (cached) {
        this.story = JSON.parse(cached)
      }
    }

    // 恢复滚动位置
    this.$nextTick(() => {
      setTimeout(() => {
        const scrollY = sessionStorage.getItem('storyScrollY')
        const scrollContainer = this.$refs.scroll
        if (scrollY && scrollContainer) {
          scrollContainer.scrollTop = parseInt(scrollY, 10)
        }
      }, 50)
    })
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    goPlay(item) {
      const scrollContainer = this.$refs.scroll
      if (scrollContainer) {
        sessionStorage.setItem('storyScrollY', scrollContainer.scrollTop)
      }
      this.$router.push({
        path: '/StoryPlay',
        query: {
          storyName: this.story.name,
          file: item,
          img: this.story.img
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.story {
  background-color: rgb(255, 255, 255);
  font-family: 'MyFont', sans-serif;
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  .head {
    position: relative;
    display: flex;
    align-items: center;
    width: 100vw;
    height: 12vw;
    background-color: rgba(221, 139, 16, 0.5);
    .back-btn {
      background-color: rgba(255, 255, 255, 0.2);
      border: none;
      padding: 2vw 4vw;
      margin-left: 1vw;
      border-radius: 8px;
      font-size: 4vw;
      color: saddlebrown;
      box-shadow: 0 4px 8px rgba(0, 128, 0, 0.2);
      backdrop-filter: blur(4px);
      cursor: pointer;
      transition: all 0.3s ease;
      z-index: 2;
    }
    .name {
      position: absolute;
      left: 0;
      right: 0;
      font-size: 6vw;
      color: brown;
      text-align: center;
    }
  }
  .img {
    width: 100vw;
  }
  .title {
    background-color: lightseagreen;
    padding: 4vw 0 4vw 4vw;
    font-size: 6vw;
    color: white;
  }
  .menu {
    padding: 0vw 4vw 4vw 4vw;
    height: 100%;
    .sub {
      display: flex;
      justify-content: space-between;
      color: rgb(51, 51, 51);
      padding: 4vw 4vw 4vw 0vw;
      border-style: solid;
      border-width: 0 0 1px 0;
      border-bottom-color: rgb(243, 244, 245);
      span {
        line-height: calc(6vw + 4vh);
      }
    }
  }
}
</style>
