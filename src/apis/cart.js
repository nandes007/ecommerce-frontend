import api from './api'

const endpoint = '/carts'

export default {
  getItems () {
    return api().get(`${endpoint}`)
  },

  saveItems (data) {
    return api().post('/carts', data)
  },

  deleteItem (data) {
    return api().post('/carts/delete', data)
  },

  updateQty (data) {
    return api().patch(`${endpoint}/update`, data)
  }
}
