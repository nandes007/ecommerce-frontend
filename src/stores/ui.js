import { defineStore } from 'pinia'
import { ref } from 'vue'
import route from '../router'

export const useUiStore = defineStore('uiStore', () => {
  const passwordToggle = ref(false)
  const passwordConfirmationToggle = ref(false)
  const loading = ref(false)

  function redirectLogin () {
    route.push('/login')
  }

  function isNumber (event) {
    event = (event) || window.event
    const charCode = (event.which) ? event.which : event.keyCode
    if ((charCode > 31 && (charCode < 48 || charCode > 57))) {
      event.preventDefault()
    } else {
      return true
    }
  }

  function priceFormat (val) {
    const num = val.toString()
    const a = num.length % 3
    let b = num.substr(0, a)
    const c = num.substr(a).match(/\d{3}/g)
    let f = 'Rp '

    if (c) {
      const d = a ? '.' : ''
      b += d + c.join('.')
      f += b
    }

    return f
  }

  return { passwordToggle, passwordConfirmationToggle, loading, redirectLogin, isNumber, priceFormat }
})
