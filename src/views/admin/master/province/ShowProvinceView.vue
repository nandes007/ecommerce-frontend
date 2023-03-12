<script setup>
import { onMounted } from 'vue'
import MessageComponent from '../../../../components/ui/admin/MessageComponent.vue'
import { useAdminProvinceStore } from '../../../../stores/admin/province'

const { provinceStateObj, getProvinceById, updateProvince } = useAdminProvinceStore()
const param = defineProps({
  id: {
    type: String,
    required: true
  }
})

function editProvince () {
  provinceStateObj.disabled = !provinceStateObj.disabled
}

onMounted(() => {
  getProvinceById(param.id)
})
</script>

<template>
  <div>
    <h1 class="text-xl font-bold">
      Edit Province
    </h1>
    <MessageComponent :success-message="provinceStateObj.successMessage" />

    <div class="border border-slate-400 bg-slate-300 text-xs px-2 py-1.5 font-thin my-4 rounded">
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis, libero.</p>
    </div>
    <div class="border border-slate-400 rounded">
      <div class="bg-slate-300 px-2 py-1 text-xs font-thin">
        Edit Province
      </div>

      <div class="p-2">
        <div
          v-if="provinceStateObj.disabled"
          class="flex justify-end"
        >
          <button
            class="bg-blue-500 px-4 py-1 rounded text-sm text-white hover:opacity-90"
            @click="editProvince()"
          >
            Edit Province
          </button>
        </div>
        <div
          v-if="!provinceStateObj.disabled"
          class="flex justify-end"
        >
          <button
            class="bg-blue-500 px-4 py-1 rounded text-sm text-white hover:opacity-90"
            @click="editProvince()"
          >
            Cancel
          </button>
        </div>

        <div class="my-2">
          <label for="name">
            Province
          </label>
          <input
            v-model="provinceStateObj.name"
            :disabled="provinceStateObj.disabled"
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
        <div
          v-if="!provinceStateObj.disabled"
          class="flex justify-end mt-4"
        >
          <button
            class="bg-blue-500 px-4 py-1 rounded text-sm text-white hover:opacity-90"
            @click="updateProvince(id)"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
