<script setup>
import { useCategoryStore } from '../../stores/category.js'

const categoryStore = useCategoryStore()
</script>

<template>
  <div class="hidden lg:flex items-center hover:bg-cloudy px-2 py-0.5 rounded-lg cursor-pointer group">
    <h5>Kategori</h5>
    <span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </span>
    <div class="absolute top-11 left-[5%] z-50 hidden group-hover:inline w-1/2">
      <div class="border rounded-lg px-4 py-2 w-full flex flex-wrap bg-white shadow mt-3">
        <div
          v-for="(category, index) in categoryStore.categories"
          :key="index"
          class="py-2 text-sm w-48 overflow-x-hidden whitespace-nowrap text-ellipsis"
        >
          <router-link
            :to="`/categories/${category.slug}`"
            class="hover:bg-cloudy hover:text-primary px-2 py-1 rounded-full "
          >
            {{ category.name }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
