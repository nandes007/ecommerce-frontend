import { defineStore } from 'pinia'
import api from '../apis/product'
import { useCartStore } from './cart'

export const useProductStore = defineStore('useProductStore', {
  state: () => ({
    imgUrl: 'http://127.0.0.1:8000/storage/',
    products: [],
    singleProduct: {},
    item: { quantity: 1 }
  }),

  actions: {
    quantityIncrement () {
      this.singleProduct.quantity++
    },
    quantityDecrement () {
      if (this.singleProduct.quantity <= 1) {
        this.singleProduct.quantity = 1
      } else {
        this.singleProduct.quantity--
      }
    },
    getAllProducts () {
      return api.getProducts().then(response => {
        this.products = response.data.data
      })
    },

    getProduct (slug) {
      const cartStore = useCartStore()
      this.item.quantity = 1
      const selected = this.products.filter(e => {
        return e.slug === slug
      })
      if (cartStore.carts.length) {
        const isItemExist = cartStore.carts[0].items.filter(e => {
          return e.slug === slug
        })
        if (isItemExist.length) {
          for (let i = 0; i < cartStore.carts[0].items.length; i++) {
            if (cartStore.carts[0].items[i].slug === slug) {
              this.item.quantity = cartStore.carts[0].items[i].quantity
            }
          }
        }
      }
      this.singleProduct = Object.assign({}, ...selected, this.item)
    },

    isImageExists (product) {
      console.log(product)
      if (product.product_images.length) {
        return this.imgUrl + product.product_images[0].path
      } else {
        return './src/assets/img/dummy.png'
      }
    }
  }
})
