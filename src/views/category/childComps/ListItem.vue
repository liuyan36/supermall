<template>
  <grid-view class="good-list">
    <list-item-goods v-for="(item, index) in goodsList" :key="index" :goods="item"></list-item-goods>
  </grid-view>
</template>

<script>
  import GridView from '../../../components/common/gridView/GridView'
  import ListItemGoods from './ListItemGoods'

  export default {
    name: "GoodsList",
    components: {
      GridView,
      ListItemGoods
    },
    props: {
      goodsList: {
        type: Array,
        default: []
      }
    },
  }
</script>

<style scoped>
.good-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  padding: 2px;
}

</style>
