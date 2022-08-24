<script setup>
import { ref, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import { useCartStore } from '../../stores/cart.js'
import { useUiStore } from '../../stores/ui.js'

const cartStore = useCartStore()
const uiStore = useUiStore()

const { carts } = storeToRefs(cartStore)
const { deleteItemCart } = cartStore
const { priceFormat } = uiStore

const itemCount = ref([])

watchEffect(() => {
  if (cartStore.carts.length) {
    itemCount.value = cartStore.carts[0].items
  } else {
    itemCount.value = cartStore.carts
  }
})
</script>

<template>
  <div class="absolute hidden p-1 top-13 right-0 z-50 max-w-sm group-hover:flex w-full ">
    <div class="border p-2 rounded-lg shadow bg-white w-full overflow-hidden max-h-96 overflow-y-auto">
      <div v-if="itemCount.length <= 0">
        <img
          src="../../assets/img/cart/empty_cart.webp"
          alt="Empty Cart"
        >
      </div>
      <div v-if="itemCount.length > 0">
        <div class="flex justify-between items-center">
          <a href="#">Keranjang ({{ itemCount.length }})</a>
          <a href="#">Lihat Semua</a>
        </div>
        <div v-if="carts.length">
          <div
            v-for="(item, index) in carts[0].items"
            :key="item.productId"
            :index="index"
            class="border-t border-cloudy py-1 my-1 flex overflow-hidden space-x-4"
          >
            <router-link to="/carts">
              <img
                :src="cartStore.getImageInCart(item.productId)"
                alt="Product"
                class="max-w-[80px] max-h-[60px]"
              >
            </router-link>
            <router-link
              to="/carts"
              class="w-1/2"
            >
              <p class="truncate font-bold text-sm">
                {{ item.product_name }}
              </p>
              <p class="truncate font-thin text-secondary text-sm leading-3 py-1">
                {{ priceFormat(item.price) }} x {{ item.quantity }}
              </p>
            </router-link>
            <div class="w-1/3">
              <h5 class="truncate text-sm py-1">
                {{ priceFormat(item.price*item.quantity) }}
              </h5>
              <button
                class="text-danger py-1 text-[12px]"
                @click="deleteItemCart(item.productId)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
