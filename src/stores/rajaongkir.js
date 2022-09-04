import { defineStore } from 'pinia'
import { ref } from 'vue'
import rajaongkirApi from '../apis/rajaongkir'

export const useRajaongkirStore = defineStore('rajaongkirStore', () => {
  const provinces = ref([])
  const cities = ref([])

  function getProvinces () {
    return rajaongkirApi.provinces().then(response => {
      this.provinces = response.data.data
    })
  }

  function getCities (provinceId) {
    return rajaongkirApi.cities(provinceId).then(response => {
      this.cities = response.data.data
    })
  }

  return { provinces, cities, getProvinces, getCities }
})
