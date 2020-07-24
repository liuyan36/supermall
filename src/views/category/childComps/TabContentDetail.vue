<template>
  <grid-view>
    <list-item-goods v-for="(item, index) in categoryDetail" :key="index" :goods="item">
    </list-item-goods>
  </grid-view>
</template>

<script>
import GridView from '../../../components/common/gridView/GridView'
import ListItemGoods from './ListItemGoods'

export default {
  name: "tabContentDetail",
  components: {
      GridView,
      ListItemGoods
  },
  props: {
    categoryDetail: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>

</style>

