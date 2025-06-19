<template>
  <div class="search" ref="scroll">
    <!-- 头部 -->
    <div class="head">
      <button class="back-btn" @click="goBack">返回</button>
      <div class="name">搜索</div>
    </div>

    <!-- 输入框 -->
    <div class="input">
      <input
        type="text"
        v-model.trim="searchText"
        placeholder="搜索"
        @keyup.enter="search"
        @input="onInput"
      />

      <button class="search-btn" @click="search">搜索</button>
    </div>

    <!-- 搜索结果 -->
    <div v-if="searchList.length">
      <div class="list" v-for="(item, index) in searchList" :key="index">
        <ListItem :item="item" @click="goToStoryMenu(item)" />
      </div>
    </div>

    <!-- 无结果提示 -->
    <div class="tips" v-else-if="searchText">
      无结果
    </div>
  </div>
</template>

<script>
import ListItem from '@/components/ListItem.vue'

export default {
  name: 'SearchView',
  components: { ListItem },
  data() {
    return {
      // 原始扁平化列表
      allBooks: [],
      // 当前搜索结果
      searchList: [],
      // 搜索关键词
      searchText: ''
    }
  },
  created() {
    // 从全局挂载的 $resource 拿到 bookList 并扁平化
    const categories = this.$resource.bookList || []
    this.allBooks = categories.flatMap(cat => cat.list || [])
  },
  methods: {
    goBack() {
      if (window.history.length > 1) {
        this.$router.back()
      } else {
        this.$router.push('/') // 或跳转到首页/频道页等
      }
    },
    search() {
      const kw = this.searchText.toLowerCase()
      if (!kw) {
        this.searchList = []
        return
      }
      // 按 name 模糊匹配，忽略大小写
      this.searchList = this.allBooks.filter(book =>
        book.name && book.name.toLowerCase().includes(kw)
      )
    },
    // 输入时自动搜索（防抖）
    onInput() {
      clearTimeout(this.debounceTimer)
      this.debounceTimer = setTimeout(() => {
        this.search()
      }, 500) // 500ms 无操作后自动搜索
    },
    goToStoryMenu(item) {
      if (item.type === 'audio') {
        localStorage.setItem('cachedStory', JSON.stringify(item))
        this.$router.push({ path: '/StoryMenu' })
      } else if (item.type === 'pdf') {
        localStorage.setItem('cachedBook', JSON.stringify(item))
        this.$router.push({ path: '/PDFMenu' })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  background: #fff;
  font-family: 'MyFont', sans-serif;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;

  .head {
    display: flex;
    align-items: center;
    justify-content: center; // 居中 name
    position: relative;
    height: 12vw;
    background: rgba(221, 139, 16, 0.5);
    width: 100%;
    box-sizing: border-box;

    .back-btn {
      position: absolute;
      left: 1.5vw;
      background: rgba(255, 255, 255, 0.2);
      border: none;
      padding: 2vw 4vw;
      border-radius: 8px;
      font-size: 4vw;
      color: saddlebrown;
      box-shadow: 0 4px 8px rgba(0, 128, 0, 0.2);
      backdrop-filter: blur(4px);
      cursor: pointer;
      z-index: 1;
    }

    .name {
      font-size: 5.5vw;
      color: brown;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }


  .input {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 4vw;
    margin: 2vw 0;
    box-sizing: border-box;

    input[type='text'] {
      flex: 1;
      height: 10vw;
      font-size: 4vw;
      padding: 0 4vw;
      border: 1.5px solid #ddd;
      border-radius: 8vw 0 0 8vw;
      outline: none;
      box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.05);
      transition: border-color 0.3s ease;
      min-width: 0;
    }
    input[type='text']:focus {
      border-color: #dd8b10;
      box-shadow: 0 0 6px rgba(221, 139, 16, 0.5);
    }

    .search-btn {
      height: 10vw;
      padding: 0 5vw;
      font-size: 4vw;
      border: none;
      background: #dd8b10;
      color: #fff;
      border-radius: 0 8vw 8vw 0;
      cursor: pointer;
      box-shadow: 0 3px 6px rgba(221, 139, 16, 0.5);
      transition: background 0.3s ease, box-shadow 0.3s ease;
      white-space: nowrap;
    }
    .search-btn:hover {
      background: #bb6e0c;
      box-shadow: 0 4px 10px rgba(187, 110, 12, 0.7);
    }
    .search-btn:active {
      background: #995c0a;
      box-shadow: none;
    }
  }

  .list {
    padding: 0 4vw;
  }

  .tips {
    width: 100%;
    text-align: center;
    font-size: 6vw;
    color: #995c0a;
    padding-top: 10vw;
  }
}
</style>
