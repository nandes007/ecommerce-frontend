<script setup>
import { ref, watchEffect, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useCartStore } from '../../stores/cart'
import { useUiStore } from '../../stores/ui'
import { useUserStore } from '../../stores/user'
import { useRajaongkirStore } from '../../stores/rajaongkir'
import { useOrderStore } from '../../stores/order'
import PrimaryButton from '../../components/PrimaryButton.vue'

const cartStore = useCartStore()
const uiStore = useUiStore()
const userStore = useUserStore()
const rajaongkirStore = useRajaongkirStore()
const orderStore = useOrderStore()
const { carts } = storeToRefs(cartStore)
const { priceFormat } = uiStore
const selected = ref('')
const courier = ref(['jne', 'tiki', 'pos'])

const itemCount = ref([])
watchEffect(() => {
  if (cartStore.carts.length) {
    itemCount.value = cartStore.carts[0].items
  } else {
    itemCount.value = cartStore.carts
  }
})

const totalPrice = computed(() => {
  let total = 0
  if (cartStore.carts.length) {
    if (cartStore.carts[0].items.length) {
      for (let i = 0; i < cartStore.carts[0].items.length; i++) {
        total += cartStore.carts[0].items[i].price * cartStore.carts[0].items[i].quantity
      }
    }
  }
  if (rajaongkirStore.cost != null) {
    total += rajaongkirStore.cost.cost[0].value
  }
  return total
})

const totalItem = computed(() => {
  let total = 0
  if (cartStore.carts.length) {
    if (cartStore.carts[0].items.length) {
      for (let i = 0; i < cartStore.carts[0].items.length; i++) {
        total += cartStore.carts[0].items[i].quantity
      }
    }
  }
  return total
})

</script>

<template>
  <section class="flex justify-center">
    <div class="container max-w-screen-xl">
      <div class="flex lg:hidden py-3 items-center space-x-2 font-bold fixed border-b border-cloudy bg-white w-full">
        <span @click="$router.go(-1)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="w-5 h-5"
          >
            <path
              fill-rule="evenodd"
              d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
              clip-rule="evenodd"
            />
          </svg>

        </span>
        <h4>Pengiriman</h4>
      </div>
      <div class="flex flex-wrap pt-12 lg:pt-0 px-2">
        <div class="w-full border-b py-2">
          <div class="flex">
            <h5 class="font-bold text-sm">
              Alamat Pengirim
            </h5>
          </div>
        </div>
        <div class="text-[13px] py-2">
          <p class="truncate">
            {{ userStore.user.name }} ({{ userStore.user.phone_number }})
          </p>
          <p class="line-clamp-2">
            {{ userStore.user.address }}, {{ userStore.cityName }} {{ userStore.provinceName }} {{ userStore.user.postalcode }}
          </p>
        </div>
      </div>
      <div class="flex h-1.5 bg-cloudy" />
      <div
        v-if="itemCount.length <= 0"
        class="pt-10"
      >
        <img
          src="../../assets/img/cart/empty_cart.webp"
          alt="Empty Cart"
        >
      </div>
      <div v-if="itemCount.length > 0">
        <div v-if="carts.length">
          <div
            v-for="(item, index) in carts[0].items"
            :key="item.productId"
            :index="index"
            class="flex py-2 border-b px-2"
          >
            <div class="w-1/4">
              <img
                :src="cartStore.getImageInCart(item.productId)"
                alt="Product Image"
              >
            </div>
            <div class="w-3/4 px-4">
              <p class="line-climp-2 text-sm">
                {{ item.product_name }}
              </p>
              <p class="text-sm text-secondary">
                {{ priceFormat(item.price) }} x {{ item.quantity }}
              </p>
              <p>{{ priceFormat(item.price*item.quantity) }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="pt-2 px-2 leading-none">
        <label
          for="shipping"
          class="text-sm font-bold"
        >Pilih Pengiriman</label>
        <select
          id="shipping"
          v-model="selected"
          class="input-primary"
          @change="rajaongkirStore.getCost(selected)"
        >
          <option
            disabled
            value=""
          >
            Pilih Pengiriman
          </option>
          <option
            v-for="(c, index) in courier"
            :key="index"
            :value="c"
          >
            {{ c }}
          </option>
        </select>
      </div>
      <div class="pt-2 pb-2 px-2 leading-none">
        <label
          for="service"
          class="text-sm font-bold"
        >Pilih Service</label>
        <select
          id="service"
          v-model="rajaongkirStore.cost"
          class="input-primary"
        >
          <option
            v-for="(cost, index) in rajaongkirStore.costs"
            :key="index"
            :value="cost"
          >
            {{ cost.service }} - {{ priceFormat(cost.cost[0].value) }} - {{ cost.cost[0].etd }} Hari
          </option>
        </select>
      </div>
      <!-- space -->
      <div class="flex h-1.5 bg-cloudy" />
      <!-- space -->
      <div class="flex items-end justify-between py-4 px-2">
        <div>
          <p>Ringkasan belanja</p>
          <p>Toal Harga ({{ totalItem }} Barang)</p>
        </div>
        <div>{{ priceFormat(totalPrice) }}</div>
      </div>
      <!-- space -->
      <div class="flex h-1.5 bg-cloudy" />
      <!-- space -->
      <div class="flex items-center justify-between py-4 px-2">
        <div>
          <p>Total Tagihan</p>
          <p class="font-bold">
            {{ priceFormat(totalPrice) }}
          </p>
        </div>
        <div>
          <PrimaryButton @click="orderStore.checkout()">
            Buat Pesanan
          </PrimaryButton>
        </div>
      </div>
      <!-- space -->
      <div class="flex h-1.5 bg-cloudy" />
      <!-- space -->
    </div>
  </section>
</template>
