<script setup>
import { ref } from 'vue'

const status = ref(false)
</script>

<template>
  <div
    v-if="!status"
    class="p-4 max-w-xl w-full lg:w-1/2 mt-10 ml-2"
  >
    <div class="animate-pulse">
      <div class="bg-slate-500 h-96 w-full rounded-lg" />
      <div class="pt-2">
        <div class="bg-slate-500 h-24 w-24 rounded-lg" />
      </div>
    </div>
  </div>
</template>
