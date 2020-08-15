<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
                  :is-checked="isSelectAll"
                  class="check-nav"
                  @click.native="checkClick"/>
      <span>全选</span>
    </div>

    <div class="price">
      合计: {{totalPrice}}
    </div>

    <div class="calculate" @click="caluClick">
      结算: {{checkLength}}
    </div>
  </div>
</template>

<script>
import CheckButton from '@/components/content/checkButton/CheckButton'

import { mapGetters } from 'vuex'

export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  data() {
    return {
      aaa: true
    }
  },
  computed: {
    ...mapGetters(['cartList']),
    // 计算属性中 合计算法
    totalPrice() {
      return '￥' + this.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },
    checkLength() {
      return this.cartList.filter(item => item.checked).length
    },
    isSelectAll() {
     if (this.cartList.length === 0) return false // 必须添加的判断条件
    // 1.使用filter方法

    // return !(this.cartList.filter(item => !item.checked).length)
    //  2.使用find方法
    // return !this.cartList.find(item => !item.checked)

    for (let item of this.cartList) {
      if (!item.checked) {
        return false
        }
      }
      return true
    }
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) { // 全部选中的情况下
      // 将所有的改变成不选中
        this.cartList.forEach(item => item.checked = false)
      } else { // 全部不选中的情况下
      // 将所有改变成选中
        this.cartList.forEach(item => item.checked = true)
      }
    },
    caluClick() {
      // 在购物车中没有购买商品时点击出现的弹窗
      if (!this.isSelectAll) {
        this.$toast.show('请选择购买的商品', 2000)
       }
       // else {
      //   this.$toast.show('请结算' + this.totalPrice , 2000)
      // }


    }
  }
}
</script>

<style scoped>
.bottom-bar {
  position: relative;
  display: flex;

  height: 40px;
  line-height: 40px;

  background-color: #eee;
}

.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}

.check-nav {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}

.price {
  margin-left: 20px;
  flex: 1;
}

.calculate {
   width: 90px;
   background: red;
   color: #fff;
   text-align: center;
}

</style>
