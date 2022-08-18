import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import api from '../apis/cart'
import { useProductStore } from './product'
import { useUserStore } from './user'
import { useUiStore } from './ui'

export const useCartStore = defineStore('cartStore', () => {
  const productStore = useProductStore()
  const userStore = useUserStore()
  const uiStore = useUiStore()
  const carts = ref([])
  const cartIsExist = computed(() => {
    return this.carts.length
  })

  function addItemToCart () {
    uiStore.loading = true
    if (!userStore.isAuthenticated) {
      return uiStore.redirectLogin()
    }

    const item = {
      id: productStore.singleProduct.id,
      product_name: productStore.singleProduct.product_name,
      slug: productStore.singleProduct.slug,
      price: productStore.singleProduct.price,
      weight: productStore.singleProduct.weight,
      quantity: productStore.singleProduct.quantity,
      tax: productStore.singleProduct.tax
    }

    return api.saveItems(item).then(response => {
      const res = response.data.data
      this.carts = res
      uiStore.loading = false
    })
  }

  function setItemCarts () {
    return api.getItems().then(response => {
      const res = response.data.data
      this.carts = res
    })
  }

  function deleteItemCart (id) {
    uiStore.loading = true
    const data = { productId: id }
    return api.deleteItem(data).then(response => {
      if (response.status === 204) {
        for (let i = 0; i < this.carts[0].items.length; i++) {
          if (this.carts[0].items[i].productId === id) {
            this.carts[0].items.splice(i, 1)
          }
        }
      }
      uiStore.loading = false
    })
  }

  return { carts, addItemToCart, setItemCarts, deleteItemCart, cartIsExist }
})
