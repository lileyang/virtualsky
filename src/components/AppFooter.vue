<template>
    <div class="footer">
        <span @click="goPage('/Home')">
            首页
        </span>
        <span @click="showAlert('还未开放使用')">
            排行
        </span>
        <span @click="showAlert('还未开放使用')">
            更新
        </span>
        <span @click="showAlert('还未开放使用')">
            历史
        </span>
    </div>
</template>

<script>
export default {

    methods:{
        goPage(path){
            if (this.$route.path !== path) {
                this.$router.push(path);
                sessionStorage.setItem('storyScrollY', 0)
            }   
        },
        showAlert(msg){
            alert(msg)
        }
    }

}
</script>

<style lang="less" scoped>
.footer{
    display: flex;
    width: 100vw;
    height: 12vw;
    background-color: rgb(245, 245, 245);
    text-align: center;
    line-height: 12vw;
    justify-content: space-evenly;
    
    span{
        font-family: 'MyFont', sans-serif;
        font-size: 6vw;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        color: saddlebrown;
    }
}
</style>