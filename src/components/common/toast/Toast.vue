<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  props: {
    // message: {
    //   type: String,
    //   default: ''
    // },
    // show: {
    //   type:Boolean,
    //   default: false
    // }
  },
  data() {
    return {
      message: '',
      isShow: false
    }
  },
  methods: {
    show(message, duration=1500) {
      // 默认时间  查看duration有没有时间

      this.isShow = true
      this.message = message

      setTimeout(() => {
        this.isShow = false
        this.message = ''
      }, duration)
      console.log(this.message)
    }
  }
}
</script>

<style scoped>
.toast {
  position: fixed;

  font-size: 20px;
  top: 50%;

  z-index: 999;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px 10px;

  color: #fff;
  background-color: rgba(0, 0, 0, .5);
}

</style>
