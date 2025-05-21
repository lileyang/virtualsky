<template>
  <div class="book" ref="scroll">
    <div class="head">
      <button class="back-btn" @click="goBack">返回</button>
      <div class="name">{{ this.book.name }}</div>
    </div>
    <div>
      <img class="img" :src="book.img" alt="" />
    </div>
    
    <div class="title">
      <span>目录({{ book.list ? book.list.length : 0 }})</span>      
    </div>
    <div class="menu">
      <div
        class="sub"
        v-for="(listItem, listIdx) in book.list"
        :key="listIdx"
      >
        <span>第{{ listItem.name }}卷</span>
        <div class="content" v-for="(item,index) in listItem.content" :key="index" @click="goPlay('/' + book.type + '/' + book.name + '/' + book.list[listIdx].name + '/' + item.file)">
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      book: {},
    }
  },
  mounted() {
    const querybook = this.$route.query.book
    if (querybook && typeof querybook === 'object') {
      this.book = querybook
      localStorage.setItem('cachedbook', JSON.stringify(querybook))
    } else {
      const cached = localStorage.getItem('cachedbook')
      if (cached) {
        this.book = JSON.parse(cached)
      }
    }

    // 恢复滚动位置
    this.$nextTick(() => {
      setTimeout(() => {
        const scrollY = sessionStorage.getItem('bookScrollY')
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
    goPlay(path) {
      const scrollContainer = this.$refs.scroll
      if (scrollContainer) {
        sessionStorage.setItem('bookScrollY', scrollContainer.scrollTop)
      }
      this.$router.push({
        path: '/PdfViewer',
        query: {
          pdfUrl: path
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.book {
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
        font-size: 6vw;
        line-height: calc(6vw + 4vh);
      }
      .content{
        font-size: 5vw;
        color: cornflowerblue;
        line-height: calc(6vw + 4vh);
        text-decoration-line: underline;
      }
    }
  }
}
</style>
