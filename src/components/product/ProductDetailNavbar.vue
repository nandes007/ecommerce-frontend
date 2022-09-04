<script setup>
import { watchEffect, ref } from 'vue'
import { useCartStore } from '../../stores/cart'

const cartStore = useCartStore()
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
  <header class="fixed flex w-full bg-white shadow z-20">
    <div class="container px-2 lg:px-4 max-w-screen-xl mx-auto relative">
      <div class="flex items-center realtive gap-2 py-1 lg:py-2 relative">
        <router-link to="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="w-7 h-7"
          >
            <path
              fill-rule="evenodd"
              d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
              clip-rule="evenodd"
            />
          </svg>
        </router-link>
        <div class="py-1 basis-full lg:basis-4/5">
          <form>
            <label
              for="search"
              class="relative block"
            >
              <span class="absolute w-9 h-full my-auto inset-y-0 left-0 flex lg:hidden items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
              <span class="absolute w-9 h-full my-auto inset-y-0 right-0 hidden lg:flex items-center justify-center bg-primary rounded-r-lg text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
              <input
                id="search"
                type="text"
                class="border py-2 lg:py-1 rounded-lg border-slate-300 block pl-10 lg:pl-3 text-dark focus:outline-none bg-slate-100 w-full"
              >
            </label>
          </form>
        </div>
        <router-link
          to="/carts"
          class="relative px-2"
        >
          <span class="w-[22px] h-[22px] rounded-full absolute z-10 bg-danger flex items-center justify-center mx-auto -right-1 -top-2 text-white text-[11px] font-thin">{{ itemCount.length }}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
        </router-link>
      </div>
    </div>
  </header>
</template>
