import api from './api'

// const endpoint = '/categories'

export default {
  getCategories () {
    return api().get('/categories')
  }
}
