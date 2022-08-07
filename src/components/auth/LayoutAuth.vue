<script setup>
</script>

<template>
  <div class="p-5 flex w-full bg-white border-b border-gray-200 justify-center">
    <div class="max-w-screen-sm w-full flex items-center">
      <router-link
        to="/"
        class="text-primary bg-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      </router-link>
      <h1 class="flex justify-center w-full font-bold">
        <slot>Text Name</slot>
      </h1>
    </div>
  </div>

  <div class="fixed bottom-0 border-t w-full py-5 flex justify-center bg-white z-10">
    <h4 class="text-secondary font-medium text-sm">
      Copyright &copy; 2022 Tokoca
    </h4>
  </div>
</template>
