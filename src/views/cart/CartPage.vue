<script setup>
import { computed, ref, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import NavbarComponent from '../../components/ui/NavbarComponent.vue'
import { useCartStore } from '../../stores/cart.js'
import { useUiStore } from '../../stores/ui.js'
import PrimaryButton from '../../components/PrimaryButton.vue'
import DeleteButton from '../../components/DeleteButton.vue'

const cartStore = useCartStore()
const uiStore = useUiStore()

const { carts } = storeToRefs(cartStore)
const { deleteItemCart } = cartStore
const { priceFormat } = uiStore

const totalPrice = computed(() => {
  let total = 0
  if (cartStore.carts.length) {
    if (cartStore.carts[0].items.length) {
      for (let i = 0; i < cartStore.carts[0].items.length; i++) {
        total += cartStore.carts[0].items[i].price * cartStore.carts[0].items[i].quantity
      }
    }
  }
  return total
})

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
  <div class="hidden lg:flex">
    <NavbarComponent />
  </div>
  <section class="flex justify-center h-full lg:pt-24">
    <div class="container max-w-screen-xl relative">
      <div class="w-full lg:w-2/3">
        <div class="absolute right-0 top-8 w-1/4 px-2 hidden lg:block">
          <div class="bg-white shadow-3xl px-4 rounded-lg py-2">
            <h5 class="my-4 py-1 border-b font-bold">
              Ringkasan Belanja
            </h5>
            <div class="flex justify-between text-secondary font-thin">
              <h4>Total Harga</h4>
              <p>{{ priceFormat(totalPrice) }}</p>
            </div>
            <div class="flex justify-between text-secondary font-thin">
              <h4>Total Diskon</h4>
              <p>0</p>
            </div>
            <div class="flex justify-between py-4 font-bold my-2 border-t">
              <h4>Total Harga</h4>
              <p>{{ priceFormat(totalPrice) }}</p>
            </div>
            <button class="w-full bg-primary py-3 font-bold text-2xl rounded-lg text-white">
              Beli
            </button>
          </div>
        </div>
        <div class="flex absolute lg:static w-full top-0 justify-between py-4 px-4 lg:px-0 lg:mx-6 bg-primary lg:bg-white lg:border-b lg:border-secondary">
          <div class="flex items-center font-bold lg:text-2xl">
            <span class="flex lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            <h5>Keranjang</h5>
          </div>
          <div class="flex lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>
        <div
          v-if="itemCount.length <= 0"
          class="pt-10"
        >
          <img
            src="../../assets/img/cart/empty_cart.webp"
            alt="Empty Cart"
          >
        </div>
        <div
          v-if="itemCount.length > 0"
          class="pb-20"
        >
          <div v-if="carts.length">
            <div
              v-for="(item, index) in carts[0].items"
              :key="item.productId"
              :index="index"
              class="px-2 py-2 lg:mx-6 mt-14 lg:mt-0 border-b border-cloudy w-full"
            >
              <div class="flex space-x-4">
                <router-link :to="{ path: `products/${item.productId}/${item.slug}` }">
                  <img
                    :src="cartStore.getImageInCart(item.productId)"
                    alt="Product Image"
                    class="w-full h-28 lg:h-44 inline"
                  >
                </router-link>
                <div>
                  <h5 class="line-clamp-2">
                    {{ item.product_name }}
                  </h5>
                  <h4 class="text-sm text-secondary">
                    {{ priceFormat(item.price) }} x {{ item.quantity }}
                  </h4>
                  <h4 class="font-bold text-warning pt-2">
                    {{ priceFormat(item.price*item.quantity) }}
                  </h4>
                  <!-- <p class="text-sm text-secondary line-through">
                    Rp 100.000
                  </p> -->
                </div>
              </div>
              <div class="flex justify-end">
                <form class="flex items-center space-x-2">
                  <DeleteButton
                    :style="'px-2 text-2xl'"
                    @click="deleteItemCart(item.productId)"
                  />
                  <PrimaryButton
                    :style="'font-bold flex items-center justify-center w-6 h-6 lg:w-8 lg:h-8'"
                    @click="cartStore.decrementItemCart(item.productId)"
                  >
                    -
                  </PrimaryButton>
                  <input
                    v-model="item.quantity"
                    type="text"
                    disabled
                    class="px-2 py-1 lg:py-2 font-bold border-b border-secondary text-center w-12 focus:outline-none focus:border-primary"
                    @keypress="uiStore.isNumber($event)"
                  >
                  <PrimaryButton
                    :style="'font-bold flex items-center justify-center w-6 h-6 lg:w-8 lg:h-8'"
                    @click="cartStore.incrementItemCart(item.productId)"
                  >
                    +
                  </PrimaryButton>
                  <PrimaryButton
                    :style="'px-5'"
                    @click="cartStore.updateQuantity(item.productId, item.quantity)"
                  >
                    Ubah
                  </PrimaryButton>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="fixed bottom-0 bg-white py-2 w-full flex lg:hidden container border-t border-cloudy justify-between max-w-screen-xl shadow-sm">
      <div class="flex py-2 justify-between w-full px-2 items-center">
        <div>
          <p class="font-thin text-secondary">
            Total Harga :
          </p>
          <h5 class="font-bold text-md">
            {{ priceFormat(totalPrice) }}
          </h5>
        </div>
        <div class="flex space-x-4">
          <button class="px-16 py-2 bg-primary rounded-lg font-bold text-lg text-white">
            Beli
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
