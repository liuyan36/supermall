import Toast from './Toast'

const Obj = {}

  Obj.install = function (Vue) {
    // document.body.appendChild(Toast.$el)
    // 1.创建组件构造器
    const toastConTrustor = Vue.extend(Toast)

    // 2.new的伐毛换髓解耦，根据组件构造器，可以创建出来一个组件对象
    const toast = new toastConTrustor()

    // 3.将组件对象，手动挂载到某一个元素上
    toast.$mount(document.createElement('div'))

    // 4.toast.$el对应的就是div了
    document.body.appendChild(toast.$el)

    Vue.prototype.$toast = toast
  }

export default Obj
