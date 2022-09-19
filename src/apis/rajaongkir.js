import api from './api'

const endpoint = '/rajaongkir'

export default {
  provinces () {
    return api().get(`${endpoint}/provinces`)
  },

  cities (provinceId) {
    return api().get(`${endpoint}/cities/${provinceId}`)
  },

  cost (courier) {
    return api().get(`${endpoint}/cost/${courier}`)
  }
}
