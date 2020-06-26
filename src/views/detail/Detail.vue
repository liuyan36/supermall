<template>
  <div id="detail">
    <detail-nav-bar  class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScorll"> <!--拿到这个函数的scroll中的refresh-->
      <!--属性： topImages 传入值： top-images-->
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/> <!--这个地方接收imageLoad函数方法-->
      <detail-props ref="params" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommend"/>
    </scroll>
    <detail-botton-bar @addToCart="addToCart"/>
    <back-top @click.native="backClick" v-show="isShowBscroll"/>
    <!-- <toast :message="message" :show="show"/> -->
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailProps from './childComps/DetailProps'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottonBar from './childComps/DetailBottonBar'

import Scroll from '@/components/common/scroll/Scroll'
import GoodsList from '@/components/content/goods/goodsList'
// import Toast from '@/components/common/toast/Toast'

import {getDetail, Goods, Shop, GoodsParam, getRecommend} from '../../network/detail'
import {debounce} from '@/common/uttilts'
import {itemListenetMixin, backTopMixin} from '@/common/mixin'
import {mapActions} from 'vuex'

export default {
  name: "Detail",
  mixins:[
    itemListenetMixin,
    backTopMixin
  ],
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailProps,
    DetailCommentInfo,
    GoodsList,
    DetailBottonBar,
    // Toast
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommend: [],
      themeTopYs: [],
      currentIndex: 0,
      // message: '',
      // show: false
    }
  },
  created() {
    // 保存传入的iid
    this.iid = this.$route.params.iid

    // 根据我们的iid请求数据
    getDetail(this.iid).then(res => {
      console.log(res)
      const data = res.result

    // 获取顶部轮播图片
      this.topImages = res.result.itemInfo.topImages


    // 获取我们的商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

    // 创建店铺信息对象
      this.shop = new Shop(data.shopInfo)

    //  保存商品的详情数据
      this.detailInfo = data.detailInfo

    // 获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

    // 取出我们的评论信息
      if (data.rate.cBate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    })

    // 3.请求推荐数据
    getRecommend().then(res => {
      this.recommend = res.data.list
    })
  },
  mounted() {
  },
  destroyed() {
    this.$bus.$off('imgLoad', this.itemimglistener)
  },
  methods: {
    ...mapActions(['addToCart']),

    imageLoad() {
      this.$refs.scroll.refresh()
      this.themeTopYs = []

      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      this.themeTopYs.push(Number.MAX_VALUE)
    },
    titleClick(index) {
       this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
    },
    contentScorll(position) {
      // 获取y值
      const positionY = -position.y

      // positionY和主题中值进行比较
      // [0, 3217, 4062, 4347]

      // positionY在 0 到 3217之间，index = 0
      // positionY在 3217 到 4062之间， index = 1
      // positionY在 4062 到 4347之间， index = 2
      // positionY在 4347 到 Number.MAX_VALUE之间， index = 3

      // positionY 大于等于 4347的值， index = 3
      let length = this.themeTopYs.length
      for (let i = 0; i < length-1; i++) {
        if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
          this.currentIndex = i
          this.$refs.nav.currenIndex = this.currentIndex
        }
      }
      // 点击后回到顶部
      this.listBackTop(position)
    },
    // addToCarl() {
    //   // 1.获取购物车展示需要的信息
    //   const product = {}
    //   product.image = this.topImages[0]
    //   product.title = this.goods.title
    //   product.desc = this.goods.desc
    //   product.price = this.goods.realPrice
    //   product.iid = this.iid

    //   console.log(product)
    //   // 2.将我们的商品加入购物车
    //   this.$store.commit('addCart', product)
    // }
    addToCart(){
      // 获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid

      // 2.将商品添加到购物车里
      // this.$store.commit('addToCart', product)
      // 使用map来映射
      // this.addToCart(product).then(res => {
      //   console.log(res)
      // })
      this.$store.dispatch('addToCart', product).then(res => {
        //  this.show = true
        //  this.message = res

        //  setTimeout(() => {
        //    this.show = false
        //    this.message = ''
        //  }, 1500)

        this.$toast.show(res)
       })
    }
  }
}
</script>

<style scoped>
  #detail {
   position: relative;
   z-index: 9;
   height: 100vh;
   background-color: #fff;
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {

    position: absolute;
    top: 41px;
    bottom: 43px;
    left: 0;
    right: 0;
 }

</style>
