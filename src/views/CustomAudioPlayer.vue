<template>
  <div class="custom-audio-player">
    <audio ref="audio" :src="audioSrc" @loadedmetadata="onLoaded" @timeupdate="onTimeUpdate" @ended="onEnded" />

    <!-- 播放 / 暂停 按钮 -->
    <button @click="togglePlay">{{ isPlaying ? '⏸️' : '▶️' }}</button>

    <!-- 时间显示 -->
    <span>{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</span>

    <!-- 进度条 -->
    <input
      type="range"
      min="0"
      :max="duration"
      step="0.1"
      v-model="currentTime"
      @input="onSeek"
    />
  </div>
</template>


<script>

export default {
  props: ['audioSrc'],
  data() {
    return {
      isPlaying: false,
      currentTime: 0,
      duration: 0
    }
  },
  methods: {
    togglePlay() {
      const audio = this.$refs.audio
      if (this.isPlaying) {
        audio.pause()
      } else {
        audio.play()
      }
      this.isPlaying = !this.isPlaying
    },
    onLoaded() {
      this.duration = this.$refs.audio.duration
    },
    onTimeUpdate() {
      this.currentTime = this.$refs.audio.currentTime
    },
    onSeek() {
      this.$refs.audio.currentTime = this.currentTime
    },
    onEnded() {
      this.isPlaying = false
      this.currentTime = 0
    },
    formatTime(time) {
      const m = Math.floor(time / 60)
      const s = Math.floor(time % 60)
      return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
    }
  }
}

</script>

<style lang="less" scoped>
.custom-audio-player {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  padding: 12px;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

input[type="range"] {
  flex: 1;
  height: 6px;
  border-radius: 5px;
  background: #ccc;
  appearance: none;
}

input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  height: 14px;
  width: 14px;
  background: green;
  border-radius: 50%;
  cursor: pointer;
}


</style>