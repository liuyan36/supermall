import {request} from './request'

export function getCategory() {
  return request({
    url: '/category'
  })
}

export function getSubcategory(maitKey) {
  return request({
    url: '/subcategory',
    params: {
      maitKey
    }
  })
}

export function getCategoryDetail(miniWallkey, type) {
  return request({
    url: '/subcategory/detail',
    params: {
      miniWallkey,
      type
    }
  })
}


// export class List {
//   constructor(list) {
//     this.title = list.title
//     this.acm = list.acm
//     this.maitKey = list.maitKey
//     this.miniWallkey = list.miniWallkey
//   }
// }
