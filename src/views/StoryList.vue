<template>
  <div class="body">
    <div class="container">
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
          <div
            class="carousel-item"
            v-for="(item, index) in this.channel.list"
            :key="index"
            :class="{ active: index === 0 }"
            data-bs-interval="3000"
          >
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
        <ListItem :item="item" @click="goToStoryMenu(item)" />
      </div>
    </div>
  </div>
</template>

<script>
import ListItem from '../components/ListItem.vue'

export default {
  name: 'myHome',
  components: {
    ListItem
  },
  mounted() {
    const queryChannel = JSON.parse(localStorage.getItem('cachedChannel'))
    this.channel = queryChannel
  },
  data() {
    return {
      channel: ''
    }
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    goToStoryMenu(item) {
      if (item.type === 'audio') {
        localStorage.setItem('cachedStory', JSON.stringify(item))
        this.$router.push({ path: '/StoryMenu' })
      } else if (item.type === 'pdf') {
        localStorage.setItem('cachedBook', JSON.stringify(item))
        this.$router.push({ path: '/PDFMenu' })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.body {
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  min-height: 100vh;
  background-color: white;
  padding-bottom: 10vw;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
}

.container {
  width: 100%;
  min-height: 100vh;
  background-color: #fff;
  font-family: 'MyFont', sans-serif;
  padding: 0;
  box-sizing: border-box;
}

.head {
    position: sticky;
    top: 0;
    z-index: 10;
    padding: 1.5rem 2rem;
    background-color: rgba(221, 139, 16, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;

    .back-btn {
      position: absolute;
      left: 1rem;
      background-color: rgba(255, 255, 255, 0.6);
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      font-size: 1rem;
      color: saddlebrown;
      box-shadow: 0 2px 4px rgba(0, 128, 0, 0.2);
      backdrop-filter: blur(4px);
      cursor: pointer;
      transition: 0.3s ease;
    }

    .name {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      font-size: 1.4rem;
      color: brown;
      font-weight: bold;
      white-space: nowrap;
    }
  }

.carousel {
  max-width: 500px;
  margin: 0 auto;
  border-radius: 2vw;
  overflow: hidden;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);

  .carousel-inner {
    width: 100%;
    .carousel-item {
      width: 100%;
      aspect-ratio: 16 / 16;

      .carousel-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
    }
  }

  .carousel-indicators {
    bottom: 1.5vw;
    button {
      width: 1.8vw;
      height: 1.8vw;
      border-radius: 50%;
      margin: 0 0.8vw;
      background-color: #ccc;

      &.active {
        background-color: #ef6b2e;
      }
    }
  }

  .carousel-control-prev-icon,
  .carousel-control-next-icon {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 50%;
    padding: 1vw;
  }
}

.list {
  margin-bottom: 3vw;
  border-bottom: 1px solid #ddd;
}

@media screen and (max-width: 768px) {
  .head {
    height: 12vw;
    max-height: none;

    .back-btn {
      font-size: 4vw;
      padding: 2vw 4vw;
    }

    .name {
      font-size: 5.5vw;
    }
  }
}
</style>
