<script setup>
import { reactive, ref } from 'vue'
import api from '../../apis/user'
import { useUiStore } from '../../stores/ui'
import LayoutAuth from '../../components/auth/LayoutAuth.vue'

const ui = useUiStore()
const statusCode = ref(0)
const message = ref('')
const data = reactive({
  email: ''
})

function sendEmailVerification () {
  ui.loading = true
  return api.forgotPassword(data).then(response => {
    statusCode.value = response.status
    message.value = response.data.status
    localStorage.setItem('f_got_idn', data.email)
    data.email = ''
    ui.loading = false
  }).catch(error => {
    if (error && error.response.status === 422) {
      statusCode.value = error.response.status
      message.value = error.response.data.errors.email[0]
    }
    ui.loading = false
  })
}

</script>

<template>
  <div class="login">
    <LayoutAuth>Lupa kata sandi</LayoutAuth>

    <div class="w-full flex justify-center">
      <div class="border shadow p-5 max-w-screen-sm m-4 w-full">
        <div
          v-if="statusCode === 200"
          class="my-2"
        >
          <span class="bg-success px-2 py-1 rounded-lg text-white">{{ message }}</span>
        </div>
        <div
          v-if="statusCode === 422"
          class="my-2"
        >
          <span class="bg-danger px-2 py-1 rounded-lg text-white">{{ message }}</span>
        </div>
        <form @submit.prevent="sendEmailVerification()">
          <label
            for="email"
            class="block"
          >
            <span class="span-required">Email</span>
            <input
              id="verify_code"
              v-model="data.email"
              type="text"
              class="input-primary"
              placeholder="Masukkan kode verifikasi..."
            >
            <p class="text-xs">Selanjutkan konfirmasi akan dikirim melalui email.</p>
          </label>
          <div class="flex justify-center mt-5">
            <button
              class="btn-primary"
            >
              Kirim
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
