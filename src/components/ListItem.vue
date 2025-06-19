<template>
  <div class="list-card" @click="$emit('click')">
    <img :src="item.img" alt="封面" class="list-img" />
    <div class="info">
      <div class="title">{{ item.name }}</div>
      <div class="type-tag">{{ getTypeText(item.type) }}</div>
    </div>
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

  .list-img {
    width: 20vw;
    height: 20vw;
    min-width: 20vw;
    border-radius: 1vw;
    object-fit: cover;
    margin-right: 4vw;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }

  .info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .title {
      font-size: 4.5vw;
      font-weight: bold;
      color: #4d2e10;
      margin-bottom: 1vw;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .type-tag {
      font-size: 3.5vw;
      color: #a36b2d;
      background-color: #fff1db;
      display: inline-block;
      padding: 0.5vw 1.5vw;
      border-radius: 1vw;
      width: fit-content;
    }
  }
}

/* PC端样式：宽度较大、单位改为 px，更规整 */
@media screen and (min-width: 768px) {
  .list-card {
    border-radius: 12px;
    padding: 16px;

    .list-img {
      width: 120px;
      height: 120px;
      min-width: 120px;
      border-radius: 8px;
      margin-right: 20px;
    }

    .info {
      .title {
        font-size: 20px;
        margin-bottom: 8px;
      }

      .type-tag {
        font-size: 14px;
        padding: 4px 10px;
        border-radius: 6px;
      }
    }
  }
}
</style>
