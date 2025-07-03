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
        <img class="arrow" src="/img/icon/icon_play.png" />
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
      console.log(this.story.type)
      this.$router.push({
        path: '/StoryPlay',
        query: {
          storyName: this.story.name,
          fileType: this.story.fileType,
          file: item,
          img: this.story.img,
          series: this.story.series,
          list: JSON.stringify(this.story.list),
          
        }
      }).catch(() => {});
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
    position: sticky;
    max-width: 960px;
    margin: 0 auto;
    top: 0;
    z-index: 10;
    padding: 1.5rem 2rem;
    background-color: rgba(221, 139, 16, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;

    .back-btn {
      position: absolute;
      left: 1rem;
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
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      font-size: 1.4rem;
      color: brown;
      font-weight: bold;
      white-space: nowrap;
    }
  }

  .img-wrapper {
    display: flex;
    justify-content: center;
    padding: 0.5rem;

    .img {
      width: 100%;
      max-width: 500px;
      aspect-ratio: 9 / 9;
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
