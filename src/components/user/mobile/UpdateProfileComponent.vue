<script setup>
import { useUiStore } from '../../../stores/ui'
import { useRajaongkirStore } from '../../../stores/rajaongkir'
import { useUserStore } from '../../../stores/user'
import PrimaryButton from '../../PrimaryButton.vue'
import { watchEffect } from 'vue'

const uiStore = useUiStore()
const rajaongkirStore = useRajaongkirStore()
const userStore = useUserStore()

function changeProvice (e) {
  const provinceId = e.target.value
  rajaongkirStore.getCities(provinceId)
}

watchEffect(() => {
  if (userStore.user.province_id !== '') {
    rajaongkirStore.getCities(userStore.user.province_id)
  }
})
</script>

<template>
  <div
    v-if="uiStore.updateProfileToggle"
    class="fixed w-full h-full bg-white inset-0 overflow-y-scroll"
  >
    <div class="flex py-3 space-x-2 px-2 border-b border-cloudy fixed w-full bg-white items-center">
      <span @click="uiStore.updateProfileToggle = false">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </span>
      <h1>Ubah Profile</h1>
    </div>
    <div class="flex justify-center border-b border-cloudy pt-10">
      <img
        src="../../../assets/img/profile-pict.svg"
        alt="Profile Picture"
        class="w-1/4"
      >
    </div>
    <form class="pb-4 px-2">
      <div class="pt-4">
        <h1>Nama</h1>
        <input
          v-model="userStore.user.name"
          type="text"
          class="input-primary"
        >
      </div>
      <div class="pt-4">
        <h1>Email</h1>
        <input
          v-model="userStore.user.email"
          type="text"
          disabled
          class="input-primary"
        >
      </div>
      <div class="pt-4">
        <h1>No HP</h1>
        <input
          v-model="userStore.user.phone_number"
          disabled
          type="text"
          class="input-primary"
        >
      </div>
      <div class="pt-4">
        <h1>Tanggal Lahir</h1>
        <input
          v-model="userStore.user.birth_of_date"
          type="date"
          class="input-primary"
        >
      </div>
      <div class="pt-4">
        <h1>Jenis Kelamin</h1>
        <select
          id="gender"
          v-model="userStore.user.gender"
          name="gender"
          class="input-primary"
        >
          <option value="Laki-laki">
            Laki-Laki
          </option>
          <option value="Perempuan">
            Perempuan
          </option>
        </select>
      </div>
      <div class="pt-4">
        <h1>Provinsi</h1>
        <select
          id="province"
          v-model="userStore.user.province_id"
          name="province"
          class="input-primary"
          @change="changeProvice"
        >
          <option
            v-for="province in rajaongkirStore.provinces"
            :key="province.province_id"
            :value="province.province_id"
          >
            {{ province.province }}
          </option>
        </select>
      </div>
      <div class="pt-4">
        <h1>Kota</h1>
        <select
          id="city"
          v-model="userStore.user.city_id"
          name="city"
          class="input-primary"
        >
          <option
            v-for="city in rajaongkirStore.cities"
            :key="city.city_id"
            :value="city.city_id"
          >
            {{ city.city_name }}
          </option>
        </select>
      </div>
      <div class="pt-4">
        <h1>Alamat</h1>
        <input
          v-model="userStore.user.address"
          type="text"
          class="input-primary"
        >
      </div>
      <div class="pt-4">
        <h1>Kode Pos</h1>
        <input
          v-model="userStore.user.postalcode"
          type="text"
          class="input-primary"
        >
      </div>
      <div class="pt-4 flex">
        <PrimaryButton
          :style="'w-full'"
          @click="userStore.updateProfile()"
        >
          Simpan Perubahan
        </PrimaryButton>
      </div>
    </form>
  </div>
</template>
