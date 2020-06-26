import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from 'fastclick'

import toast from './components/common/toast'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()
// 安装toast插件
Vue.use(toast)
// 解决移动客户端的300毫秒延迟
FastClick.attach(document.body)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
