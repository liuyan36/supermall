import {debounce} from '@/common/uttilts'
import BackTop from '@/components/content/backtop/BackTop'
import {POP, NEW, SELL} from "./const";

export const itemListenetMixin = {
  data() {
    return {
      itemimglistener: null
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh)

    this.itemimglistener = () => {
     refresh()
    }
    this.$bus.$on('imgLoad', this.itemimglistener)
  }
}
// 混入吸顶，点击图片吸顶回到顶部
export const backTopMixin = {
  data() {
    return {
      isShowBscroll: false, // 开启时是需要关闭的
    }
  },
  components: {
    BackTop
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0)
    },
    listBackTop(position) {
      this.isShowBscroll = -position.y > 1000
    }
  }
}

export const tabControlMixin = {
  data: function () {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
      console.log(this.currentType);
    }
  }
}

