import { defineStore } from 'pinia'
import api from '../apis/category'

export const useCategoryStore = defineStore('useCategoryStore', {
  state: () => ({
    categories: []
  }),

  actions: {
    getAllCategories () {
      return api.getCategories().then(response => {
        this.categories = response.data.data
      })
    }
  }
})
