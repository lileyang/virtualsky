<template>
  <div class="body">
    <div id="carouselExampleRide" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="carouselExampleIndicators" data-bs-slide-to="0" class="active"
          aria-current="true" aria-label="Slide 1"></button>
        <!-- <button type="button" data-bs-target="carouselExampleIndicators" data-bs-slide-to="1"
          aria-label="Slide 2"></button>
          <button type="button" data-bs-target="carouselExampleIndicators" data-bs-slide-to="2"
          aria-label="Slide 3"></button>
          <button type="button" data-bs-target="carouselExampleIndicators" data-bs-slide-to="3"
          aria-label="Slide 4"></button> -->
      </div>
      <div class="carousel-inner">
        <div class="carousel-item" v-for="(item, index) in items" :key="index" :class="{ active: index === 0}" data-bs-interval="3000">
          <img :src="item.img" class="carousel-img d-block w-100" />
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
    <div class="list" v-for="(item, index) in items" :key="index">
      <ListItem :item="item"></ListItem>
    </div>
  </div>
</template>

<script>
import ListItem from '../components/ListItem.vue'
export default {
  name: 'myHome',
  props: ['url'],
  components:{
    'ListItem':ListItem
  },
  data(){
    return{
      items:[
        {type:'pdf', name:"哆啦A梦", img:require("@/assets/img/pdf/哆啦A梦.jpg"), detail:"大雄，一个学习也不好、运动也不行、自由散漫的小学生。一天，来自22世纪的猫型机器人“哆啦A梦”来到了他的身边。哆啦A梦会从肚子上的四次元口袋里拿出各种各样的“秘密道具”来帮助大雄，可有时竟也会因为大雄的得意忘形以及哆啦A梦冒冒失失的性格，最终演变成异想天开的结局。", update:"2025-07-28", list: [{name:'1',content:[{name:'上',file:'1_0.pdf'},{name:'中',file:'1_1.pdf'},{name:'下',file:'1_2.pdf'}]}]}
      ]
      //items:[{}]
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
</style>
