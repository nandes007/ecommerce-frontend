<script setup>
import PrimaryButton from '../PrimaryButton.vue'
import FavoriteButton from '../FavoriteButton.vue'
</script>

<template>
  <div class="fixed bottom-0 bg-white py-2 w-full flex lg:hidden container border-t border-cloudy justify-between max-w-screen-xl shadow-sm">
    <div class="flex py-2 justify-between w-full px-2 items-center">
      <form class="flex items-center space-x-1">
        <PrimaryButton :style="'text-xl font-bold flex items-center justify-center w-10'">
          -
        </PrimaryButton>
        <input
          type="text"
          class="px-2 py-2 font-bold border-b border-secondary text-center w-20 focus:outline-none focus:border-primary"
        >
        <PrimaryButton :style="'text-xl font-bold flex items-center justify-center w-10'">
          +
        </PrimaryButton>
      </form>
      <div class="flex space-x-4">
        <PrimaryButton>+ Keranjang</PrimaryButton>
        <FavoriteButton />
      </div>
    </div>
  </div>
</template>
