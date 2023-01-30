import api from '../api'

export default {
  getProducts (params) {
    return api().get('/admin/products', { params })
  },

  storeProduct (request) {
    return api().post('/admin/products', request)
  },

  showProduct (id) {
    return api().get(`/admin/products/${id}`)
  }
}
