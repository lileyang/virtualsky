<template>
  <div class="app">
    <div class="bg" :style="{ backgroundImage: 'url(' + img + ')' }"></div>
    <button class="back-btn" @click="goBack">返回</button>
    <div class="story-name">{{ fileName }}</div>
    <div class="mid-layout">
      <button class="btn" @click="playPrev">⬅</button>      
      <img class="icon" :src="img" />
      <button class="btn" @click="playNext">➡</button>
    </div>
    
    <!-- <audio controls :src="audioSrc" autoplay></audio> -->

    <div class="custom-audio-player">
      <audio ref="audio" :src="audioSrc" preload="metadata" autoplay playsinline></audio>

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
      <div class="timer-setting">
      <label for="stop-timer">定时停止：</label>
      <select id="stop-timer" v-model.number="selectedStopOption" @change="setStopTimer">
        <option :value="0">不设置</option>
        <option :value="5">5分钟</option>
        <option :value="10">10分钟</option>
        <option :value="30">30分钟</option>
        <option :value="60">60分钟</option>
        <option :value="-1">本集播放完后停止</option>
      </select>
    </div>

    </div>
    <div class="toast" v-if="toastMessage">{{ toastMessage }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      context: '',
      storyName: '',
      fileName: '',
      fileType: 'm4a',
      series: '',
      img: '',
      audioSrc: '',
      isPlaying: false,
      currentTime: 0,
      duration: 0,
      playList: [],   // 播放列表
      currentIndex: 0,// 当前播放的索引
      toastMessage: '',   // ✅ Toast 内容
      toastTimeout: null,  // ✅ Toast 定时器
      stopTimer: null,
      stopOptions: [0, 5, 10, 30, 60, -1],  // 分钟数，-1 表示播放完当前一集后停止
      selectedStopOption: 0
    }
  },
  mounted() {
    const query = this.$route.query
    this.img = query.img
    this.storyName = query.storyName
    this.fileName = query.file
    this.fileType = query.fileType
    this.series = query.series
    this.playList = JSON.parse(query.list || '[]')
    this.currentIndex = this.playList.indexOf(this.fileName)
    this.loadAudio()

    this.$nextTick(() => {
      const audio = this.$refs.audio
      if (audio) {
        audio.addEventListener('loadedmetadata', () => {
          this.duration = audio.duration
        })
        audio.addEventListener('timeupdate', () => {
          this.currentTime = audio.currentTime
        })
        /*audio.addEventListener('ended', () => {
          this.isPlaying = false
          this.currentTime = 0
          this.playNext() // 播放下一集
        })*/
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
    loadAudio() {
      if (!this.storyName || !this.fileName) return

      // 使用 public 下的路径，public 目录在运行时映射为根路径
      this.audioSrc = `/audio/${this.series}/${this.storyName}/${this.fileName}.${this.fileType}`

      this.$nextTick(() => {
        const audio = this.$refs.audio
        if (audio) {
          audio.load()
          audio.play().catch(err => {
            console.warn('自动播放失败：', err)
            this.showPlayTip('点击播放音频')
          })
        }
      })
    },
    playPrev() {
      if (this.currentIndex > 0) {
        this.currentIndex-- 
        this.fileName = this.playList[this.currentIndex]
        this.loadAudio()
      } else {
        this.showPlayTip('已经是第一集')
      }
    },
    playNext() {
      if (this.currentIndex + 1 < this.playList.length) {
        this.currentIndex++
        this.fileName = this.playList[this.currentIndex]
        this.loadAudio()
      } else {
        this.showPlayTip('播放完毕：已到最后一集')
      }
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
    // 设置定时停止播放
    setStopTimer() {
      clearTimeout(this.stopTimer)

      if (this.selectedStopOption === 0) {
        this.showPlayTip('定时取消')
        return
      }

      if (this.selectedStopOption === -1) {
        this.showPlayTip('本集播放完后停止')
        return
      }

      const minutes = this.selectedStopOption
      this.stopTimer = setTimeout(() => {
        const audio = this.$refs.audio
        if (audio && !audio.paused) {
          audio.pause()
          this.showPlayTip('播放已停止')
          this.selectedStopOption = 0
        }
      }, minutes * 60 * 1000)

      this.showPlayTip(`将在 ${minutes} 分钟后停止播放`)
    },

    // 修改 ended 行为以支持本集结束不再自动播放下一集
    onAudioEnded() {
      if (this.selectedStopOption === -1) {
        this.showPlayTip('本集播放完毕，已停止')
        return // 不播放下一集
      }
      this.playNext()
    }
  }

}

</script>

<style lang="less" scoped>
.app {
  width: 100vw;
  min-height: 100vh;
  background: #f8f5f1;
  position: relative;
  font-family: 'Helvetica Neue', sans-serif;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  max-width: 960px;
  margin: 0 auto;
}

.bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-position: center;
  filter: blur(20px) brightness(0.8);
  opacity: 0.35;
  z-index: 0;
}

.back-btn {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 10;
  background-color: rgba(255, 255, 255, 0.4);
  color: #3e2723;
  font-weight: bold;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 30px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.back-btn:hover {
  background-color: #fff;
  transform: scale(1.05);
}

.story-name {
  margin-top: 80px;
  font-size: 24px;
  font-weight: 700;
  color: #4e342e;
  text-align: center;
  z-index: 1;
}

.mid-layout {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 40px 0;
  width: 100%;
  z-index: 1;

  .btn {
    width: 50px;
    height: 50px;
    font-size: 20px;
    background-color: rgba(255, 255, 255, 0.5);
    border: none;
    border-radius: 50%;
    color: #3e2723;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    transition: all 0.2s ease;
    cursor: pointer;
  }

  .btn:active {
    transform: scale(0.95);
  }
}

.icon {
  width: 50%;
  height: 50%;
  border-radius: 16px;
  object-fit: cover;
  box-shadow: 0 6px 16px rgba(0,0,0,0.2);
  transition: transform 0.3s ease;
}

.icon:hover {
  transform: scale(1.05);
}

.custom-audio-player {
  margin-top: 30px;
  background: linear-gradient(135deg, rgba(255,255,255,0.7), rgba(255,255,255,0.4));
  border-radius: 16px;
  backdrop-filter: blur(12px);
  padding: 20px;
  width: 100%;
  box-shadow: 0 8px 18px rgba(0,0,0,0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.audio {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 10px;
}

.play-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.slider {
  appearance: none;
  flex: 1;
  height: 6px;
  background: #cfd8dc;
  border-radius: 3px;
  outline: none;
}

.slider::-webkit-slider-thumb {
  appearance: none;
  width: 14px;
  height: 14px;
  background: #4caf50;
  border-radius: 50%;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 14px;
  height: 14px;
  background: #4caf50;
  border-radius: 50%;
  border: none;
}

.time-text {
  font-size: 14px;
  white-space: nowrap;
  color: #333;
}

.timer-setting {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;
  align-items: center;
  font-size: 14px;
  color: #3e2723;

  select {
    font-size: 14px;
    padding: 4px 8px;
    border-radius: 6px;
    border: 1px solid #aaa;
    background-color: #fff;
  }
}

.toast {
  position: fixed;
  bottom: 40vh;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.65);
  color: #fff;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 16px;
  z-index: 9999;
  animation: fade-in-out 2s ease-in-out;
}

@keyframes fade-in-out {
  0% { opacity: 0; transform: translateX(-50%) translateY(10px); }
  10% { opacity: 1; transform: translateX(-50%) translateY(0); }
  90% { opacity: 1; }
  100% { opacity: 0; transform: translateX(-50%) translateY(10px); }
}

@media screen and (max-width: 600px) {
  .story-name {
    font-size: 5vw;
  }
  .icon {
    width: 40vw;
    height: 40vw;
    border-radius: 4vw;
  }
  .btn {
    width: 14vw !important;
    height: 14vw !important;
    font-size: 6vw !important;
  }
  .play-btn {
    font-size: 6vw;
  }
  .time-text,
  .timer-setting,
  .timer-setting select {
    font-size: 3.8vw;
  }
  .custom-audio-player {
    padding: 5vw;
  }
}
</style>
