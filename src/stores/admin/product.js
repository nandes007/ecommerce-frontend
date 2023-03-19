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
    avgcost: 0,
    lastcost: 0,
    unitprice: 0,
    price_old: 0,
    price: 0,
    weight: 0,
    tax: 0,
    description: '',
    category_ids: []
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
    category_ids: [],
    successMessage: '',
    disabled: true,
    errors: null
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
    requestObj.avgcost = requestObj.unitprice
    requestObj.lastcost = requestObj.unitprice
    requestObj.price_old = requestObj.price
    return api.storeProduct(requestObj).then(response => {
      uiStateObj.loading = false
      const jsonResponse = response.data.data
      products.value.push(jsonResponse)
      requestObj.sku = ''
      requestObj.barcode = ''
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
      productStateObj.errors = null
      setTimeout(() => {
        productStateObj.successMessage = ''
      }, 3000)
    }).catch(error => {
      uiStateObj.loading = false
      if (error.response.status === 422) {
        productStateObj.errors = error.response.data.errors
      }
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
      productStateObj.category_ids = jsonResponse.categories.map(category => category.id)
      console.log(productStateObj.category_ids)
    }).catch(error => {
      console.log(error)
    })
  }

  function updateProduct (id) {
    uiStateObj.loading = true
    const request = {
      sku: productStateObj.sku,
      barcode: productStateObj.barcode,
      product_name: productStateObj.product_name,
      unit: productStateObj.unit,
      fraction: productStateObj.fraction,
      status: productStateObj.status,
      avgcost: productStateObj.unitprice,
      lastcost: productStateObj.unitprice,
      unitprice: productStateObj.unitprice,
      price_old: productStateObj.price,
      price: productStateObj.price,
      weight: productStateObj.weight,
      tax: productStateObj.tax,
      description: productStateObj.description,
      category_ids: productStateObj.category_ids
    }
    return api.updateProduct(request, id).then(() => {
      uiStateObj.loading = false
      productStateObj.disabled = true
      productStateObj.successMessage = 'Product has been updated successfully'
      setTimeout(() => {
        productStateObj.successMessage = ''
      }, 3000)
    }).catch(error => {
      uiStateObj.loading = false
      if (error.response.status === 422) {
        productStateObj.errors = error.response.data.errors
      }
    })
  }

  function deleteProduct (id) {
    uiStateObj.loading = true
    return api.deleteProduct(id).then(response => {
      uiStateObj.loading = false
      const statusCode = response.data.code
      if (statusCode === 200) {
        for (let i = 0; i < products.value.length; i++) {
          if (products.value[i].id === id) {
            products.value.splice(i, 1)
          }
        }
      }
      productStateObj.successMessage = 'Product has been deleted successfully'
      setTimeout(() => {
        productStateObj.successMessage = ''
      }, 4000)
    }).catch(error => {
      uiStateObj.loading = false
      console.log(error)
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

  return { getAllProducts, products, openPrevPage, openNextPage, openPage, requestObj, storeProduct, productStateObj, getProductById, updateProduct, deleteProduct }
})
