import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import api from '../../apis/admin/category'
import { usePagination } from '../helper/pagination'
import { useAdminUiStore } from './ui'

export const useAdminCategoryStore = defineStore('useAdminCategoryStore', () => {
  const categories = ref([])
  const category = ref({})
  const requestObj = reactive({
    name: '',
    parentId: ''
  })
  const categoryStateObj = reactive({
    name: '',
    parentId: '',
    parentCategoryName: '',
    disabled: true,
    successMessage: '',
    errors: null
  })
  const pagination = usePagination()
  const { uiStateObj } = useAdminUiStore()
  function getAllCategories () {
    uiStateObj.loadLoading = true
    const params = {
      page: pagination.stateObj.currentPage
    }
    return api.getCategories(params).then(response => {
      uiStateObj.loadLoading = false
      const jsonResponse = response.data.data
      categories.value = jsonResponse.data
      pagination.stateObj.isFirstPage = jsonResponse.current_page === 1
      pagination.stateObj.isLastPage = jsonResponse.current_page === jsonResponse.last_page
      pagination.stateObj.totalPages = jsonResponse.last_page
      pagination.generatePages()
    }).catch(error => {
      console.log(error)
    })
  }

  function getCategoryById (id) {
    return api.showCategory(id).then(response => {
      const jsonResponse = response.data.data
      categoryStateObj.name = jsonResponse.name
      categoryStateObj.parentId = jsonResponse.parent_id
      getParentCategoryName()
    }).catch(error => {
      console.log(error)
    })
  }

  function storeCategory () {
    uiStateObj.loading = true
    const request = {
      name: requestObj.name,
      parent_id: requestObj.parentId
    }
    return api.storeCategory(request).then(response => {
      uiStateObj.loading = false
      const jsonResponse = response.data.data
      console.log(jsonResponse)
      categories.value.push(jsonResponse)
      requestObj.name = ''
      requestObj.parentId = ''
      categoryStateObj.successMessage = 'Category has been created successfuly'
      categoryStateObj.errors = null
      setTimeout(() => {
        categoryStateObj.successMessage = ''
      }, 3000)
    }).catch(error => {
      uiStateObj.loading = false
      if (error.response.status === 422) {
        categoryStateObj.errors = error.response.data.errors
      }
    })
  }

  function updateCategory (id) {
    uiStateObj.loading = true
    const request = {
      name: categoryStateObj.name,
      parent_id: categoryStateObj.parentId
    }
    return api.updateCategory(id, request).then(() => {
      uiStateObj.loading = false
      categoryStateObj.disabled = true
      categoryStateObj.successMessage = 'Category has been updated successfuly'
      categoryStateObj.errors = null
      setTimeout(() => {
        categoryStateObj.successMessage = ''
      }, 3000)
    }).catch(error => {
      uiStateObj.loading = false
      if (error.response.status === 422) {
        categoryStateObj.errors = error.response.data.errors
      }
    })
  }

  function deleteCategory (id) {
    uiStateObj.loading = true
    return api.deleteCategory(id).then(response => {
      uiStateObj.loading = false
      const statusCode = response.data.code
      if (statusCode === 200) {
        for (let i = 0; i < categories.value.length; i++) {
          if (categories.value[i].id === id) {
            categories.value.splice(i, 1)
          }
        }
      }
      categoryStateObj.successMessage = 'Category has been deleted successfuly'
      setTimeout(() => {
        categoryStateObj.successMessage = ''
      }, 4000)
    }).catch(error => {
      uiStateObj.loading = false
      console.log(error)
    })
  }

  function getParentCategoryName () {
    if (categoryStateObj.parentId === null || categoryStateObj.parentId === undefined || categoryStateObj === '') {
      categoryStateObj.parentCategoryName = 'N/A'
    } else {
      return api.showCategory(categoryStateObj.parentId).then(response => {
        const jsonResponse = response.data.data
        categoryStateObj.parentCategoryName = jsonResponse.name
      }).catch(error => {
        console.log(error)
      })
    }
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

  return { categories, category, getAllCategories, getCategoryById, storeCategory, updateCategory, deleteCategory, openPrevPage, openNextPage, openPage, categoryStateObj, getParentCategoryName, requestObj }
})
