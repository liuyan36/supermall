<template>
<!---->
  <div class="wrapper" ref="wrapper">
    <div class="centent">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    // 1.创建一个BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    })

    // 2.监听滚动的位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on('scroll', (position) => {
      // console.log(position)
      this.$emit('scroll', position)
      })
    }

    this.scroll.refresh()  // 图片用完调用refresh

    // 3.监听上拉加载更多,scroll滚动底部
    if (this.pullUpLoad) {
      this.scroll.on('pullingUp', () => { // pullingUp(上拉下拉加载之类的用法)
      // console.log('上啦加载更多')
      this.$emit('pullingUp')
    })
    }
  },
  methods: {
    scrollTo(x, y, time=300) {
      this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time)
    },
    refresh() {
      this.scroll && this.scroll.scrollTo && this.scroll.refresh()
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>

<style scoped>

</style>
