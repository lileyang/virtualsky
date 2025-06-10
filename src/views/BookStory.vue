<template>
  <div class="app">
    <div class="bg" :style="{ backgroundImage: 'url(' + story.img + ')' }"></div>
    <button class="back-btn" @click="goBack">返回</button>
    <div class="story-name">{{ story.name }}</div>
    
    <!-- <audio controls :src="audioSrc"></audio> -->
    <div class="story-text"></div>

    <div class="custom-audio-player">
      <audio ref="audio" :src="audioSrc" preload="metadata" playsinline></audio>

      <div class="audio">
        <button @click="onUserPlay" class="play-btn">
          {{ isPlaying ? '⏸️' : '▶️' }}
        </button>
        <input
          type="range"
          min="0"
          :max="duration"
          step="0.1"
          v-model="currentTime"
          @input="onSeek"
          class="slider"
        />
        <span class="time-text">{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</span>
      </div>
    </div>
    <div class="toast" v-if="toastMessage">{{ toastMessage }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      story: {},
      context: '',
      storyName: '',
      fileName: '',
      img: '',
      audioSrc: '',
      isPlaying: false,
      currentTime: 0,
      duration: 0,
      toastMessage: '',
    }
  },
  mounted() {
    this.story = JSON.parse(localStorage.getItem('cachedbookstory'))
    
    this.loadAudio()

    fetch(this.story.file)
    .then(res => res.text())
    .then(text => {
      this.renderFormattedText(text)
    })

    this.$nextTick(() => {
      const audio = this.$refs.audio
      if (audio) {
        audio.addEventListener('loadedmetadata', () => {
          this.duration = audio.duration
        })
        audio.addEventListener('timeupdate', () => {
          this.currentTime = audio.currentTime
        })

        audio.addEventListener('ended', this.onAudioEnded)
        audio.addEventListener('play', () => {
          this.isPlaying = true
        })
        audio.addEventListener('pause', () => {
          this.isPlaying = false
        })
      }
    })
  },
  methods: {
    renderFormattedText(raw) {
      const container = document.querySelector('.story-text')
      const lines = raw.split('\n').filter(line => line.trim() !== '')
      const html = lines.map(line => {
        // 中文段落居左，英文居中，加粗标题
        if (line.includes('题目')) {
          return `<h3 class="subtitle">${line}</h3>`
        } else if (/^[A-Za-z\s“”',.’-]+$/.test(line)) {
          return `<p class="en">${line}</p>`
        } else {
          return `<p class="cn">${line}</p>`
        }
      }).join('\n')
      container.innerHTML = html
    },
    loadAudio() {
      if (!this.story) return

      this.audioSrc = this.story.audio

      this.$nextTick(() => {
        const audio = this.$refs.audio
        if (audio) {
          audio.load()
        }
      })
    },
    onUserPlay() {
      const audio = this.$refs.audio
      if (audio) {
        if (audio.paused) {
          audio.play()
        } else {
          audio.pause()
        }
      }
    },
    onSeek() {
      const audio = this.$refs.audio
      if (audio) {
        audio.currentTime = this.currentTime
      }
    },
    formatTime(sec) {
      const m = Math.floor(sec / 60)
      const s = Math.floor(sec % 60)
      return `${m}:${s < 10 ? '0' + s : s}`
    },
    goBack() {
      this.$router.back()
    },
    showPlayTip(msg) {
      this.toastMessage = msg
      clearTimeout(this.toastTimeout)
      this.toastTimeout = setTimeout(() => {
        this.toastMessage = ''
      }, 2000)
    },

  }

}

</script>

<style lang="less" scoped>
.app {
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
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
  box-shadow: 0 4px 8px rgba(0, 128, 0, 0.2);
  backdrop-filter: blur(4px);
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 2;
}

.back-btn:hover {
  background-color: rgba(255, 255, 255, 0.9);
  transform: scale(1.05);
}

.story-name{
  margin-bottom: 4vw;
  font-size: larger;
  font-weight: 800;
  color: brown;
}

.mid-layout {
  display: flex;
  width: 100vw;
  justify-content: space-evenly;
  .btn{
    margin: auto 0;
    width: 16vw;
    height: 16vw;
    background-color: rgba(255, 255, 255, 0.1);
    border: none;
    padding: 10px 16px;
    border-radius: 8px;
    font-size: 16px;
    color: green;
    box-shadow: 0 4px 8px rgba(0, 128, 0, 0.2);
    backdrop-filter: blur(4px);
    cursor: pointer;
    transition: all 0.3s ease;
  }
}

.icon {
  width: 50vw;
  height: 50vw;
  border-radius: 20px;
  object-fit: cover;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
  z-index: 2;
}
.icon:hover {
  transform: scale(1.05);
}

/* 自定义播放器样式 */
.custom-audio-player {
  margin-top: 8vh;
  width: 80vw;
  min-width: 80vw;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4vw;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(6px);
  padding: 4vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2vw;
  position: relative;
  z-index: 10;
}

.play-btn {
  background: none;
  border: none;
  font-size: 4vw;
  height: 6vw;
  cursor: pointer;
  flex-shrink: 0;
}

.time-text {
  font-size: 3vw;
  color: #333;
  white-space: nowrap;
  flex-shrink: 0;
}

.slider {
  flex-grow: 1;
  appearance: none;
  height: 2vw;
  background: #ccc;
  border-radius: 1vw;
  touch-action: pan-y;
  outline: none;
  -webkit-tap-highlight-color: transparent;
}

/* 滑块样式 */
.slider::-webkit-slider-thumb {
  appearance: none;
  width: 4vw;   /* 适当调大滑块直径 */
  height: 4vw;
  background: green;
  border-radius: 50%;
  cursor: pointer;
  margin-top: 0px; /* 让滑块垂直居中，计算方式：-(滑块高度 - 轨道高度)/2 */
}

/* Firefox 下的滑块 */
.slider::-moz-range-thumb {
  width: 4vw;
  height: 4vw;
  background: green;
  border-radius: 50%;
  cursor: pointer;
  border: none;
}

.audio {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  flex-wrap: nowrap;
  overflow: hidden;
}

.toast {
  display: block;
  position: fixed;
  width: 80vw;
  bottom: 50vh;
  left: 50%;
  transform: translateX(0%);
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  padding: 2vw 4vw;
  border-radius: 4vw;
  font-size: 4vw;
  z-index: 999;
  animation: fade-in-out 2s ease-in-out;
}

@keyframes fade-in-out {
  0% { opacity: 0; transform: translateX(-50%) translateY(10px); }
  10% { opacity: 1; transform: translateX(-50%) translateY(0); }
  90% { opacity: 1; }
  100% { opacity: 0; transform: translateX(-50%) translateY(10px); }
}

.story-text {
  max-height: 50vh;
  overflow-y: auto;
  background: rgba(255, 255, 255, 0.1);
  padding: 1vw;
  border-radius: 4vw;
  box-shadow: 0 6px 12px rgba(0,0,0,0.1);
  font-size: 4vw;
  line-height: 1.8;
  color: #333;
  margin-bottom: 1vh;
  z-index: 100;
}

.story-text p {
  margin: 2vw 0;
}

.story-text .en {
  text-align: left;
  font-style: italic;
  color: #2c3e50;
}

.story-text .cn {
  text-align: left;
  font-weight: 500;
  color: #444;
}

.story-text .subtitle {
  font-size: 5vw;
  font-weight: bold;
  color: #8e44ad;
  text-align: center;
  margin: 4vw 0;
}


</style>
