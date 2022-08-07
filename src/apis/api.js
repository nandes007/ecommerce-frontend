import axios from 'axios'

const BaseApi = axios.create({
  baseURL: 'http://localhost:8000/api'
})

const api = function () {
  const token = localStorage.getItem('_token')

  if (token) {
    BaseApi.defaults.headers.common.Authorization = `Bearer ${token}`
  }

  return BaseApi
}

export default api
