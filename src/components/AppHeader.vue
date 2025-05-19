<template>
    <div class="header">
        <div class="icon">
        </div>
        <div class="title" @click="goPage('/Home')">
        {{ title }}
        </div>
        <div class="search" @click="showAlert('搜索功能还不能使用')">
            <span class="iconfont icon-icon-test"></span>
            <span>点击搜索你想要的</span>
            
        </div>
        <div class="user iconfont icon-user-circle"></div>
    </div>
</template>

<script>
export default {
    props: {
        title: String
    },
    methods:{
        showAlert(msg){
            alert(msg)
        },
        goPage(path){
            if (this.$route.path !== path) {
                this.$router.push(path);
                sessionStorage.setItem('storyScrollY', 0)
            }   
        },
    }
}
</script>

<style lang="less" scoped>

.header {
    z-index: 100;
    display: flex;
    width: 100vw;
    height: 10vw;
    background-color: rgb(245, 245, 245);
    line-height: 10vw;
    
    .icon {
        flex: 1;
        height: 8vw;
        width: 8vw;
        line-height: 10vw;
        margin: 1vw;
        background-image: url('../assets/icon/web-icon.png');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
    }
    
    .title {
        flex: 3;
        height: 10vw;
        width: 20vh;
        font-size: 5vw;
        color: green;
        font-weight: 800;
        font-family: 'MyFont', sans-serif;
    }
    .search {
        flex: 5;
        width: 64vw;
        height: 8vw;
        margin: 1vw;
        border-radius: 8vw;
        border-width: 1px;
        border-color: green;
        border-style: solid;
        background-color: white;
        
        display: flex; /* 加flex */
        align-items: center; /* 竖向居中 */
        padding-left: 10px; /* 可选，加点内边距 */
        font-family: 'MyFont', sans-serif;
        color: green;
        span:nth-child(1) {
            font-size: 6vw;
            margin-right: 8px; /* 图标和文字隔开一点 */
        }
        span:nth-child(2) {
            font-size: 4vw;
        }
    }
    .user{
        flex: 1;
        font-size: 7.2vw;
        color:saddlebrown;
    }

    
}


</style>