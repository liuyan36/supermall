<template>
  <div class="tab-txet">
    <div class="noe">
      <span @click="btnClick">登录/</span>
      <span @click="binClick">注册</span>
    </div>
  </div>
</template>

<script>

export default {
  name: "TabTxet",
  components: {
  },
  methods: {
    btnClick() {
      console.log('aaa')
    },
    binClick() {
      console.log('11111')
    }
  }
}
</script>

<style scoped>
.tab-txet {
  height: 20%;
  display: flex;
  border: 1px solid red;
  background-color: #FF69B4;
}
.noe {
  margin-left: 25%;
  margin-top: 12%;
  font-size: 23px;
  color: #fff;
  font-weight: 700
}
</style>
