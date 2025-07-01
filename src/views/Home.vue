<template>
  <div class="body">
    <div class="container">
      <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="true">
        <div class="carousel-inner">
          <div class="carousel-item active" data-bs-interval="2000">
            <img src="img/wel3.jpg" class="d-block w-100">
          </div>
          <div class="carousel-item" data-bs-interval="2000">
            <img src="img/wel1.jpg" class="d-block w-100">
          </div>
          <div class="carousel-item" data-bs-interval="3000">
            <img src="img/wel2.jpg" class="d-block w-100">
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>

      <div class="channel" v-for="(channel, channelIndex) in channels" :key="channelIndex">
        <div class="lable">
          <span>{{ channel.title }}</span>
          <span class="more" @click="more(channel)">更多 ></span>
        </div>
        <div class="lable-content">
          <div 
            class="card" 
            v-for="(story, index) in channel.title !='在线漫画' ?channel.list.slice(-3).reverse() : channel.list.slice(0,3)" 
            :key="index"
            @click="goToStoryMenu(story)">
            <img :src="story.img" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title text-truncate">{{ story.name }}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'myHome',
  props: ['url'],
  data() {
    return {
      channels: this.$resource.bookList,
    };
  },
  async created() {
    /*
    try {
      // token 持久化校验接口（你需确保后端已提供 /api/user/check）
      const res = await this.$http.get('http://172.16.0.93:8080/api/user/check');
      console.log('Token 有效，用户信息：', res.data);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        alert('登录已过期，请重新登录');
        localStorage.removeItem('token');
        this.$router.push('/login');
      } else {
        console.error('其它错误：', err);
      }
    }
    */
  },
  methods: {
    more(channel) {
      localStorage.setItem('cachedChannel', JSON.stringify(channel));
      this.$router.push({ path: 'StoryList' });
    },
    goToStoryMenu(item) {
      if (item.type === 'audio') {
        localStorage.setItem('cachedStory', JSON.stringify(item));
        this.$router.push({ path: '/StoryMenu' });
      } else if (item.type === 'pdf') {
        localStorage.setItem('cachedBook', JSON.stringify(item));
        this.$router.push({ path: '/PDFMenu' });
      }
    },
  }
};
</script>

<style lang="less" scoped>
.body {
  width: 100%;
  background-color: whitesmoke;
  padding-bottom: 5vw;

  .container {
    width: 90vw;
    margin: 0 auto;
  }

  .lable {
    color: brown;
    font-family: 'MyFont';
    font-size: 5vw;
    display: flex;
    justify-content: space-between;
    padding: 1vw 0;
    margin-top: 2vw;
    border-bottom: 0.3vw solid #ddd;
  }

  .more {
    color: rgb(235, 79, 18);
    cursor: pointer;
    font-size: 5vw;
  }

  .lable-content {
    display: flex;
    justify-content: space-between;
    margin-top: 1vw;
    gap: 1vw;
  }

  .card {
    width: 28vw;
    color: saddlebrown;
    cursor: pointer;
    border: none;
    background-color: #fff;
    box-shadow: 0 0 0.5vw rgba(0,0,0,0.1);
    transition: transform 0.3s;

    &:hover {
      transform: scale(1.03);
    }
  }

  .card-img-top {
    width: 100%;
    height: auto;
  }

  .card-body {
    background-color: wheat;
    padding: 1vw;
    border-radius: 0 0 0.5vw 0.5vw;
    justify-items: center;
  }

  .card-title {
    color: #c24d1faf;
    font-family: 'MyFont';
    font-size: 1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1rem;
  }
}

.carousel {
  margin: 0.2vw 0.2vw;
  border-radius: 2vw;
  overflow: hidden;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);

  .carousel-inner {
    width: 100%;
    .carousel-item {
      width: 100%;
      aspect-ratio: 16 / 9;

      .carousel-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
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
</style>
