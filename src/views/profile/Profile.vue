<template>
  <div class="profile">
    <nav-bar class="center"><div slot="center">个人中心</div></nav-bar>
    <list-view></list-view>
    <user-info></user-info>
  </div>
</template>

<script>
import NavBar from '../../components/common/navbar/NavBar'

import ListView from './childComps/ListView'
import UserInfo from './childComps/UserInfo'


export default {
  name: "ProFile",
  components: {
    NavBar,
    ListView,
    UserInfo

  }
}
</script>

<style scoped>
.profile {
  height: 100vh;
}
.center {
  background-color: #FF69B4;
  color: #fff;
}
</style>
