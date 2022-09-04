<script setup>
import { useUserStore } from '../../stores/user'

const userStore = useUserStore()
</script>

<template>
  <div class="pt-20 px-2 flex lg:hidden">
    <div class="flex items-center space-x-2 text-sm">
      <span><svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-4 h-4"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
        />
      </svg>
      </span>
      <p
        v-if="userStore.isAuthenticated"
        class="truncate"
      >
        Dikirim ke <span class="font-bold">{{ userStore.user.address }}</span>
      </p>
      <p
        v-if="!userStore.isAuthenticated"
        class="truncate"
      >
        Masuk dulu yuk untuk isi alamat kamu.
      </p>
    </div>
  </div>
</template>
