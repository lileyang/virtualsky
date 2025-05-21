<template>
    <div class="item">
        <img :src="item.img" alt="">
        <div class="content" @click="openStory()">
            <div>{{ item.name }}</div>
            <div>{{ item.detail }}</div>
            <div>更新时间：<span>{{ item.update }}</span></div>
        </div>
    </div>
</template>

<script>

export default {
    props:['item'],
    methods:{
        openStory(){
            if(this.item.type === 'audio'){
                this.$router.push({ path: '/StoryMenu', query: { story: this.item } });
            }else if(this.item.type === 'pdf'){
                this.$router.push({ path: '/BookMenu', query: { book: this.item } });
            }
            
        }
    }
}
</script>

<style lang="less" scoped>
.item{
    display: flex;
    height: 15vh;
    margin: 1vh;
    border-radius: 8px;
    border-width: 1px;
    border-style: solid;
    border-color: sandybrown;
    font-family: 'MyFont', sans-serif;
    img{
        height: calc(15vh - 2px);
        width: calc(15vh - 2px);
        border-radius: 8px 0px 0px 8px;
    }
    .content {
        display: flex;
        flex-direction: column;
        margin-left: 8px;
        max-height: 100%;
        padding-right: 4px;
        :nth-child(1) {
            color: green;
        }
        :nth-child(2) {
            color: sandybrown;
            font-size: 12px;
            overflow: auto;
        }
        :nth-child(3){
            font-size: 12px;
            margin-top: 4px;
            margin-bottom: 4px;
            color: gray;
            span{
                color: lightgrey;
            }
        }
    }

}
</style>