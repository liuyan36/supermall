import {request} from './request'

export function getHomeMultidata() {
  return request ({
    url: '/home/multidata'
  })
}

export function getHomeGoods(type, page) {
  return request ({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}

// let tatolnums = []
// const nums1 = [10,20,30]
// const nums2 = [111,222,333]

// for (let n of nums1) {
//   totolnums.push(n)
// }

// totolnums.push(...nums1)
// 以此传递进去，已逗号分隔的形式
