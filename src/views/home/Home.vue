<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"/>
  </div>

</template>

<script>
  import NavBar from '@/components/common/navbar/NavBar'
  import HomeSwiper from './childComps/HomeSwiper'

  import {getHomeMultidata} from '@/network/home'
  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper
    },
    data () {
      return {
        // result: null
        banners: [],
        recommends: []
      }
    },

    created() {
     // 1.请求多个数据
       getHomeMultidata().then(res => {
         console.log(res)
        //  this.result = res
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
       })
     }
  }
 </script>

<style scoped>
  .home-nav {
    background-color:#FF69B4;
    color:#F8F8FF;
  }
</style>
