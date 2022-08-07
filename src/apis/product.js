import api from './api'

// const endpoint = '/products'

export default {
  getProducts () {
    return api().get('/products')
  }
}
