<template>
</template>

<script>
export default {
  name: "TabContent",
  components: {
    TabContentCategory,
    TabContentDetail
  },
  props: {
    subcategories: {
      type: Object,
      default() {
        return {}
      }
    },
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
