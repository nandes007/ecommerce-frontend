import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import api from '../../apis/admin/product'
import { usePagination } from '../helper/pagination'
import { useAdminUiStore } from './ui'

export const useAdminProductStore = defineStore('useAdminProductStore', () => {
  const products = ref([])
  const { uiStateObj } = useAdminUiStore()
  const pagination = usePagination()
  const requestObj = reactive({
    sku: '',
    barcode: '',
    product_name: '',
    unit: '',
    fraction: '',
    status: '',
    unitprice: 0,
    price: 0,
    weight: 0,
    tax: 0,
    description: ''
  })
  const productStateObj = reactive({
    sku: '',
    barcode: '',
    product_name: '',
    unit: '',
    fraction: '',
    status: '',
    unitprice: 0,
    price: 0,
    weight: 0,
    tax: 0,
    description: '',
    successMessage: '',
    disabled: true
  })

  function getAllProducts () {
    uiStateObj.loadLoading = true
    const params = {
      page: pagination.stateObj.currentPage
    }
    return api.getProducts(params).then(response => {
      uiStateObj.loadLoading = false
      const jsonResponse = response.data.data
      products.value = jsonResponse.data
      pagination.stateObj.isFirstPage = jsonResponse.current_page === 1
      pagination.stateObj.isLastPage = jsonResponse.current_page === jsonResponse.last_page
      pagination.stateObj.totalPages = jsonResponse.last_page
      pagination.generatePages()
    }).catch(error => {
      console.log(error)
    })
  }

  function storeProduct () {
    uiStateObj.loading = true
    return api.storeProduct(requestObj).then(response => {
      uiStateObj.loading = false
      const jsonResponse = response.data.data
      products.value.push(jsonResponse)
      console.log(response)
      requestObj.sku = ''
      requestObj.product_name = ''
      requestObj.unit = ''
      requestObj.fraction = ''
      requestObj.status = ''
      requestObj.unitprice = ''
      requestObj.price = ''
      requestObj.weight = ''
      requestObj.tax = ''
      requestObj.description = ''
      productStateObj.successMessage = 'Product has been created successfuly'
      setTimeout(() => {
        productStateObj.successMessage = ''
      }, 4000)
    }).catch(error => {
      uiStateObj.loading = false
      console.log(error)
    })
  }

  function getProductById (id) {
    return api.showProduct(id).then(response => {
      const jsonResponse = response.data.data
      console.log(jsonResponse)
      productStateObj.sku = jsonResponse.sku
      productStateObj.barcode = jsonResponse.barcode
      productStateObj.product_name = jsonResponse.product_name
      productStateObj.unit = jsonResponse.unit
      productStateObj.fraction = jsonResponse.fraction
      productStateObj.status = jsonResponse.status
      productStateObj.unitprice = jsonResponse.unitprice
      productStateObj.price = jsonResponse.price
      productStateObj.weight = jsonResponse.weight
      productStateObj.tax = jsonResponse.tax
      productStateObj.description = jsonResponse.description
    })
  }

  function openPrevPage () {
    pagination.openPrevPage()
    this.getAllProducts()
  }

  function openNextPage () {
    pagination.openNextPage()
    getAllProducts()
  }

  function openPage (link) {
    pagination.openPage(link)
    getAllProducts()
  }

  return { getAllProducts, products, openPrevPage, openNextPage, openPage, requestObj, storeProduct, productStateObj, getProductById }
})
