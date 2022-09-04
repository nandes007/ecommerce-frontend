import api from './api.js'

const endpoint = '/users'

export default {
  getUser () {
    return api().get('/users')
  },

  checkAuth () {
    return api().post(`${endpoint}/check`)
  },

  register (data) {
    return api().post(`${endpoint}/register`, data)
  },

  verify (data) {
    return api().post(`${endpoint}/verify`, data)
  },

  resendVerification (data) {
    return api().post(`${endpoint}/resend-verification`, data)
  },

  login (data) {
    return api().post(`${endpoint}/login`, data)
  },

  logout () {
    return api().get(`${endpoint}/logout`)
  },

  forgotPassword (email) {
    return api().post(`${endpoint}/forgot-password`, email)
  },

  resetPassword (data) {
    return api().post(`${endpoint}/reset-password`, data)
  },

  updateProfile (data) {
    return api().put(`${endpoint}/update`, data)
  }
}
