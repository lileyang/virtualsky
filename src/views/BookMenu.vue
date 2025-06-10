<template>
  <div class="body">
    <div class="head">
      <button class="back-btn" @click="goBack">返回</button>
      <div class="name">{{ book.name }}</div>
    </div>
    <div class="lable"></div>
    <div class="lable-content">
        <div 
          class="card" style="width: 18rem;" 
          v-for="(story, index) in book.list" :key="index"
          @click="goToStory(story)">
          <img :src="story.img" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title col-16">{{story.name}}</h5>
          </div>
        </div>
      </div>
  </div>
</template>

<script>

export default {
  mounted(){
    this.book = JSON.parse(localStorage.getItem('cachedbook'))
  },
  data(){
    return{
      book: {},
    }
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    goToStory(story) {
      localStorage.setItem('cachedbookstory', JSON.stringify(story))
      this.$router.push({path: 'BookStory'})
    },
  }
}
</script>

<style lang="less" scoped>
.body {
  width: 100vw;
  height: calc(100vh - 10vw);
  background-color: whitesmoke;
  overflow-y: auto;
  //padding-top: 10px;
  padding-bottom: 40px;
  font-family: 'MyFont';
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

  .welcome-img{
    width: 100vw;
    
  }
  .lable {
    color: brown;
    font-family: 'MyFont';
    font-size: 5vw;
    display: flex;
    justify-content: space-between;
    padding: 10px;
  }
  span{
    padding-left: 10px;
    padding-right: 10px;
  }
  .more{
    color: rgb(235, 79, 18);
  }
  a{
    text-decoration: none;
    border: none;
  }

  .lable-content {
    width: 100vw;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    text-align: center;
    .card {
      margin-top: 16px;
      width: 45vw;
      max-width: 45vw;
      color: saddlebrown;
      --bs-card-border-width:null;
    }
  }
  .card-body{
    color: saddlebrown;
    background-color: wheat;
    border-radius: 0 0 0.375rem 0.375rem;
  }
  .card-title{
    color: #c24d1faf;
    font-family: 'MyFont';
    font-size: 16px;
    line-height: 1.3;
  }
}
</style>
