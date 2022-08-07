import api from './api'

// const endpoint = '/carts'

export default {
  saveItems (data) {
    return api().post('/carts', data)
  }
}
