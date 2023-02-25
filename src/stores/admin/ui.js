import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useAdminUiStore = defineStore('adminUiStore', () => {
  const uiStateObj = reactive({
    loading: false,
    loadLoading: false
  })

  return { uiStateObj }
})
