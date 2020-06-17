import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutationsType'

export default {
  addToCart(context, payload) {
    // payload新添加的 商品
    // let oldProduct = null
    // for (let item of state.cartList) {
    //   if (ittem.iid === payload.iid) {
    //     oldProduct = item
    //   }
    // }
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

    // 2.判断oldPrice
    if(oldProduct) {
      context.commit(ADD_COUNTER, oldProduct)
    } else {
      payload.count = 1
      // context.state.cartList.push(payload)
      context.commit(ADD_TO_CART, payload)
    }
  }
}
