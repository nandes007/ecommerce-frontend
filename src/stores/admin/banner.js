import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import api from '../../apis/admin/banner'
import { usePagination } from '../helper/pagination'
import { useAdminUiStore } from './ui'

export const useAdminBannerStore = defineStore('useAdminBannerStore', () => {
  const banners = ref([])
  const banner = ref({})
  const requestObj = reactive({
    title: '',
    url: '',
    status: '',
    imagePath: null
  })
  const bannerStateObj = reactive({
    title: '',
    url: '',
    status: '',
    imagePath: null,
    imagePreview: '',
    disabled: true,
    successMessage: '',
    errors: null,
    page: 1,
    isHover: false
  })
  const pagination = usePagination()
  const { uiStateObj } = useAdminUiStore()

  function getAllBanners () {
    uiStateObj.loadLoading = true
    const params = {
      page: pagination.stateObj.currentPage
    }
    return api.getBanners(params).then(response => {
      uiStateObj.loadLoading = false
      const jsonResponse = response.data.data
      console.log(jsonResponse)
      banners.value = jsonResponse.data
      pagination.stateObj.isFirstPage = jsonResponse.current_page === 1
      pagination.stateObj.isLastPage = jsonResponse.current_page === jsonResponse.last_page
      pagination.stateObj.totalPages = jsonResponse.last_page
      pagination.generatePages()
    }).catch(error => {
      uiStateObj.loadLoading = false
      console.log(error)
    })
  }

  function getBannerById (id) {
    return api.showBanner(id).then(response => {
      const jsonResponse = response.data.data
      bannerStateObj.title = jsonResponse.title
      bannerStateObj.url = jsonResponse.url
      bannerStateObj.status = jsonResponse.status
      bannerStateObj.imagePreview = jsonResponse.image_path_url
    }).catch(error => {
      console.log(error)
    })
  }

  function storeBanner () {
    uiStateObj.loading = true
    const formData = new FormData()
    formData.append('title', requestObj.title)
    formData.append('url', requestObj.url)
    formData.append('status', requestObj.status)
    formData.append('image', requestObj.imagePath)
    return api.storeBanner(formData).then(response => {
      uiStateObj.loading = false
      const jsonResponse = response.data.data
      console.log(jsonResponse)
      banners.value.push(jsonResponse)
      requestObj.title = ''
      requestObj.url = ''
      requestObj.status = ''
      requestObj.imagePath = ''
      bannerStateObj.successMessage = 'Banner has been created successfully'
      bannerStateObj.errors = null
      setTimeout(() => {
        bannerStateObj.successMessage = ''
      }, 3000)
    }).catch(error => {
      uiStateObj.loading = false
      if (error.response.status === 422) {
        bannerStateObj.errors = error.response.data.errors
      }
    })
  }

  function updateBanner (id) {
    uiStateObj.loading = true
    const formData = new FormData()
    formData.append('title', requestObj.title)
    formData.append('url', requestObj.url)
    formData.append('status', requestObj.status)
    formData.append('image', requestObj.imagePath)
    return api.updateBanner(id, formData).then(() => {
      uiStateObj.loading = false
      bannerStateObj.disabled = true
      bannerStateObj.successMessage = 'Banner has been updated successfully'
      bannerStateObj.errors = null
      setTimeout(() => {
        bannerStateObj.successMessage = ''
      }, 3000)
    }).catch(error => {
      uiStateObj.loading = false
      if (error.response.status === 422) {
        bannerStateObj.errors = error.response.data.errors
      }
    })
  }

  function deleteBanner (id) {
    uiStateObj.loading = true
    return api.deleteBanner(id).then(response => {
      uiStateObj.loading = false
      const statusCode = response.data.statusCode
      if (statusCode === 200) {
        for (let i = 0; i < banners.value.length; i++) {
          if (banners.value[i].id === id) {
            banners.value.splice(i, 1)
          }
        }
      }
      bannerStateObj.successMessage = 'Banner has been deleted successfully'
      setTimeout(() => {
        bannerStateObj.successMessage = ''
      }, 3000)
    }).catch(error => {
      uiStateObj.loading = false
      console.log(error)
    })
  }

  function onFileChange (event) {
    const file = event.target.files[0]
    console.log(file)
    requestObj.imagePath = file
  }

  function openPrevPage () {
    pagination.openPrevPage()
    this.getAllBanners()
  }

  function openNextPage () {
    pagination.openNextPage()
    this.getAllBanners()
  }

  function openPage (link) {
    pagination.openPage(link)
    this.getAllBanners()
  }

  return { banners, banner, requestObj, bannerStateObj, openPrevPage, openNextPage, openPage, getAllBanners, storeBanner, updateBanner, deleteBanner, onFileChange, getBannerById }
})
