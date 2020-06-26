<template>
  <div class="cart">
    <!--导航-->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{lenth}})</div>
    </nav-bar>
    <!--商品列表-->
    <cart-list />
    <!--底部汇总-->
    <cart-bottom-bar />
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'

import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'


import {mapGetters} from 'vuex'

  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {
      // 两种语法 数组函数和对象函数，分别映射出来
      // ...mapGetters([
      //   'cartLength',
      //   'cartList'
      // ])
      ...mapGetters({
        lenth: 'cartLength',
        list: 'cartList'
      })
    }
  }
</script>

<style scoped>
.cart {
  height: 100vh;
}
.nav-bar {
  background-color: #ff5777;
  color: #ffffff;
  /* font-weight: 700; */
}
</style>
