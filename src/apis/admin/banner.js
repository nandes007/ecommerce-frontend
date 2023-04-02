import api from '../api'

export default {
  getBanners (params) {
    return api().get('/admin/banners', { params })
  },

  storeBanner (request) {
    return api().post('/admin/banners', request)
  },

  showBanner (id) {
    return api().get(`/admin/banners/${id}`)
  },

  updateBanner (id, request) {
    return api().patch(`/admin/banners/${id}`, request)
  },

  deleteBanner (id) {
    return api().delete(`admin/banners/${id}`)
  }
}
