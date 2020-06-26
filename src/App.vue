<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view />
    </keep-alive>
    <main-tab-bar />
    <icom></icom>
    <svg-icon></svg-icon>
  </div>
</template>

<script>
import MainTabBar from './components/content/mainTabbar/MainTabBar'
import Icom from './components/content/Icon/Icon'
import SvgIcon from './components/content/Icon/svg'

export default {
  name: 'App',
  components: {
    MainTabBar,
    Icom,
    SvgIcon
  }
}
</script>

<style>
@import "assets/css/base.css"

</style>
