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
            class="mt-1 px-3 py-1.5 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-200 focus:ring-sky-200 block w-full rounded sm:text-sm text-sm focus:ring-1"
          >
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
