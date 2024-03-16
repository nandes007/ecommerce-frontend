<script setup>
import LayoutAuth from '../../components/auth/LayoutAuth.vue'
import { useUserStore } from '../../stores/user'
import PasswordInput from '../../components/PasswordInput.vue'
import PrimaryInput from '../../components/PrimaryInput.vue'

const user = useUserStore()
</script>

<template>
  <div class="login auth h-full">
    <LayoutAuth>Masuk</LayoutAuth>

    <div class="w-full relative flex justify-center">
      <div class="border shadow p-5 max-w-screen-sm m-4 w-full">
        <div
          v-if="user.errors"
          class="mb-2 rounded-full text-sm text-danger w-full"
        >
          <p v-if="user.errors.email">
            {{ user.errors.email[0] }}
          </p>
          <p v-if="user.errors.password">
            {{ user.errors.password[0] }}
          </p>
          <p v-if="user.errors.message">
            {{ user.errors.message[0] }}
          </p>
        </div>
        <form
          action="#"
          @submit.prevent="user.loginUser()"
        >
          <div class="flex bg-red-600 text-white rounded-full justify-center">
            {{ user.errorMessage }}
          </div>
          
          <PrimaryInput
            :id="'email'"
            v-model="user.form.email"
            :placeholder="'Masukkan email...'"
          >
            Email
          </PrimaryInput>
          <PasswordInput
            :id="'password'"
            v-model="user.form.password"
            :placeholder="'Masukkan password'"
          >
            Password
          </PasswordInput>
          <span class="block my-4 text-end">
            <router-link
              to="/forgot-password"
              class="underline hover:text-primary text-secondary"
            >Lupa kata sandi?</router-link>
          </span>
          <div class="flex justify-center">
            <button
              type="submit"
              class="btn-primary"
            >
              Masuk
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="w-full flex justify-center mt-5">
      <span>
        <router-link
          to="/register"
          class="text-primary font-semibold hover:underline hover:opacity-75"
        >Buat akun baru</router-link>
      </span>
    </div>
  </div>
</template>
