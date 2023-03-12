<script setup>
import MessageComponent from '../../../../components/ui/admin/MessageComponent.vue'
import { useAdminProvinceStore } from '../../../../stores/admin/province'

const { requestObj, provinceStateObj, storeProvince } = useAdminProvinceStore()

</script>

<template>
  <div>
    <h1 class="text-xl font-bold">
      Create Province
    </h1>
    <MessageComponent :success-message="provinceStateObj.successMessage" />
    <div class="border border-slate-400 bg-slate-300 text-xs px-2 py-1.5 font-thin my-4 rounded">
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium, illum?</p>
    </div>
    <div class="border border-slate-400 rounded">
      <div class="bg-slate-300 px-2 py-1 text-xs font-thin">
        Create Province
      </div>
      <div class="p-2">
        <div class="my-2">
          <label
            for="city_name"
            class="text-sm"
          >
            Province Name
          </label>
          <input
            v-model="requestObj.name"
            type="text"
            :class="provinceStateObj.errors && provinceStateObj.errors.name ? 'admin-input-error' : 'admin-input-primary'"
          >
          <p
            v-if="provinceStateObj.errors && provinceStateObj.errors.name"
            class="input-error-message"
          >
            {{ provinceStateObj.errors.name[0] }}
          </p>
        </div>
        <div class="flex justify-end mt-4">
          <button
            class="bg-blue-500 px-4 py-1 rounded text-sm text-white hover:opacity-90"
            @click="storeProvince"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
