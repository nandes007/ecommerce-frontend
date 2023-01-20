import api from './api'

// const endpoint = '/orders'

export default {
  store (data) {
    return api().post('/orders', data)
  },
}
