<script setup>
import { useUserStore } from './stores/user'
import { useCategoryStore } from './stores/category'
import { useProductStore } from './stores/product'
import { useCartStore } from './stores/cart'
import { onMounted } from 'vue'
import LoadingComponent from './components/ui/LoadingComponent.vue'
const userStore = useUserStore()
const categoryStore = useCategoryStore()
const productStore = useProductStore()
const cartStore = useCartStore()

onMounted(() => {
  userStore.checkAuth()
  categoryStore.getAllCategories()
  productStore.getAllProducts()
  cartStore.setItemCarts()
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
