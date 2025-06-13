<template>
  <div class="body">
    <!-- <img src="/img/img_welcome.jpg" class="welcome-img" alt=""> -->
    <!-- <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="true">
      <div class="carousel-inner">
        <div class="carousel-item active" data-bs-interval="2000">
          <img src="img/wel3.jpg" class="d-block w-100">
        </div>
        <div class="carousel-item" data-bs-interval="2000">
          <img src="img/wel1.jpg" class="d-block w-100">
        </div>
        <div class="carousel-item" data-bs-interval="3000">
          <img src="img/wel2.jpg" class="d-block w-100">
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div> -->
    <div class="channel" v-for="(channel, channelIndex) in channels" :key="channelIndex">
      <div class="lable">
        <span>{{channel.name}}</span>
        <span class="more" @click="more(channel)">更多 ></span>
        </div>
      <div class="lable-content">
        <div 
          class="card" style="width: 18rem;" 
          v-for="(story, index) in channel.list.slice(0, 2)" :key="index"
          @click="goToStoryMenu(story)">
          <img :src="story.img" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title col-16 text-truncate">{{story.name}}</h5>
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
  mounted() {
    /*
    this.$axios.get("http://localhost/queryStory").then(response => {
      console.log(response.data);
    }).catch(error => {
      console.log(error);
    });
    */
  },
  components:{
    
  },
  data(){
    return{
      channels: this.$resource.bookList,
    }
  },
  methods: {
    more(channel){
      localStorage.setItem('cachedChannel', JSON.stringify(channel))
      this.$router.push({path: 'StoryList'})
    },
    goToStoryMenu(item) {
      if(item.type === 'audio'){
        localStorage.setItem('cachedStory', JSON.stringify(item))
        this.$router.push({ path: '/StoryMenu' });
      }else if(item.type === 'pdf'){
        localStorage.setItem('cachedBook', JSON.stringify(item))
        this.$router.push({ path: '/PDFMenu'});
      }
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
    justify-content: space-evenly;
    text-align: center;
    margin-bottom: 40px;
    .card {
      max-width: 40vw;
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
    font-size: 5vw;
  }
}
</style>
