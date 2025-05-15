<template>
  <div class="body">
    <div id="carouselExampleRide" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="carouselExampleIndicators" data-bs-slide-to="0" class="active"
          aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="carouselExampleIndicators" data-bs-slide-to="1"
          aria-label="Slide 2"></button>
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
        {name:"金银岛", img:require("@/assets/img/book/金银岛.jpg"), detail:"《金银岛》的作者是英国的罗伯特·史蒂文森。故事的主人公是个十岁大的小男孩吉姆，他因为一个偶然的机会，得到了一张藏宝图。兴奋的小男孩决定和镇上的医生一同出海去一个小岛上寻找宝藏。他们还找来了一批水手，想让他们帮着一起去寻宝。后来，在这群寻宝人之间，发生了一系列惊险刺激的故事。", update:"2025-06-18",list:['故事1：奇怪的客人','故事2：神秘的水手箱','故事3：危险的旅店','故事4：油布包里的藏宝图','故事5：出发前的准备','故事6：瘸腿水手和黑狗','故事7：船长的担心','故事8：神秘的西尔弗','故事9：一场巨大的危机','故事10：看见小岛','故事11：偷偷上岛','故事12：荒岛探险','故事13：被流放的海盗','故事14：和伙伴重逢','故事15：一个新伙伴','故事16：紧张的登岛之旅','故事17：第一次交战','故事18：致命的危机','故事19：西尔弗来谈判了','故事20：寨子被攻击','故事21：胜利的代价','故事22：找到小船','故事23：砍断大船的缆绳','故事24：海上漂流','故事25：登上大船','故事26：吉姆船长','故事27：鹿死谁手','故事28：回到寨子','故事29：西尔弗投降','故事30：海盗内讧','故事31：医生来了','故事32：海盗寻宝','故事33：树林里的怪声','故事34：消失的宝藏','故事35：宝藏的下落','故事36：大结局']},
        {name:"神秘岛", img:require("@/assets/img/book/神秘岛.jpg"), detail:"《神秘岛》是法国科幻小说家儒勒·凡尔纳创作的长篇小说，是其三部曲的第三部。故事叙述在美国南北战争时期，几个被困在南军中的北方人，中途被风暴吹落在太平洋中的一个荒岛上，他们团结互助，建立起幸福的生活；直到格兰特船长的儿子罗伯尔所指挥的“邓肯号” 经过那里时，才把他们搭救。", update:"2025-07-08", list: ['神秘岛1：狂风中的氢气球','神秘岛2：有人不见了','神秘岛3：危险的逃跑计划','神秘岛4：小岛上的呼唤','神秘岛5：游到对岸','神秘岛6：叫“烟囱”的新家','神秘岛7：消失的火柴盒','神秘岛8：清点物资','神秘岛9：钓松鸡','神秘岛10：暴风雨来临','神秘岛11：沙丘里的秘密','神秘岛12：死里逃生','神秘岛13：神秘的脚印','神秘岛14：没有火，打猎有用么？','神秘岛15：登山探路','神秘岛16：征服者','神秘岛17：前面在冒烟','神秘岛18：造弓箭烧砖头','神秘岛19：测算小岛的位置','神秘岛20：快乐的铁匠','神秘岛21：托普和“美人鱼”搏斗','神秘岛22：发明炸药','神秘岛23：花岗岩宫殿','神秘岛24：改造新家','神秘岛25：珍贵的小麦种子','神秘岛26：一连串怪事','神秘岛27：神秘的箱子','神秘岛28：搜索落难人','神秘岛29：西海岸之旅','神秘岛30：发现老朋友','神秘岛31：入侵者','神秘岛32：新伙伴','神秘岛33：捕鲸船玛利亚号','神秘岛34：眺望岗被袭击','神秘岛35：森林里小木屋','神秘岛36：带回野人','神秘岛37：难以捉摸的野人','神秘岛38：野人的过去','神秘岛39：天大的遗憾','神秘岛40：有船来了','神秘岛41：登船计划','神秘岛42：和海盗开战','神秘岛43：集体撤退','神秘岛44：沉船之谜','神秘岛45：做好事的神秘人','神秘岛46：危机四伏的小岛','神秘岛47：和海盗搏斗','神秘岛48：又有坏消息','神秘岛49：眺望岗着火','神秘岛50：从天而降的神秘物','神秘岛51：再次探险','神秘岛52：发现海盗','神秘岛53：寻找神秘人','神秘岛54：神秘的电报','神秘岛55：原来是他！','神秘岛56：揭秘真相','神秘岛57：永远地告别','神秘岛58：火山喷发','神秘岛59：灭顶之灾','神秘岛60：陷入绝望','神秘岛61：大结局']}
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
    height: 100vw;

    .carousel-img {
      width: 100vw;
      height: 100vw;
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
