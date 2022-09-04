<script setup>
import { useUserStore } from './stores/user'
import { useCategoryStore } from './stores/category'
import { useProductStore } from './stores/product'
import { useRajaongkirStore } from './stores/rajaongkir'
import { onMounted } from 'vue'
import LoadingComponent from './components/ui/LoadingComponent.vue'
const userStore = useUserStore()
const categoryStore = useCategoryStore()
const productStore = useProductStore()
const rajaongkirStore = useRajaongkirStore()

onMounted(() => {
  userStore.checkAuth()
  categoryStore.getAllCategories()
  productStore.getAllProducts()
  rajaongkirStore.getProvinces()
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
