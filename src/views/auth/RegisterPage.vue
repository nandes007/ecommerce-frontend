<script setup>
import LayoutAuth from '../../components/auth/LayoutAuth.vue'
import { useUserStore } from '../../stores/user'
import PasswordInput from '../../components/PasswordInput.vue'
import PrimaryInput from '../../components/PrimaryInput.vue'

const user = useUserStore()
</script>

<template>
  <div class="register relative">
    <LayoutAuth>Daftar Akun</LayoutAuth>

    <div class="flex justify-center w-full">
      <div class="border shadow p-5 max-w-screen-sm m-4 w-full">
        <form
          action="#"
          @submit.prevent="user.registerUser()"
        >
          <PrimaryInput
            :id="'name'"
            v-model="user.data.name"
            :style="'peer'"
            :placeholder="'Masukkan nama lengkap'"
            :errors="user.errors.name"
          >
            Nama Lengkap
          </PrimaryInput>
          <PrimaryInput
            :id="'email'"
            v-model="user.data.email"
            :placeholder="'Example : email@ninedays.co.id'"
            :errors="user.errors.email"
          >
            Email
          </PrimaryInput>
          <PrimaryInput
            :id="'phone_number'"
            v-model="user.data.phone_number"
            :placeholder="'Example : 0813xxxxxxxx'"
            :errors="user.errors.phone_number"
          >
            No. Hp
          </PrimaryInput>
          <PasswordInput
            :id="'password'"
            v-model="user.data.password"
            :errors="user.errors.password"
            :placeholder="'Masukkan password'"
          />
          <PasswordInput
            :id="'password_confirmation'"
            v-model="user.data.password_confirmation"
            :placeholder="'Masukkan konfirmasi password'"
          >
            Konfirmasi Password
          </PasswordInput>
          <div class="flex justify-center mt-5">
            <button
              class="btn-primary"
            >
              Daftar
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="w-full flex justify-center mt-5 mb-32">
      <h5 class="text-secondary">
        Sudah punya akun?
      </h5>
      <router-link
        to="/login"
        class="text-primary font-semibold hover:underline hover:opacity-75 ml-1"
      >
        Masuk
      </router-link>
    </div>
  </div>
</template>
