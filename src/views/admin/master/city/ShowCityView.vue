<script setup>
import { onMounted } from 'vue'
import MessageComponent from '../../../../components/ui/admin/MessageComponent.vue'
import { useAdminCityStore } from '../../../../stores/admin/city'
import { useAdminProvinceStore } from '../../../../stores/admin/province'

const { cityStateObj, getCityById, updateCity } = useAdminCityStore()
const provinceStore = useAdminProvinceStore()
const param = defineProps({
  id: {
    type: String,
    required: true
  }
})

function editCity () {
  cityStateObj.disabled = !cityStateObj.disabled
}

onMounted(() => {
  getCityById(param.id)
  provinceStore.getAllProvincesWithoutPagination()
})
</script>

<template>
  <div>
    <h1 class="text-xl font-bold">
      Edit City
    </h1>
    <MessageComponent :success-message="cityStateObj.successMessage" />

    <div class="border border-slate-400 bg-slate-300 text-xs px-2 py-1.5 font-thin my-4 rounded">
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis, libero.</p>
    </div>
    <div class="border border-slate-400 rounded">
      <div class="bg-slate-300 px-2 py-1 text-xs font-thin">
        Edit City
      </div>

      <div class="p-2">
        <div
          v-if="cityStateObj.disabled"
          class="flex justify-end"
        >
          <button
            class="bg-blue-500 px-4 py-1 rounded text-sm text-white hover:opacity-90"
            @click="editCity()"
          >
            Edit City
          </button>
        </div>
        <div
          v-if="!cityStateObj.disabled"
          class="flex justify-end"
        >
          <button
            class="bg-blue-500 px-4 py-1 rounded text-sm text-white hover:opacity-90"
            @click="editCity()"
          >
            Cancel
          </button>
        </div>

        <div class="my-2">
          <label
            for="city_name"
            class="text-sm"
          >
            Province
          </label>
          <select
            id="province"
            v-model="cityStateObj.provinceId"
            :disabled="cityStateObj.disabled"
            :class="cityStateObj.errors && cityStateObj.errors.province_id ? 'admin-input-error' : 'admin-input-primary'"
          >
            <option value="">
              Select Province
            </option>
            <option
              v-for="province in provinceStore.allProvinces"
              :key="province.id"
              :value="province.id"
            >
              {{ province.name }}
            </option>
          </select>
          <p
            v-if="cityStateObj.errors && cityStateObj.errors.province_id"
            class="input-error-message"
          >
            {{ cityStateObj.errors.province_id[0] }}
          </p>
        </div>

        <div class="my-2">
          <label for="name">
            City
          </label>
          <input
            v-model="cityStateObj.name"
            :disabled="cityStateObj.disabled"
            type="text"
            :class="cityStateObj.errors && cityStateObj.errors.name ? 'admin-input-error' : 'admin-input-primary'"
          >
          <p
            v-if="cityStateObj.errors && cityStateObj.errors.name"
            class="input-error-message"
          >
            {{ cityStateObj.errors.name[0] }}
          </p>
        </div>
        <div
          v-if="!cityStateObj.disabled"
          class="flex justify-end mt-4"
        >
          <button
            class="bg-blue-500 px-4 py-1 rounded text-sm text-white hover:opacity-90"
            @click="updateCity(id)"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
