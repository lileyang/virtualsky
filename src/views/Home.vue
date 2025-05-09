<template>
  <div class="body">
    <div id="carouselExampleRide" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="carouselExampleIndicators" data-bs-slide-to="0" class="active"
          aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="carouselExampleIndicators" data-bs-slide-to="1"
          aria-label="Slide 2"></button>
        <button type="button" data-bs-target="carouselExampleIndicators" data-bs-slide-to="2"
          aria-label="Slide 3"></button>
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
        {name:"植物大战僵尸之飞跃侏罗纪", img:require("@/assets/img/book/飞跃侏罗纪.png"), detail:"糟糕，戴夫被困在侏罗纪了!植物们决定前去营救这位老朋友。坐上“破烂者号”飞跃车，豌豆射手、金盏花、仙桃和大嘴花穿越到了遥远的中生代。在侏罗纪的森林里，他们居然遇见了会吐冰的莱索托龙和会喷火的近蜥龙。究竟是未知的神秘物种，还是离奇的基因变异?植物们经过一番探索，终于在海底发现了一处秘密基地", update:"2025-05-8", list: ['01 奇怪的蟑螂','02 求救电话','03 寻找线索','04 下定决心','05 破烂者号','06 变身过山车','07 穿越时空隧道','08 沼泽遇险_上','09 沼泽遇险_下','10 发现恐龙','11 遇见莱索托龙','12 如此包扎','13 寒冰之气','14 意想不到的危机','15 误会一场','16 偷袭','17 幕后高手','18 钢铁桃子','19 无人机','20 基因变异','21 伪装计划','22 抓捕 攻击性强的恐龙','23 棱背龙的防御系统','24 水陆两用装甲车','25 混入海底城堡','26 话痨相逢','27 恐龙的血液','28 出师未捷','29 水滴石穿','30 戴夫卡住了','31 通风管道大逃生','32 从天而降的救兵','33 大战冰脊龙','34 逃之夭夭','35 邪恶计划','36 建造穿越轨道','37 离开侏罗纪','38 毁灭植物镇？','39 僵尸变异啦','40 紧急撤退','41 戴夫回来了！','42 狼狈的僵尸博士']}
      ]
      //items:[{}]
    }
  }
}
</script>

<style lang="less" scoped>
.body {
  width: 100vw;
  height: calc(100vh - 22vw);
  background-color: white;
  overflow-y: auto;
}

.carousel {
  .carousel-item {
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    width: 100vw;
    height: 50vw;

    .carousel-img {
      width: 100vw;
      height: 50vw;
      object-fit: cover;
      /* 或 contain，看需求 */
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
