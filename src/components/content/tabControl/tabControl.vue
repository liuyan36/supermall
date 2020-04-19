<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles"
         class="tab-control-item"
        :key="index"
        :class="{active: index === countIndex}"
        @click="tabClick(index)">
    <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "tabControl",
  data() {
    return {
      countIndex: 0
    }
  },
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    tabClick(index) {
      this.countIndex = index
      this.$emit('tabClick', index)
    }
  }
}
</script>

<style>
  .tab-control {
    display: flex;
    text-align: center;
    font-size: 17px;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
  }
  .tab-control-item {
    flex: 1;
  }
  .tab-control span {
    padding:5px 5px 6px 5px;
  }
  .active {
    color: rosybrown;
  }
  .active span {
    border-bottom: 3px solid salmon;
  }
</style>
