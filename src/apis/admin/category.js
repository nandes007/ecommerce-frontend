import api from '../api'

export default {
  getCategories (params) {
    return api().get('/admin/categories', { params })
  },

  storeCategory (request) {
    return api().post('/admin/categories', request)
  },

  showCategory (id) {
    return api().get(`/admin/categories/${id}`)
  },

  updateCategory (id, request) {
    return api().patch(`/admin/categories/${id}`, request)
  },

  deleteCategory (id) {
    return api().delete(`/admin/categories/${id}`)
  }
}
