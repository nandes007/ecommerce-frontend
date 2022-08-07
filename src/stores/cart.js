import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../apis/cart'
import { useProductStore } from './product'
import { useUserStore } from './user'
import { useUiStore } from './ui'

export const useCartStore = defineStore('cartStore', () => {
  const productStore = useProductStore()
  const userStore = useUserStore()
  const uiStore = useUiStore()
  const carts = ref([])

  function addItemToCart () {
    // const items = JSON.parse(localStorage.getItem('cart_items'))
    // if (items) {
    //   this.carts = items
    // }
    if (!userStore.isAuthenticated) {
      return uiStore.redirectLogin()
    }

    const item = {
      id: productStore.singleProduct.id,
      product_name: productStore.singleProduct.product_name,
      slug: productStore.singleProduct.slug,
      price: productStore.singleProduct.price,
      weight: productStore.singleProduct.weight,
      quantity: productStore.singleProduct.quantity
    }

    return api.saveItems(item).then(response => {
      // const res = JSON.parse(response.data.data)
      const res = response
      console.log(res)
      // this.carts.push(JSON.parse(res))
      // console.log(response.data.data)
    })

    // const isItemExist = this.carts.filter(e => {
    //   return e.id === productStore.singleProduct.id
    // })

    // if (isItemExist.length) {
    //   for (let i = 0; i < this.carts.length; i++) {
    //     if (this.carts[i].id === productStore.singleProduct.id) {
    //       this.carts[i].quantity = productStore.singleProduct.quantity
    //     }
    //   }
    // } else {
    //   this.carts.push(item)
    // }
    // localStorage.setItem('cart_items', JSON.stringify(this.carts))
    // console.log(this.carts)
  }

  function setItemCarts () {
    const items = JSON.parse(localStorage.getItem('cart_items'))
    if (items) {
      this.carts = items
    } else {
      this.carts = []
    }
  }

  return { carts, addItemToCart, setItemCarts }
})
