
<template>
  <div class="list-card" @click="$emit('click')">
    
    <div class="info">
      <img :src="item.img" alt="封面" class="list-img" />
      <div class="title">{{ item.name }}</div>
      <div class="type-tag">{{ getTypeText(item.type) }}</div>
    </div>
    <div class="desc">{{ item.detail }}</div>  
  </div>
</template>

<script>
export default {
  name: 'ListItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    getTypeText(type) {
      switch (type) {
        case 'audio': return '音频故事'
        case 'pdf': return '图文绘本'
        default: return '未知类型'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.list-card {
  background-color: #fffdf8;
  border-radius: 2vw;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: 3vw;
  transition: transform 0.2s ease;
  cursor: pointer;
  &:active {
    transform: scale(0.98);
  }

  .desc {
      margin-left: 1rem;
      font-size: 1rem;
      color: rgba(120, 120, 120, 0.8);
    }

  .list-img {
    margin: 0 auto;
    width: 8rem;
    height: 8rem;
    border-radius: 0.5rem;
    object-fit: cover;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }

  .info {
    flex: 1;
    margin-left: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .title {
      text-align: center;
      font-size: 1.5rem;
      font-weight: bold;
      color: #4d2e10;
      margin-bottom: 1vw;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .type-tag {
      font-size: 0.8rem;
      color: #a36b2d;
      background-color: #fff1db;
      display: inline-block;
      padding: 0.5vw 1.5vw;
      border-radius: 1vw;
      width: fit-content;
      margin: 0 auto;
    }
  }
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
    font-size: 0.8rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 0.8rem;
    margin:0.4rem;
  }

</style>
