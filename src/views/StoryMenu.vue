<template>
    <div class="story">
      <img class="img" :src="story.img" alt="">
      <div class="title">目录({{ story.list.length }})</div>
      <div class="menu">
        <div class="sub" v-for="(item, index) in story.list" :key="index">
          <span @click="playAudio(index)">{{ item }}</span>
          <!-- <audio :ref="'audio' + index" controls :src="getAudioSrc(item)"></audio> -->
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        story: {},
      };
    },
    mounted() {
      this.story = this.$route.query.story;
      console.log(this.story);
    },
    methods: {
      getAudioSrc(fileName) {
        // Webpack 打包静态资源时需加 .default
       // return require('@/assets/audio/植物大战僵尸之山河之旅/' + fileName + '.m4a').default;
       return fileName
      },
      playAudio(index) {
        const audio = this.$refs['audio' + index];
        if (audio && audio.play) {
          audio.play();
        }
      },
    },
  };
  </script>
  

<style lang="less" scoped>
.story{
    background-color: rgb(255, 255, 255);
    font-family: 'MyFont', sans-serif;
    width: 100vw;
    //height: 100vh;
    overflow-y: auto;
    .img{
        width: 100vw;
    }
    .title{
        background-color: lightseagreen;
        padding: 4vw 0 4vw 4vw;
        font-size: 6vw;
        color: white;
    }
    .menu{
        padding: 0vw 4vw 4vw 4vw;
        height: 100%;
        .sub{
            color: rgb(51, 51, 51);
            padding: 4vw 4vw 4vw 0vw;
            border-style: solid;
            border-width: 0 0 1px 0;
            border-bottom-color: rgb(243, 244, 245);
            span{
                line-height: calc(6vw + 4vh);
            }
        }
    }
}
    


</style>