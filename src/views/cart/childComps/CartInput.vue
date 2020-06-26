<template>
  <div class="CartInput">
  </div>
</template>

<script>
export default {
  name: "CartInput",
  data() {
    return {
      aaa: true
    }
  },
  methods: {
    btnClick() {
      console.log('aaa')
    }
  }

}
</script>

<style scoped>
.CartInput {
  height: 50px;
  background-color: red;
  position: relative;
  bottom: 304px;
  left: 25%;
  width: 50%;
}

</style>
