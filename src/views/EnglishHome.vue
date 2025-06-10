<template>
  <div class="body">
    <div class="book" v-for="(book, index) in englishbooks" :key="index">
      <div class="lable">
        <span>{{book.name}}</span>
        <span class="more" @click="more(book)">更多 ></span>
        </div>
      <div class="lable-content">
        <div 
          class="card" style="width: 18rem;" 
          v-for="(story, index) in book.list.slice(0, 2)" :key="index"
          @click="goToStory(story)">
          <img :src="story.img" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title col-16">{{story.name}}</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'myHome',
  props: ['url'],
  components:{
    
  },
  data(){    
    return{
      englishbooks: this.$resource.study.english,
    }
  },
  methods: {
    more(book){
      localStorage.setItem('cachedbook', JSON.stringify(book))
      this.$router.push({path: 'BookMenu'})
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
      width: 45vw;
      max-width: 45vw;
      color: saddlebrown;
      flex: 1;
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
