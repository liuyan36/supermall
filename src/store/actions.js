import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutationsType'

export default {
  addToCart(context, payload) {
    return new Promise((resolve, reject) => {
       // payload新添加的 商品
    // let oldProduct = null
    // for (let item of state.cartList) {
    //   if (ittem.iid === payload.iid) {
    //     oldProduct = item
    //   }
    // }
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

    // 2.判断oldPrice
    if(oldProduct) { // 数量+1
      context.commit(ADD_COUNTER, oldProduct)
      resolve('当前商品数量加 1')
    } else { // 添加新的商品
        payload.count = 1
        // context.state.cartList.push(payload)
        context.commit(ADD_TO_CART, payload)
        resolve('添加新的商品')
      }
    })
  }
}
