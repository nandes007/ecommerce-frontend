<script setup>
import { useUserStore } from './stores/user'
import { useCategoryStore } from './stores/category'
import { useProductStore } from './stores/product'
import { onMounted } from 'vue'
import LoadingComponent from './components/ui/LoadingComponent.vue'
const userStore = useUserStore()
const categoryStore = useCategoryStore()
const productStore = useProductStore()

onMounted(() => {
  userStore.checkAuth()
  categoryStore.getAllCategories()
  productStore.getAllProducts()
})

</script>

<template>
  <div>
    <router-view />

    <LoadingComponent />
  </div>
</template>

<style>
</style>
