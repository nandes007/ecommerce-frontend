<script setup>
import { onMounted, reactive, ref } from 'vue'
import api from '../../apis/user'
import { useUiStore } from '../../stores/ui'
import LayoutAuth from '../../components/auth/LayoutAuth.vue'
import router from '../../router'

const ui = useUiStore()
const statusCode = ref(0)
const message = ref('')
const data = reactive({
  email: '',
  password: '',
  password_confirmation: '',
  token: ''
})
const props = defineProps({
  token: {
    type: String,
    required: true
  }
})

onMounted(() => {
  localStorage.setItem('r_set_p_en', props.token)
})

function resetPasswordUser () {
  ui.loading = true
  data.email = localStorage.getItem('f_got_idn')
  data.token = localStorage.getItem('r_set_p_en')
  return api.resetPassword(data).then(() => {
    ui.loading = false
    router.push('/login')
  }).catch(() => {
    statusCode.value = 404
    message.value = 'Data yang anda masukkan tidak sesuai.'
    ui.loading = false
  })
}

</script>

<template>
  <div class="login">
    <LayoutAuth>Setel ulang kata sandi</LayoutAuth>

    <div class="w-full flex justify-center">
      <div class="border shadow p-5 max-w-screen-sm m-4 w-full">
        <div
          v-if="statusCode === 404"
          class="my-2"
        >
          <span class="bg-danger px-2 py-1 rounded-lg text-white">{{ message }}</span>
        </div>
        <form @submit.prevent="resetPasswordUser()">
          <label
            for="new_password"
            class="block mt-4 relative"
          >
            <span
              v-show="ui.passwordToggle"
              class="absolute right-2 top-8 text-secondary cursor-pointer"
              @click="ui.passwordToggle = !ui.passwordToggle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </span>
            <span
              v-show="!ui.passwordToggle"
              class="absolute right-2 top-8 text-secondary cursor-pointer"
              @click="ui.passwordToggle = !ui.passwordToggle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                />
              </svg>
            </span>
            <span class="span-required">Password baru</span>
            <input
              id="new_password"
              v-model="data.password"
              :type=" ui.passwordToggle ? 'text' : 'password'"
              class="input-primary"
              placeholder="Masukkan password"
            >
          </label>
          <label
            for="new_password_confirmation"
            class="block mt-4 relative"
          >
            <span
              v-show="ui.passwordConfirmationToggle"
              class="absolute right-2 top-8 text-secondary cursor-pointer"
              @click="ui.passwordConfirmationToggle = !ui.passwordConfirmationToggle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </span>
            <span
              v-show="!ui.passwordConfirmationToggle"
              class="absolute right-2 top-8 text-secondary cursor-pointer"
              @click="ui.passwordConfirmationToggle = !ui.passwordConfirmationToggle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                />
              </svg>
            </span>
            <span class="span-required">Konfirmasi password baru</span>
            <input
              id="new_password_confirmation"
              v-model="data.password_confirmation"
              :type=" ui.passwordConfirmationToggle ? 'text' : 'password'"
              class="input-primary"
              placeholder="Masukkan password"
            >
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
