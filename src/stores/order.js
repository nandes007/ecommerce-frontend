import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRajaongkirStore } from './rajaongkir'
import { useUiStore } from './ui'
import { useCartStore } from './cart'
import api from '../apis/order'
import route from '../router'

export const useOrderStore = defineStore('orderStore', () => {
  const orders = ref([])
  const rajaongkirStore = useRajaongkirStore()

  const uiStore = useUiStore()
  const cartStore = useCartStore()

  function checkout () {
    uiStore.loading = true
    return api.store(rajaongkirStore.cost).then(() => {
      cartStore.carts = []
      uiStore.loading = false
      uiStore.orderAlert = true
      setTimeout(() => {
        uiStore.orderAlert = false
        route.push('/')
      }, 5000)
    })
  }

  return { orders, checkout }
})
