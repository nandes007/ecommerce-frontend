<script setup>
import api from '../../apis/user'
import LayoutAuth from '../../components/auth/LayoutAuth.vue'
import { useUiStore } from '../../stores/ui'
import { computed, onMounted, reactive, ref, watch, watchEffect } from 'vue'

const ui = useUiStore()
const verify = reactive({
  email: '',
  code: ''
})
const ct = ref(['', '', '', '', '', ''])
const msg = ref('')
const loading = ref(false)
const input = ref(null)

const ctSize = computed(() => {
  return ct.value.length
})
const cIndex = computed(() => {
  let i = ct.value.findIndex(item => item === '')
  i = (i + ctSize.value) % ctSize.value
  return i
})
const lastCode = computed(() => {
  return ct.value[ctSize.value - 1]
})

watch(cIndex, () => resetCaret())

watchEffect(() => {
  if (lastCode.value) {
    input.value[ctSize.value - 1].blur()
    sendCaptcha()
  }
}
)

onMounted(() => {
  resetCaret()
})

function onInput (val, index) {
  msg.value = ''
  val = val.replace(/\s/g, '')
  if (index === ctSize.value - 1) {
    ct.value[ctSize.value - 1] = val[0]
  } else if (val.length > 1) {
    let i = index
    for (i = index; i < ctSize.value && i - index < val.length; i++) {
      ct.value[i] = val[i]
    }
    resetCaret()
  }
}

function resetCaret () {
  input.value[ctSize.value - 1].focus()
}

function onFocus () {
  let index = ct.value.findIndex(item => item === '')
  index = (index + ctSize.value) % ctSize.value
  input.value[index].focus()
}

function onKeydown (val, index) {
  if (val === '') {
    if (index > 0) {
      ct.value[index - 1] = ''
      input.value[index - 1].focus()
    }
  }
}

function sendCaptcha () {
  ui.loading = true
  verify.email = localStorage.getItem('_c_il')
  verify.code = ct.value.join('')
  return api.verify(verify).then(() => {
    ui.redirectLogin()
    ui.loading = false
  }).catch(error => {
    reset()
    const ress = error.response.data.message
    if (ress) {
      msg.value = ress
    }
    ui.loading = false
  })
}

function reSendCaptcha () {
  ui.loading = true
  msg.value = ''
  const data = { email: localStorage.getItem('_c_il') }
  return api.resendVerification(data).then(() => {
    ui.loading = false
    onFocus()
  }).catch(() => {
    msg.value = 'something went wrong'
    ui.loading = false
    onFocus()
  })
}

function reset () {
  ct.value = ct.value.map(item => '')
}

</script>

<template>
  <div class="login">
    <LayoutAuth>Verifikasi Akun</LayoutAuth>

    <div class="w-full flex justify-center">
      <div class="border shadow p-5 max-w-screen-sm m-4 w-full">
        <div
          v-if="msg"
          class="mb-2 rounded-full text-sm text-danger w-full text-center"
        >
          <p>
            {{ msg }}
          </p>
        </div>
        <form>
          <label
            for="email"
            class="block"
          >
            <span class="span-required text-center">Kode Verifikasi</span>
            <div class="flex w-full justify-center items-center">
              <input
                v-for="(c, index) in ct"
                :key="index"
                ref="input"
                v-model="ct[index]"
                type="text"
                class="px-3 py-1 mr-2 border w-12 md:16 lg:w-16 text-center rounded-full focus:outline-none focus:ring-1 focus:ring-primary focus:border placeholder:italic placeholder:text-secondary block mt-1 text-xl"
                :disabled="loading"
                @input="e => { onInput(e.target.value, index) }"
                @keydown.delete="e => {onKeydown(e.target.value, index)}"
                @focus="onFocus"
              >
            </div>
          </label>
          <div class="flex justify-center mt-5">
            <button
              type="button"
              class="btn-primary"
              @click="reSendCaptcha()"
            >
              Kirim ulang kode verifikasi
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
