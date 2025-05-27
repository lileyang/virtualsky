<template>
  <div class="body">
    <div class="head">
      <button class="back-btn" @click="goBack">返回</button>
      <div class="name">{{ this.channel.name }}</div>
    </div>
    <div id="carouselExampleRide" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button
          v-for="(item, index) in this.channel.list"
          :key="index"
          type="button"
          data-bs-target="#carouselExampleRide"
          :data-bs-slide-to="index"
          :class="{ active: index === 0 }"
          :aria-current="index === 0 ? 'true' : undefined"
          :aria-label="'Slide ' + (index + 1)"
        ></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item" v-for="(item, index) in this.channel.list" :key="index" :class="{ active: index === 0}" data-bs-interval="3000">
          <img 
            :src="item.img" 
            class="carousel-img d-block w-100" 
            @click="goToStoryMenu(item)"
          />
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
    <div class="list" v-for="(item, index) in this.channel.list" :key="index">
      <ListItem :item="item" @click="goToStoryMenu(item)"></ListItem>
    </div>
  </div>
</template>

<script>
import ListItem from '../components/ListItem.vue'
export default {
  name: 'myHome',
  components:{
    'ListItem': ListItem
  },
  mounted(){
    const queryChannel = JSON.parse(localStorage.getItem('cachedChannel'))
    this.channel = queryChannel
  },
  data(){
    return{
      channel: ''
    }
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    goToStoryMenu(item) {
      console.log('gogogo')
      if(item.type === 'audio'){
        localStorage.setItem('cachedStory', JSON.stringify(item))
        this.$router.push({ path: '/StoryMenu' });
      }else if(item.type === 'pdf'){
        localStorage.setItem('cachedBook', JSON.stringify(item))
        this.$router.push({ path: '/BookMenu'});
      }
    }
  }
}
</script>


<style lang="less" scoped>
.body {
  width: 100vw;
  height: calc(100vh - 10vw);
  background-color: white;
  overflow-y: auto;
}

.carousel {
  .carousel-item {
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    width: 100vw;
    height: 100vw;

    .carousel-img {
      width: 100vw;
      height: 100vw;
      object-fit: cover;
    }
  }
  
  .card{
    width: 100vw;
    height: 20vh;
    background-color: pink;
    text-align: center;
  }
}

.head {
    position: relative;
    font-family: 'MyFont';
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
</style>
