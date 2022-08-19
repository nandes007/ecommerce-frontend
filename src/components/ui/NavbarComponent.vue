<script setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '../../stores/user'
import { useCartStore } from '../../stores/cart'
import CategoryNavbar from '../category/CategoryNavbar.vue'
import LogoNavbar from './LogoNavbar.vue'
import ContactComponent from './ContactComponent.vue'
import ListItemCart from '../cart/ListItemCart.vue'
import { ref, watchEffect } from 'vue'

const userStore = useUserStore()
const cartStore = useCartStore()

const { isAuthenticated, user } = storeToRefs(userStore)
const { logoutUser } = userStore

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
  <!-- Navbar Start -->
  <header class="fixed flex w-full bg-white shadow z-20">
    <div class="container px-4 lg:px-4 max-w-screen-xl mx-auto relative">
      <!-- Header Start -->
      <ContactComponent />
      <!-- Header End -->
      <div class="flex items-center realtive gap-4 py-1 lg:py-2 relative">
        <!-- Company Logo Start -->
        <LogoNavbar />
        <!-- Company Logo End -->
        <!-- CategoryNavbar Component Start -->
        <CategoryNavbar />
        <!-- CategoryNavbar Component End -->
        <div class="py-2 basis-full lg:basis-4/5">
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
        <div class="hover:bg-cloudy rounded-lg group">
          <router-link
            to="/carts"
            class="text-primary hidden lg:flex relative p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="w-[22px] h-[22px] rounded-full absolute z-10 bg-danger flex items-center justify-center mx-auto -right-1 -top-1 text-white text-[11px] font-thin">{{ itemCount.length }}</span>
          </router-link>
          <!-- Cart items Start -->
          <ListItemCart />
          <!-- Cart items End -->
        </div>
        <div class="hidden lg:block">
          <span class="bg-slate-300 w-2 py-0.5 border" />
        </div>
        <!-- Start button register,login & profile -->
        <div
          v-show="!isAuthenticated"
          class="gap-4 justify-self-end hidden lg:flex"
        >
          <router-link
            to="/login"
            class="border border-primary bg-white text-primary px-3 py-1 rounded-lg"
          >
            Masuk
          </router-link>
          <router-link
            to="/register"
            class="bg-primary text-white rounded-lg px-3 py-1 border-primary border"
          >
            Daftar
          </router-link>
        </div>
        <div
          v-show="isAuthenticated"
          class="gap-4 justify-self-end hidden lg:flex"
        >
          <div class="group">
            <router-link
              to="/"
              class="flex items-center space-x-2 hover:bg-cloudy px-2 py-1 rounded-lg"
            >
              <span class="flex-none w-8 h-8 border border-secondary rounded-full relative overflow-hidden">
                <img
                  src="https://source.unsplash.com/60x60?poeple"
                  alt="Avatar"
                >
              </span>
              <p
                v-if="isAuthenticated"
                class="w-40 truncate"
              >
                {{ user.name }}
              </p>
            </router-link>
            <div class="absolute hidden group-hover:flex top-12 right-0 w-72">
              <div class="bg-white border rounded-lg z-20 mt-3 px-4 py-2 w-full shadow-md">
                <div class="bg-white py-2 px-2 border border-cloudy rounded-lg">
                  <p class="w-36 truncate">
                    Lorem ipsum dolor sit amet consectetur
                  </p>
                </div>
                <ul class="pt-3">
                  <li class="py-1 px-2 hover:bg-cloudy rounded-lg cursor-pointer text-right">
                    Pembelian
                  </li>
                  <li class="py-1 px-2 hover:bg-cloudy rounded-lg cursor-pointer text-right">
                    Wishlist
                  </li>
                  <li class="py-1 px-2 hover:bg-cloudy rounded-lg cursor-pointer text-right">
                    Pengaturan
                  </li>
                  <li
                    class="py-1 px-2 hover:bg-cloudy rounded-lg cursor-pointer text-right"
                    @click="logoutUser()"
                  >
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <!-- End button register,login & profile -->
        <div class="flex lg:hidden">
          <span>
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
          </span>
        </div>
      </div>
    </div>
  </header>
  <!-- Navbar End -->
</template>
