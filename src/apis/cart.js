import api from './api'

const endpoint = '/carts'

export default {
  getItems () {
    return api().get(`${endpoint}/user/cart`)
  },

  saveItems (data) {
    return api().post('/carts', data)
  },

  deleteItem (data) {
    return api().post('/carts/delete', data)
  }
}
