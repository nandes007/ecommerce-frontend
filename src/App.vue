<script setup>
import { useUserStore } from './stores/user'
import { useCategoryStore } from './stores/category'
import { useProductStore } from './stores/product'
import { useRajaongkirStore } from './stores/rajaongkir'
import { usePagination } from './stores/helper/pagination'
import { onMounted } from 'vue'
import LoadingComponent from './components/ui/LoadingComponent.vue'
import LoadingAdminComponent from './components/ui/admin/LoadingAdminComponent.vue'
import AddressAlertComponent from './components/ui/AddressAlertComponent.vue'
import OrderedSuccessComponent from './components/ui/OrderedSuccessComponent.vue'
const userStore = useUserStore()
const categoryStore = useCategoryStore()
const productStore = useProductStore()
const rajaongkirStore = useRajaongkirStore()
const pagination = usePagination()

onMounted(() => {
  userStore.checkAuth()
  categoryStore.getAllCategories()
  productStore.getAllProducts()
  pagination.stateObj.currentPage = 1
})

</script>

<template>
  <div>
    <router-view />

    <LoadingComponent />

    <LoadingAdminComponent />

    <AddressAlertComponent />

    <OrderedSuccessComponent />
  </div>
</template>

<style>
</style>
