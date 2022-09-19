<script setup>
import { useUiStore } from '../../stores/ui'

const ui = useUiStore()
</script>

<template>
  <section
    v-show="ui.orderAlert"
    class="loading"
  >
    <div
      class="fixed inset-0 w-full h-full opacity-50 bg-black z-30"
      @click="ui.orderAlert = false"
    />
    <div class="fixed px-2 lg:px-0 inset-0 w-full h-full flex justify-center items-center z-40">
      <div class="bg-green-500 p-3 rounded-full border border-green-500 flex items-center space-x-2">
        <span class="text-green-500">
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
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>

        </span>
        <p class="text-white text-center">
          Terima kasih sudah berbelanja di toko kamu. Mohon untuk menunggu konfirmasi berikutnya ya.
        </p>
      </div>
    </div>
  </section>
</template>
