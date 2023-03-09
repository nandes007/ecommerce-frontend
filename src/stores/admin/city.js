import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import api from '../../apis/admin/city'
import { usePagination } from '../helper/pagination'
import { useAdminUiStore } from './ui'

export const useAdminCityStore = defineStore('useAdminCityStore', () => {
  const cities = ref([])
  const city = ref({})
  const requestObj = reactive({
    name: '',
    provinceId: ''
  })
  const cityStateObj = reactive({
    name: '',
    provinceId: '',
    disabled: true,
    successMessage: ''
  })
  const pagination = usePagination()
  const { uiStateObj } = useAdminUiStore()

  function getAllCities () {
    uiStateObj.loadLoading = true
    const params = {
      page: pagination.stateObj.currentPage
    }
    return api.getCities(params).then(response => {
      uiStateObj.loadLoading = false
      const jsonResponse = response.data.data
      cities.value = jsonResponse.data
      pagination.stateObj.isFirstPage = jsonResponse.current_page === 1
      pagination.stateObj.isLastPage = jsonResponse.current_page === jsonResponse.last_page
      pagination.stateObj.totalPages = jsonResponse.last_page
      pagination.generatePages()
    }).catch(error => {
      console.log(error)
    })
  }

  function getCityById (id) {
    return api.showCity(id).then(response => {
      const jsonResponse = response.data.data
      cityStateObj.name = jsonResponse.name
      cityStateObj.provinceId = jsonResponse.province_id
    }).catch(error => {
      console.log(error)
    })
  }

  function storeCity () {
    uiStateObj.loading = true
    const request = {
      name: requestObj.name,
      province_id: requestObj.provinceId
    }
    return api.storeCity(request).then(response => {
      uiStateObj.loading = false
      const jsonResponse = response.data.data
      cities.value.push(jsonResponse)
      requestObj.name = ''
      requestObj.provinceId = ''
      cityStateObj.successMessage = 'City has been created successfully'
      setTimeout(() => {
        cityStateObj.successMessage = ''
      }, 3000)
    }).catch(error => {
      console.log(error)
    })
  }

  function updateCity (id) {
    uiStateObj.loading = true
    const request = {
      name: cityStateObj.name,
      province_id: cityStateObj.provinceId
    }
    return api.updateCity(id, request).then(() => {
      uiStateObj.loading = false
      cityStateObj.disable = true
      cityStateObj.successMessage = 'City has been updated successfully'
      setTimeout(() => {
        cityStateObj.successMessage = ''
      }, 3000)
    }).catch(error => {
      uiStateObj.loading = false
      console.log(error)
    })
  }

  function deleteCity (id) {
    uiStateObj.loading = true
    return api.deleteCity(id).then(response => {
      uiStateObj.loading = false
      const statusCode = response.data.data
      if (statusCode === 200) {
        for (let i = 0; i < cities.value.length; i++) {
          if (cities.value[i].id === id) {
            cities.value.slice(i, 1)
          }
        }
      }
      cityStateObj.successMessage = 'City has been deleted successfully'
      setTimeout(() => {
        cityStateObj.successMessage = ''
      }, 4000)
    }).catch(error => {
      uiStateObj.loading = false
      console.log(error)
    })
  }

  function openPrevPage () {
    pagination.openPrevPage()
    this.getAllCities()
  }

  function openNextPage () {
    pagination.openNextPage()
    getAllCities()
  }

  function openPage (link) {
    pagination.openPage(link)
  }

  return { cities, city, requestObj, cityStateObj, getAllCities, getCityById, storeCity, updateCity, deleteCity, openPrevPage, openNextPage, openPage }
})
