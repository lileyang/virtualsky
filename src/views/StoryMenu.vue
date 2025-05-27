<template>
  <div class="story" ref="scroll">
    <div class="head">
      <button class="back-btn" @click="goBack">返回</button>
      <div class="name">{{ story.name }}</div>
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
        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjhweCIgaGVpZ2h0PSIyOHB4IiB2aWV3Qm94PSIwIDAgMjggMjgiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTYuNDM5OTc4NiwxMC45MDgzMjg3IDIwLjI2Nzk1NCwxNi43MzM1MDg2IEMyMC42MjU4NTEsMTcuMjc4MTM0NSAyMC40NzQ0NzcxLDE4LjAwOTc3MzkgMTkuOTI5ODUxNCwxOC4zNjc2NzA5IEMxOS43MzczODgzLDE4LjQ5NDE0NjcgMTkuNTEyMTIxNywxOC41NjE1Mzg1IDE5LjI4MTgyMTUsMTguNTYxNTM4NSBMMTEuNjI1ODcwOCwxOC41NjE1Mzg1IEMxMC45NzQxNzQ4LDE4LjU2MTUzODUgMTAuNDQ1ODcwOCwxOC4wMzMyMzQ1IDEwLjQ0NTg3MDgsMTcuMzgxNTM4NSBDMTAuNDQ1ODcwOCwxNy4xNTEyMzgzIDEwLjUxMzI2MjYsMTYuOTI1OTcxNyAxMC42Mzk3MzgzLDE2LjczMzUwODYgTDE0LjQ2NzcxMzcsMTAuOTA4MzI4NyBDMTQuODI1NjEwNywxMC4zNjM3MDI3IDE1LjU1NzI1MDEsMTAuMjEyMzI5MSAxNi4xMDE4NzYxLDEwLjU3MDIyNjEgQzE2LjIzNjQ2OTEsMTAuNjU4NjcyOSAxNi4zNTE1MzE4LDEwLjc3MzczNTcgMTYuNDM5OTc4NiwxMC45MDgzMjg3WiIgZmlsbD0iI0ZGNDU2NDYiLz48L3N2Zz4=" />
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
    const queryStory = JSON.parse(localStorage.getItem('cachedStory'))
    this.story = queryStory
    
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
          img: this.story.img,
          list: JSON.stringify(this.story.list),
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
    // height: 100%;
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
