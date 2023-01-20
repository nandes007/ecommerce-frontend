import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import api from '../../apis/admin/category'
import { usePagination } from '../helper/pagination'

export const useAdminCategoryStore = defineStore('useAdminCategoryStore', () => {
  const categories = ref([])
  const category = ref({})
  const categoryStateObj = reactive({
    name: '',
    parentId: '',
    parentCategoryName: ''
  })
  const pagination = usePagination()

  function getAllCategories () {
    const params = {
      page: pagination.stateObj.currentPage
    }
    return api.getCategories(params).then(response => {
      const jsonResponse = response.data.data
      categories.value = jsonResponse.data
      pagination.stateObj.isFirstPage = jsonResponse.current_page === 1
      pagination.stateObj.isLastPage = jsonResponse.current_page === jsonResponse.last_page
      pagination.stateObj.totalPages = jsonResponse.last_page
      pagination.generatePages()
    })
  }

  function getCategoryById (id) {
    return api.showCategory(id).then(response => {
      const jsonResponse = response.data.data
      categoryStateObj.name = jsonResponse.name
      categoryStateObj.parentId = jsonResponse.parent_id
      getParentCategoryName()
    })
  }

  function storeCategory () {
    const request = {
      name: categoryStateObj.name,
      parent_id: categoryStateObj.parentId
    }
    return api.storeCategory(request).then(response => {
      console.log(response)
    })
  }

  function getParentCategoryName () {
    const filtered = categories.value.find(e => {
      return e.id === categoryStateObj.parentId
    })
    categoryStateObj.parentCategoryName = filtered.name
  }

  function openPrevPage () {
    pagination.openPrevPage()
    this.getAllCategories()
  }

  function openNextPage () {
    pagination.openNextPage()
    getAllCategories()
  }

  function openPage (link) {
    pagination.openPage(link)
    getAllCategories()
  }

  return { categories, category, getAllCategories, getCategoryById, storeCategory, openPrevPage, openNextPage, openPage, categoryStateObj, getParentCategoryName }
})
