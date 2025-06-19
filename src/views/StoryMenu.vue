<template>
  <div class="story" ref="scroll">
    <div class="head">
      <button class="back-btn" @click="goBack">返回</button>
      <div class="name">{{ story.name }}</div>
    </div>

    <div class="img-wrapper">
      <img class="img" :src="story.img" alt="封面图" />
    </div>

    <div class="title">
    <span>目录 ({{ story.list ? story.list.length : 0 }})</span>
    </div>

    <div class="menu">
      <div
        class="sub"
        v-for="(item, index) in story.list"
        :key="index"
        @click="goPlay(item)"
      >
        <span>{{ item }}</span>
        <img class="arrow" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjhweCIgaGVpZ2h0PSIyOHB4IiB2aWV3Qm94PSIwIDAgMjggMjgiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTYuNDM5OTc4NiwxMC45MDgzMjg3IDIwLjI2Nzk1NCwxNi43MzM1MDg2IEMyMC42MjU4NTEsMTcuMjc4MTM0NSAyMC40NzQ0NzcxLDE4LjAwOTc3MzkgMTkuOTI5ODUxNCwxOC4zNjc2NzA5IEMxOS43MzczODgzLDE4LjQ5NDE0NjcgMTkuNTEyMTIxNywxOC41NjE1Mzg1IDE5LjI4MTgyMTUsMTguNTYxNTM4NSBMMTEuNjI1ODcwOCwxOC41NjE1Mzg1IEMxMC45NzQxNzQ4LDE4LjU2MTUzODUgMTAuNDQ1ODcwOCwxOC4wMzMyMzQ1IDEwLjQ0NTg3MDgsMTcuMzgxNTM4NSBDMTAuNDQ1ODcwOCwxNy4xNTEyMzgzIDEwLjUxMzI2MjYsMTYuOTI1OTcxNyAxMC42Mzk3MzgzLDE2LjczMzUwODYgTDE0LjQ2NzcxMzcsMTAuOTA4MzI4NyBDMTQuODI1NjEwNywxMC4zNjM3MDI3IDE1LjU1NzI1MDEsMTAuMjEyMzI5MSAxNi4xMDE4NzYxLDEwLjU3MDIyNjEgQzE2LjIzNjQ2OTEsMTAuNjU4NjcyOSAxNi4zNTE1MzE4LDEwLjc3MzczNTcgMTYuNDM5OTc4NiwxMC45MDgzMjg3WiIgZmlsbD0iI0ZGNDU2NDYiLz48L3N2Zz4=" />
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
  width: 100%;
  min-height: 100vh;
  background-color: #fff;
  font-family: 'MyFont', sans-serif;
  padding: 0;
  box-sizing: border-box;

  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 2rem;
    background-color: rgba(221, 139, 16, 0.5);
    position: sticky;
    top: 0;
    z-index: 10;

    .back-btn {
      background-color: rgba(255, 255, 255, 0.6);
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      font-size: 1rem;
      color: saddlebrown;
      box-shadow: 0 2px 4px rgba(0, 128, 0, 0.2);
      backdrop-filter: blur(4px);
      cursor: pointer;
      transition: 0.3s ease;
    }

    .name {
      flex-grow: 1;
      text-align: center;
      font-size: 1.4rem;
      color: brown;
      font-weight: bold;
      position: absolute;
      justify-self: anchor-center;
    }
  }

  .img-wrapper {
    display: flex;
    justify-content: center;
    padding: 0.5rem;

    .img {
      width: 100%;
      max-width: 800px;
      aspect-ratio: 16 / 9;
      object-fit: cover;
      border-radius: 16px;
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    }
  }

  .title {
    font-size: 1.2rem;
    color: white;
    background-color: #20b2aa;
    padding: 0.5rem 1rem;
    margin: 0 auto;
    max-width: 900px;
    font-weight: bold;
  }

  .menu {
    padding: 1rem 2rem;
    max-width: 900px;
    margin: 0 auto;

    .sub {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      border-bottom: 1px solid #eee;
      cursor: pointer;
      transition: background 0.2s ease;

      &:hover {
        background-color: #f5f5f5;
      }

      span {
        font-size: 1rem;
        color: #333;
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .arrow {
        width: 24px;
        height: 24px;
      }
    }
  }
}

</style>
