<template>
  <div class="body">
    <div id="carouselExampleRide" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button
          v-for="(item, index) in items"
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
        {type:'pdf', name:"龙珠", img:require("@/assets/img/pdf/龙珠.jpg"), detail:"《龙珠》是日本漫画家鸟山明在《周刊少年JUMP》杂志上从1984年至1995年连载的少年漫画作品。是全世界被改编为游戏次数最多的漫画，从而载入吉尼斯世界纪录。", update:"2025-07-28", 
          list: [
            {name:'1',content:[{name:'上',file:'1_0.pdf'},{name:'中',file:'1_1.pdf'},{name:'下',file:'1_2.pdf'}]},
            {name:'2',content:[{name:'上',file:'2_0.pdf'},{name:'中',file:'2_1.pdf'},{name:'下',file:'2_2.pdf'}]},
            {name:'3',content:[{name:'上',file:'3_0.pdf'},{name:'中',file:'3_1.pdf'},{name:'下',file:'3_2.pdf'}]},
            {name:'4',content:[{name:'上',file:'4_0.pdf'},{name:'中',file:'4_1.pdf'},{name:'下',file:'4_2.pdf'}]},
            {name:'5',content:[{name:'上',file:'5_0.pdf'},{name:'中',file:'5_1.pdf'},{name:'下',file:'5_2.pdf'}]},
            {name:'6',content:[{name:'上',file:'6_0.pdf'},{name:'中',file:'6_1.pdf'},{name:'下',file:'6_2.pdf'}]},
            {name:'7',content:[{name:'上',file:'7_0.pdf'},{name:'中',file:'7_1.pdf'},{name:'下',file:'7_2.pdf'}]},
            {name:'8',content:[{name:'上',file:'8_0.pdf'},{name:'中',file:'8_1.pdf'},{name:'下',file:'8_2.pdf'}]},
            {name:'9',content:[{name:'上',file:'9_0.pdf'},{name:'中',file:'9_1.pdf'},{name:'下',file:'9_2.pdf'}]},
            {name:'10',content:[{name:'上',file:'10_0.pdf'},{name:'中',file:'10_1.pdf'},{name:'下',file:'10_2.pdf'}]},
          ]
        },
        {type:'pdf', name:"哆啦A梦", img:require("@/assets/img/pdf/哆啦A梦.jpg"), detail:"大雄，一个学习也不好、运动也不行、自由散漫的小学生。一天，来自22世纪的猫型机器人“哆啦A梦”来到了他的身边。哆啦A梦会从肚子上的四次元口袋里拿出各种各样的“秘密道具”来帮助大雄，可有时竟也会因为大雄的得意忘形以及哆啦A梦冒冒失失的性格，最终演变成异想天开的结局。", update:"2025-07-28", 
          list: [
            {name:'1',content:[{name:'上',file:'1_0.pdf'},{name:'中',file:'1_1.pdf'},{name:'下',file:'1_2.pdf'}]},
            {name:'2',content:[{name:'上',file:'2_0.pdf'},{name:'中',file:'2_1.pdf'},{name:'下',file:'2_2.pdf'}]},
            {name:'3',content:[{name:'上',file:'3_0.pdf'},{name:'中',file:'3_1.pdf'},{name:'下',file:'3_2.pdf'}]},
            {name:'4',content:[{name:'上',file:'4_0.pdf'},{name:'中',file:'4_1.pdf'},{name:'下',file:'4_2.pdf'}]},
            {name:'5',content:[{name:'上',file:'5_0.pdf'},{name:'中',file:'5_1.pdf'},{name:'下',file:'5_2.pdf'}]},
          ]},
        {type:'pdf', name:"IQ博士", img:require("@/assets/img/pdf/IQ博士.jpg"), detail:"《IQ博士》是鸟山明继《龙珠》前的成名作，连载于1980-1984年，奠定了其无厘头幽默风格。故事围绕则卷千兵卫博士发明的机器人阿拉蕾展开，她力大无穷但心智幼稚，与企鹅村的奇葩居民（如吃草莓的超人、尼可家大王等）共同制造混乱，讽刺了当时日本流行文化。‌‌", update:"2025-08-02", 
          list: [
            {name:'1',content:[{name:'上',file:'1_0.pdf'},{name:'中',file:'1_1.pdf'},{name:'下',file:'1_2.pdf'}]},
            {name:'2',content:[{name:'上',file:'2_0.pdf'},{name:'中',file:'2_1.pdf'},{name:'下',file:'2_2.pdf'}]},
            {name:'3',content:[{name:'上',file:'3_0.pdf'},{name:'中',file:'3_1.pdf'},{name:'下',file:'3_2.pdf'}]},
            {name:'4',content:[{name:'上',file:'4_0.pdf'},{name:'中',file:'4_1.pdf'},{name:'下',file:'4_2.pdf'}]},
            {name:'5',content:[{name:'上',file:'5_0.pdf'},{name:'中',file:'5_1.pdf'},{name:'下',file:'5_2.pdf'}]},
            {name:'6',content:[{name:'上',file:'6_0.pdf'},{name:'中',file:'6_1.pdf'},{name:'下',file:'6_2.pdf'}]},
            {name:'7',content:[{name:'上',file:'7_0.pdf'},{name:'中',file:'7_1.pdf'},{name:'下',file:'7_2.pdf'}]},
            {name:'8',content:[{name:'上',file:'8_0.pdf'},{name:'中',file:'8_1.pdf'},{name:'下',file:'8_2.pdf'}]},
            {name:'9',content:[{name:'上',file:'9_0.pdf'},{name:'中',file:'9_1.pdf'},{name:'下',file:'9_2.pdf'}]},
          ]},
        {type:'pdf', name:"灌篮高手", img:require("@/assets/img/pdf/灌篮高手.jpg"), detail:"《灌篮高手》是日本漫画家井上雄彦以高中篮球为题材的少年漫画，于《周刊少年Jump》1990年42号~1996年27号上连载，单行本在17个国家和地区发行。与《足球小将》和《棒球英豪》合称为日本运动漫画三大巅峰之作。‌‌", update:"2025-08-16", list: [{name:'1',content:[{name:'上',file:'1_0.pdf'},{name:'中',file:'1_1.pdf'},{name:'下',file:'1_2.pdf'}]}]},
        {type:'pdf', name:"棋魂", img:require("@/assets/img/pdf/棋魂.jpg"), detail:"《棋魂》（日语：ヒカルの碁，中文意义为“光的围棋”，“光之棋”）是日本《周刊少年JUMP》（集英社）连载的以围棋为题材的少年漫画。作者是堀田由美（ほったゆみ），漫画由小畑健绘制，并由日本棋院的女棋士梅泽由香里担当监修，‌", update:"2025-08-18", list: [{name:'1',content:[{name:'上',file:'1_0.pdf'},{name:'中',file:'1_1.pdf'},{name:'下',file:'1_2.pdf'}]}]},
        {type:'pdf', name:"浪客剑心", img:require("@/assets/img/pdf/浪客剑心.jpg"), detail:"《浪客剑心 -明治剑客浪漫谭-》（るろうに剣心 -明治剣客浪漫譚-）是日本漫画家和月伸宏于1994年—1999年在日本《周刊少年Jump》上连载的少年漫画，单行本旧版共28卷，完全版共22卷。截止到2020年，漫画单行本的累计发行量已突破7200万册。", update:"2025-08-28", list: [{name:'1',content:[{name:'上',file:'1_0.pdf'},{name:'中',file:'1_1.pdf'},{name:'下',file:'1_2.pdf'}]}]},
        
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
