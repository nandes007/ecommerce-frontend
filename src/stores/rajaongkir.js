import { defineStore } from 'pinia'
import { ref } from 'vue'
import rajaongkirApi from '../apis/rajaongkir'

export const useRajaongkirStore = defineStore('rajaongkirStore', () => {
  const provinces = ref([])
  const cities = ref([])
  const costs = ref([])
  const cost = null

  function getProvinces () {
    const provinces = JSON.parse(localStorage.getItem('provinces'))
    if (!provinces) {
      return rajaongkirApi.provinces().then(response => {
        this.provinces = response.data.data
        localStorage.setItem('provinces', JSON.stringify(this.provinces))
      })
    } else {
      this.provinces = provinces
    }
  }

  function getCities (provinceId) {
    const cities = JSON.parse(localStorage.getItem('cities'))
    if (!cities) {
      return rajaongkirApi.cities(provinceId).then(response => {
        this.cities = response.data.data
        localStorage.setItem('cities', JSON.stringify(this.cities))
      })
    } else {
      this.cities = cities
    }
  }

  function getCost (param) {
    return rajaongkirApi.cost(param).then(response => {
      this.costs = response.data.data[0].costs
    })
  }

  return { provinces, cities, costs, cost, getProvinces, getCities, getCost }
})
