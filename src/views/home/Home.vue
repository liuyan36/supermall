<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行', '新款', '精选']"
                  ref="tabControl1"
                  @tabClick="tabClick"
                  class="tab-control"
                  v-show="isTabFiexd"/> <!--将下面的tab-control复制一个放入在顶层然后使用v-show来隐藏和显示-->
    <scroll class="centent"
            ref="scroll"
            :probe-type="3"
            @scroll="contenScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperLoad="swiperLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature/>
      <tab-control :titles="['流行', '新款', '精选']"
                  ref="tabControl2"
                  @tabClick="tabClick"/>
      <goods-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBscroll"/> <!--
      在我们需要监听一个组件的原生事件时，必须给对应得的事件加上.native才能进行监听组件 -->
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import Feature from './childComps/Feature'

  import NavBar from '@/components/common/navbar/NavBar'
  import Scroll from '@/components/common/scroll/Scroll'
  import TabControl from '@/components/content/tabControl/tabControl'
  import GoodsList from '@/components/content/goods/goodsList'
  import BackTop from '@/components/content/backtop/BackTop'

  import {getHomeMultidata,getHomeGoods} from '@/network/home'
  import {debounce} from '@/common/uttilts'
  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      Feature,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
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
        currentType: 'pop',
        isShowBscroll: false,
        tabOffsetTop: 0,
        isTabFiexd: false,     // 用来判断是否吸顶
        savey: 0
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
     destroyed() {
       console.log('this  home')
     },
     activated() { // 进来时保存的位置
       this.$refs.scroll.scrollTo(0, this.savey, 0)
       // 滚动完后做一次刷新
       this.$refs.scroll.refresh()
     },
     deactivated() {
       // 设置完这个位置后，进来时会有ao
       console.log(this.$refs.scroll.getScrollY())
       this.savey = this.$refs.scroll.getScrollY()
     },
     mounted()  {
       // 1.图片加载完的事件监听
      const refresh = debounce(this.$refs.scroll.refresh)
      this.$bus.$on('imgLoad', () => {
       refresh()
      })
       // 2.获取tabControl的offsetTop
       // 所有的组件都有一个熟悉，$el:用于获取组件中的元素
      //  this.tabOffsetTop = this.$refs.tabControl.offsetTop
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
          this.$refs.tabControl1.countIndex = index   // 在tab-control中，使用那个吸顶效果的来 指定点击同步
          this.$refs.tabControl2.countIndex = index
        },
        backClick() {
          this.$refs.scroll.scrollTo(0, 0)
        },
        contenScroll(position) {
          // 判断我们的Bscroll是否显示
          this.isShowBscroll = (-position.y) > 1000 // 这个地方来判断y轴的地方  大于1000显示

          // 2.决定tabControl是否吸顶（position： fixed）
          this.isTabFiexd = (-position.y) > this.tabOffsetTop
        },
        loadMore() {
          this.getHomeGoods(this.currentType)
        },
        swiperLoad() {
          this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
        },
       /*
       网络请求相关的
        */
       getHomeMultidata() {
         getHomeMultidata().then(res => {
        //  this.result = res
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
        })
       },
       getHomeGoods(type) {
         const page = this.goods[type].page + 1
          getHomeGoods(type, page).then(res => {
            this.goods[type].list.push(...res.data.list)
            // console.log(this.goods[type].list)
            this.goods[type].page += 1

            // 完成上拉加载更多
            this.$refs.scroll.finishPullUp()
          })
        }
      }
    }
 </script>

<style scoped>
  #home {
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color:#FF69B4;
    color:#F8F8FF;
/*
    在使用浏览器原生滚动时，为了让我们的导航不跟随一起滚动
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }
  .tab-control {
    position: relative;
    z-index: 9;
  }
  /* .centent {
    overflow: hidden;

    position: absolute;
    top: 41px;
    bottom: 43px;
    left: 0;
    right: 0;
  } */
  .centent {
    /* height: calc(100% - 54px);
    overflow: hidden; */
    overflow: hidden;

    position: absolute;
    top: 41px;
    bottom: 43px;
    left: 0;
    right: 0;
  }
</style>
