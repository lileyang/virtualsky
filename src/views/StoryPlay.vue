<template>
    <div class="app">
      <div class="bg" :style="{ backgroundImage: 'url(' + img + ')' }"></div>
      <!-- 返回按钮 -->
      <button class="back-btn" @click="goBack">⬅ 返回</button>
      <img class="icon" :src="img" />
      <audio controls :src="audioSrc" autoplay></audio>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        audioSrc: '',
        img: ''
      }
    },
    mounted() {
      this.img = this.$route.query.img
      const storyName = this.$route.query.storyName
      const file = this.$route.query.file
      const relativePath = `./${storyName}/${file}.m4a`
  
      try {
        const context = require.context('@/assets/audio', true, /\.m4a$/)
        this.audioSrc = context(relativePath).default
      } catch (e) {
        console.warn('音频文件找不到：', relativePath)
      }
    },
    methods: {
      goBack() {
        this.$router.back()
      }
    }
  }
  </script>
  
  <style lang="less" scoped>
  .app {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: "Helvetica Neue", sans-serif;
    background: #f0f0f0;
    padding: 0 5vw;
  }
  
  .bg {
    position: fixed;
    top: calc(22vh);
    left: 0;
    width: 100vw;
    height: 100vh;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    filter: blur(16px);
    opacity: 0.3;
    z-index: 0;
  }
  .back-btn {
  position: absolute;
    top: 20px;
    left: 20px;
    background-color: rgba(255, 255, 255, 0.1);
    border: none;
    padding: 10px 16px;
    border-radius: 8px;
    font-size: 16px;
    color: green;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(4px);
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 2;
  }

  .back-btn:hover {
    background-color: rgba(255, 255, 255, 0.9);
    transform: scale(1.05);
  }
  
  .icon {
    width: 50vw;
    height: 50vw;
    border-radius: 20px;
    object-fit: cover;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
    margin-bottom: 8vh;
    transition: transform 0.3s ease;
  }
  
  .icon:hover {
    transform: scale(1.05);
  }
  
  audio {
    width: 80vw;
    max-width: 400px;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 12px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(6px);
    padding: 6px;
    outline: none;
  }
  </style>
  