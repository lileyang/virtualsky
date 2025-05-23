<template>
  <div class="search" ref="scroll">
    <div class="head">
      <button class="back-btn" @click="goBack">返回</button>
      <div class="name">搜索</div>
    </div>
    <div class="input">
      <input type="text" v-model="searchText" placeholder="搜索" />
      <button class="search-btn" @click="search(searchText)">搜索</button>
    </div>
    <div class="list" v-for="(item, index) in searchList" :key="index">
      <ListItem :item="item"></ListItem>
    </div>
  </div>
</template>

<script>
import ListItem from '@/components/ListItem.vue'
export default {
  data() {
    return {
      bookList: this.$bookList,
      searchList: [],
      searchText: '',
    }
  },
  components: {
    ListItem
  },
  methods: {
    goBack() {
      this.$router.push('/')
    },
    search(searchText) {
      const allBooks = Object.values(this.bookList).flat()
      this.searchList = allBooks.filter(book => book.name.includes(searchText))
      console.log(this.searchList)
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  background-color: rgb(255, 255, 255);
  font-family: 'MyFont', sans-serif;
  width: 100%;          /* 改成100%，避免横向滚动 */
  height: 100vh;
  overflow-y: auto;
  box-sizing: border-box;  /* 统一盒模型 */

  .head {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;        /* 改成100% */
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
      box-sizing: border-box;
    }

    .name {
      position: absolute;
      left: 0;
      right: 0;
      font-size: 6vw;
      color: brown;
      text-align: center;
      box-sizing: border-box;
    }
  }

  .input {
    width: 100%;     /* 改成100% */
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
      box-shadow: inset 0 2px 5px rgb(0 0 0 / 0.05);
      transition: border-color 0.3s ease;
      box-sizing: border-box; /* 重要，padding计算在内 */
      min-width: 0; /* 防止flex子项超出 */
    }

    input[type='text']:focus {
      border-color: #dd8b10; /* 橙色边框 */
      box-shadow: 0 0 6px rgba(221, 139, 16, 0.5);
    }

    .search-btn {
      height: 10vw;
      padding: 0 5vw;
      font-size: 4vw;
      border: none;
      background-color: #dd8b10;
      color: #fff;
      border-radius: 0 8vw 8vw 0;
      cursor: pointer;
      box-shadow: 0 3px 6px rgba(221, 139, 16, 0.5);
      transition: background-color 0.3s ease, box-shadow 0.3s ease;
      box-sizing: border-box;
      white-space: nowrap; /* 防止按钮文本换行 */
    }

    .search-btn:hover {
      background-color: #bb6e0c;
      box-shadow: 0 4px 10px rgba(187, 110, 12, 0.7);
    }

    .search-btn:active {
      background-color: #995c0a;
      box-shadow: none;
    }
  }
}
</style>
