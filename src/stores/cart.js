import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import api from '../apis/cart'
import { useProductStore } from './product'
import { useUserStore } from './user'
import { useUiStore } from './ui'
import router from '../router'

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
      product_id: productStore.singleProduct.id,
      sku: productStore.singleProduct.sku,
      barcode: productStore.singleProduct.barcode,
      product_name: productStore.singleProduct.product_name,
      slug: productStore.singleProduct.slug,
      price: productStore.singleProduct.price,
      weight: productStore.singleProduct.weight,
      quantity: productStore.singleProduct.quantity,
      tax: productStore.singleProduct.tax
    }

    return api.saveItems(item).then(response => {
      const jsonResponse = response.data.data
      this.carts = jsonResponse
      uiStore.loading = false
    }).catch(error => {
      uiStore.loading = false
      console.log(error)
    })
  }

  function setItemCarts () {
    return api.getItems().then(response => {
      const jsonResponse = response.data.data
      this.carts = jsonResponse
    }).catch(error => {
      console.log(error)
    })
  }

  function deleteItemCart (id) {
    uiStore.loading = true
    const data = { product_id: id, cart_id: this.carts[0].id }
    return api.deleteItem(data).then(response => {
      const jsonResponse = response.data
      if (jsonResponse.code === 200) {
        for (let i = 0; i < this.carts[0].items.length; i++) {
          if (this.carts[0].items[i].productId === id) {
            this.carts[0].items.splice(i, 1)
          }
        }
      }
      uiStore.loading = false
    }).catch(error => {
      uiStore.loading = false
      console.log(error)
    })
  }

  function updateQuantity (productId, quantity) {
    uiStore.loading = true
    const data = { cart_id: this.carts[0].id, product_id: productId, quantity }
    return api.updateQty(data).then(response => {
      uiStore.loading = false
    }).catch(error => {
      uiStore.loading = false
      console.log(error)
    })
  }

  function incrementItemCart (id) {
    for (let index = 0; index < this.carts[0].items.length; index++) {
      if (this.carts[0].items[index].productId === id) {
        this.carts[0].items[index].quantity++
      }
    }
  }

  function decrementItemCart (id) {
    for (let index = 0; index < this.carts[0].items.length; index++) {
      if (this.carts[0].items[index].productId === id) {
        if (this.carts[0].items[index].quantity <= 1) {
          return 1
        } else {
          this.carts[0].items[index].quantity--
        }
      }
    }
  }

  function getImageInCart (productId) {
    const img = productStore.products.find(e => {
      return e.id === productId
    })
    return productStore.imgUrl + img.product_images[0].path
  }

  function checkout () {
    const param = this.carts[0].id
    if (userStore.user.address === null) {
      uiStore.addressAlert = true
      setTimeout(() => {
        uiStore.addressAlert = false
      }, 3000)
    } else {
      router.push(`/delivery/${param}`)
    }
  }

  return { carts, addItemToCart, setItemCarts, deleteItemCart, cartIsExist, updateQuantity, incrementItemCart, decrementItemCart, getImageInCart, checkout }
})
