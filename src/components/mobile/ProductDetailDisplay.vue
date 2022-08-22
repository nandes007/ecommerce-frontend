<script setup>
import PrimaryButton from '../PrimaryButton.vue'
import FavoriteButton from '../FavoriteButton.vue'
import { useProductStore } from '../../stores/product'
import { useCartStore } from '../../stores/cart.js'
import { useUiStore } from '../../stores/ui'

const productStore = useProductStore()
const cartStore = useCartStore()
const uiStore = useUiStore()

</script>

<template>
  <div class="fixed bottom-0 bg-white py-2 w-full flex lg:hidden container border-t border-cloudy justify-between max-w-screen-xl shadow-sm">
    <div class="flex py-2 justify-between w-full px-2 items-center">
      <form class="flex items-center space-x-1">
        <PrimaryButton
          :style="'text-xl font-bold flex items-center justify-center w-6 h-6'"
          @click="productStore.quantityDecrement()"
        >
          -
        </PrimaryButton>
        <input
          v-model="productStore.singleProduct.quantity"
          type="text"
          class="px-2 py-1 font-bold border-b border-secondary text-center w-12 focus:outline-none focus:border-primary"
          @keypress="uiStore.isNumber($event)"
        >
        <PrimaryButton
          :style="'text-xl font-bold flex items-center justify-center w-6 h-6'"
          @click="productStore.quantityIncrement()"
        >
          +
        </PrimaryButton>
      </form>
      <div class="flex space-x-4">
        <PrimaryButton @click="cartStore.addItemToCart()">
          + Keranjang
        </PrimaryButton>
        <FavoriteButton />
      </div>
    </div>
  </div>
</template>
