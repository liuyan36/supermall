<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <scroll class="centent">
      <home-swiper :banners="banners"/>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature/>
      <tab-control :titles="['流行', '新款', '精选']"
                  class="tab-control"
                  @tabClick="tabClick">
      </tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import Feature from './childComps/Feature'

  import NavBar from '@/components/common/navbar/NavBar'
  import TabControl from '@/components/content/tabControl/tabControl'
  import GoodsList from '@/components/content/goods/goodsList'
  import Scroll from '@/components/content/scroll/Scroll'

  import {getHomeMultidata,getHomeGoods} from '@/network/home'
  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      Feature,
      TabControl,
      GoodsList,
      Scroll
    },
    data () {
      return {
        // result: null
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop'
      }
    },
    created() {
     // 1.请求多个数据
     this.getHomeMultidata()
     // 2.请求商品数据
     this.getHomeGoods('pop')
     this.getHomeGoods('new')
     this.getHomeGoods('sell')
     },
     computed: {
       showGoods() {
         return this.goods[this.currentType].list
       }
     },
     methods: {
       /*
       事件相关
       */
        tabClick(index) {
          switch(index) {
            case 0:
              this.currentType = 'pop'
              break
            case 1:
              this.currentType = 'new'
              break
            case 2:
              this.currentType = 'sell'
              break
          }
        },
       /*
       网络请求相关的
        */
       getHomeMultidata() {
         getHomeMultidata().then(res => {
         console.log(res)
        //  this.result = res
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
        })
       },
       getHomeGoods(type) {
         const page = this.goods[type].page + 1
          getHomeGoods(type, page).then(res => {
            console.log(res)
            this.goods[type].list.push(...res.data.list)
            // console.log(this.goods[type].list)
            this.goods[type].page += 1
          })
        }
      }
    }
 </script>

<style scoped>
  #home {
    padding-top: 41px;
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color:#FF69B4;
    color:#F8F8FF;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
  .tab-control {
    position: sticky;
    top: 43px;
    z-index: 9;
  }
  /* .content {
    overflow: hidden;

    position: absolute;
    top: 41px;
    bottom: 43px;
    left: 0;
    right: 0;
  } */
  .centent {
    height: calc(100% - 49px);
    overflow: hidden;
  }
</style>
