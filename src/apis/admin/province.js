import api from '../api'

export default {
  getProvinces (params) {
    return api().get('/admin/provinces', { params })
  },

  storeProvince (request) {
    return api().post('/admin/provinces', request)
  },

  showProvince (id) {
    return api().get(`/admin/provinces/${id}`)
  },

  updateProvince (id, request) {
    return api().put(`/admin/provinces/${id}`, request)
  },

  deleteProvince (id) {
    return api().delete(`/admin/provinces/${id}`)
  }
}
