<template>
    <div class="good-list">
      <good-list-item v-for="item in goods" :key="item.image" :good-item="item"/>
    </div>
</template>

<script>
  import GoodListItem from "./goodsListItem"
  export default {
    name: "GoodsList",
    props:{
        goods:{
            type:Array,
            default() {
                return []
            }
        }
    },
    components:{
      GoodListItem
    }
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
