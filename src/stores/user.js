import { defineStore } from 'pinia'
import { useUiStore } from './ui'
import api from '../apis/user'
import route from '../router'
import { useCartStore } from './cart'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    user: {
      name: '',
      email: '',
      phone_number: '',
      gender: '',
      birth_of_date: '',
      type: '',
      province_id: '',
      city_id: '',
      address: '',
      postalcode: ''
    },
    data: {
      name: '',
      email: '',
      phone_number: '',
      password: '',
      password_confirmation: ''
    },
    form: {
      email: '',
      password: '',
      device_name: navigator.userAgent
    },
    isAuthenticated: false,
    errors: []
  }),

  actions: {
    getUser () {
      const cartStore = useCartStore()
      if (this.isAuthenticated) {
        return api.getUser().then(response => {
          this.user.name = response.data.data.name
          this.user.email = response.data.data.email
          this.user.phone_number = response.data.data.phone_number
          this.user.gender = response.data.data.gender
          this.user.birth_of_date = response.data.data.birth_of_date
          this.user.type = response.data.data.type
          this.user.province_id = response.data.data.province_id
          this.user.city_id = response.data.data.city_id
          this.user.address = response.data.data.address
          this.user.postalcode = response.data.data.postalcode
          cartStore.setItemCarts()
        })
      }
    },

    checkAuth () {
      this.errors = []
      const token = localStorage.getItem('_token')
      if (token) {
        return api.checkAuth().then(() => {
          this.isAuthenticated = true
          this.getUser()
        }).catch(error => {
          if (error.response.status === 401) {
            localStorage.removeItem('_token')
            this.isAuthenticated = false
          }
        })
      }
    },

    registerUser () {
      this.errors = []
      const ui = useUiStore()
      ui.loading = true
      return api.register(this.data).then(response => {
        ui.loading = false
        localStorage.setItem('_c_il', `${response.data.data}`)
        route.push(`/verify/${response.data.data}`)
        this.resetValue()
      }).catch(error => {
        ui.loading = false
        if (error && error.response.status === 422) {
          this.errors = error.response.data.errors
        }
        this.data.password = ''
        this.data.password_confirmation = ''
      })
    },

    loginUser () {
      this.errors = []
      const ui = useUiStore()
      ui.loading = true
      return api.login(this.form).then(response => {
        localStorage.setItem('_token', response.data.data)
        this.isAuthenticated = true
        this.getUser()
        route.push('/')
        ui.loading = false
        this.resetValue()
      }).catch(error => {
        ui.loading = false
        if (error && error.response.status === 422) {
          this.errors = error.response.data.errors
        }
        this.form.password = ''
      })
    },

    logoutUser () {
      const cartStore = useCartStore()
      this.errors = []
      const ui = useUiStore()
      ui.loading = true
      return api.logout().then(() => {
        localStorage.removeItem('_token')
        this.isAuthenticated = false
        ui.loading = false
        cartStore.carts = []
      })
    },

    updateProfile () {
      const uiStore = useUiStore()
      uiStore.loading = true
      return api.updateProfile(this.user).then(() => {
        uiStore.loading = false
      })
    },

    resetValue () {
      this.data.name = ''
      this.data.email = ''
      this.data.phone_number = ''
      this.data.password = ''
      this.data.password_confirmation = ''
      this.form.email = ''
      this.form.password = ''
    },

    redirectLogin () {
      route.push('/login')
    }
  }
})
