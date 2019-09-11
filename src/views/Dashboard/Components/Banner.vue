<template>
    <div class="banner_container">
        <el-carousel :interval="4000" type="card" height="350px">
            <el-carousel-item v-for="item in pictureList" :key="item">
                <div class="medium picture_item" :style="{'background':'url(' + item + ')'}"></div>
            </el-carousel-item>
        </el-carousel>
    </div>

</template>

<script>
export default {
    data(){
        return{
            pictureList:['https://233.calamus.xyz/5.jpg','https://233.calamus.xyz/2.jpg','https://233.calamus.xyz/3.jpg','https://233.calamus.xyz/4.jpg','https://233.calamus.xyz/1.jpg']
        }
    }
}
</script>


<style lang="scss" scoped>
.banner_container{
    padding:1rem 10px 0 10px;
}
  .picture_item{
    height: 350px;
    width:100%;
    color: #fff;
    margin: 0;
    background-size: cover;
    background-position: center;
  }
</style>