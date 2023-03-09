import api from '../api'

export default {
  getCities (params) {
    return api().get('/admin/cities', { params })
  },

  storeCity (request) {
    return api().post('/admin/cities', request)
  },

  showCity (id) {
    return api().get(`/admin/cities/${id}`)
  },

  updateCity (id, request) {
    return api().put(`/admin/cities/${id}`, request)
  },

  deleteCity (id) {
    return api().delete(`/admin/cities/${id}`)
  }
}
