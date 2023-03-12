import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import api from '../../apis/admin/province'
import { usePagination } from '../helper/pagination'
import { useAdminUiStore } from './ui'

export const useAdminProvinceStore = defineStore('useAdminProvinceStore', () => {
  const provinces = ref([])
  const allProvinces = ref([])
  const province = ref({})
  const requestObj = reactive({
    name: ''
  })
  const provinceStateObj = reactive({
    name: '',
    disabled: true,
    successMessage: '',
    errors: null
  })
  const pagination = usePagination()
  const { uiStateObj } = useAdminUiStore()

  function getAllProvinces () {
    uiStateObj.loadLoading = true
    const params = {
      page: pagination.stateObj.currentPage
    }
    return api.getProvinces(params).then(response => {
      uiStateObj.loadLoading = false
      const jsonResponse = response.data.data
      provinces.value = jsonResponse.data
      pagination.stateObj.isFirstPage = jsonResponse.current_page === 1
      pagination.stateObj.isLastPage = jsonResponse.current_page === jsonResponse.last_page
      pagination.stateObj.totalPages = jsonResponse.last_page
      pagination.generatePages()
    }).catch(error => {
      console.log(error)
    })
  }

  function getAllProvincesWithoutPagination () {
    return api.getProvincesWithoutPagination().then(response => {
      const jsonResponse = response.data
      allProvinces.value = jsonResponse.data
    }).catch(error => {
      console.log(error)
    })
  }

  function getProvinceById (id) {
    return api.showProvince(id).then(resposne => {
      const jsonResponse = resposne.data.data
      provinceStateObj.name = jsonResponse.name
    }).catch(error => {
      console.log(error)
    })
  }

  function storeProvince () {
    uiStateObj.loading = true
    const request = {
      name: requestObj.name
    }
    return api.storeProvince(request).then(response => {
      uiStateObj.loading = false
      const jsonResponse = response.data.data
      provinces.value.push(jsonResponse)
      requestObj.name = ''
      provinceStateObj.successMessage = 'Province has been created successfully'
      provinceStateObj.errors = null
      setTimeout(() => {
        provinceStateObj.successMessage = ''
      }, 3000)
    }).catch(error => {
      uiStateObj.loading = false
      if (error.response.status === 422) {
        provinceStateObj.errors = error.response.data.errors
      }
    })
  }

  function updateProvince (id) {
    uiStateObj.loading = true
    const request = {
      name: provinceStateObj.name
    }
    return api.updateProvince(id, request).then(() => {
      uiStateObj.loading = false
      provinceStateObj.disable = true
      provinceStateObj.successMessage = 'Province has been updated successfully'
      provinceStateObj.errors = null
      setTimeout(() => {
        provinceStateObj.successMessage = ''
      }, 3000)
    }).catch(error => {
      uiStateObj.loading = false
      if (error.response.status === 422) {
        provinceStateObj.errors = error.response.data.errors
      }
    })
  }

  function deleteProvince (id) {
    uiStateObj.loading = true
    return api.deleteProvince(id).then(response => {
      uiStateObj.loading = false
      const statusCode = response.data.code
      if (statusCode === 200) {
        for (let i = 0; i < provinces.value.length; i++) {
          if (provinces.value[i].id === id) {
            provinces.value.splice(i, 1)
          }
        }
      }
      provinceStateObj.successMessage = 'Province has been deleted successfully'
      setTimeout(() => {
        provinceStateObj.successMessage = ''
      }, 4000)
    }).catch(error => {
      uiStateObj.loading = false
      console.log(error)
    })
  }

  function openPrevPage () {
    pagination.openPrevPage()
    this.getAllProvinces()
  }

  function openNextPage () {
    pagination.openNextPage()
    getAllProvinces()
  }

  function openPage (link) {
    pagination.openPage(link)
    getAllProvinces()
  }

  return { provinces, allProvinces, province, requestObj, provinceStateObj, getAllProvinces, getAllProvincesWithoutPagination, getProvinceById, storeProvince, updateProvince, deleteProvince, openPrevPage, openNextPage, openPage }
})
