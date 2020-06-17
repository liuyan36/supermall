import {debounce} from '@/common/uttilts'
import BackTop from '@/components/content/backtop/BackTop'

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
      isShowBscroll: true,
    }
  },
  components: {
    BackTop
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0)
      console.log('1111111')
    },
    listBackTop(position) {
      this.isShowBscroll = -position.y > 1000
    }
  }
}
