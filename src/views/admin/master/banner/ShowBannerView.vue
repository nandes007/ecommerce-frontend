<script setup>
import { onMounted } from 'vue'
import MessageComponent from '../../../../components/ui/admin/MessageComponent.vue'
import { useAdminBannerStore } from '../../../../stores/admin/banner'

const { bannerStateObj, getBannerById, updateBanner } = useAdminBannerStore()
const param = defineProps({
  id: {
    type: String,
    required: true
  }
})

function editBanner () {
  bannerStateObj.disabled = !bannerStateObj.disabled
}

onMounted(() => {
  getBannerById(param.id)
})
</script>

<template>
  <div>
    <h1 class="text-xl font-bold">
      Edit Banner
    </h1>
    <MessageComponent :success-message="bannerStateObj.successMessage" />

    <div class="border border-slate-400 bg-slate-300 text-xs px-2 py-1.5 font-thin my-4 rounded">
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis, libero.</p>
    </div>
    <div class="border border-slate-400 rounded">
      <div class="bg-slate-300 px-2 py-1 text-xs font-thin">
        Edit Banner
      </div>

      <div class="p-2">
        <div
          v-if="bannerStateObj.disabled"
          class="flex justify-end"
        >
          <button
            class="bg-blue-500 px-4 py-1 rounded text-sm text-white hover:opacity-90"
            @click="editBanner()"
          >
            Edit City
          </button>
        </div>
        <div
          v-if="!bannerStateObj.disabled"
          class="flex justify-end"
        >
          <button
            class="bg-blue-500 px-4 py-1 rounded text-sm text-white hover:opacity-90"
            @click="editBanner()"
          >
            Cancel
          </button>
        </div>

        <div class="my-2">
          <label
            for="title"
            class="text-sm"
          >
            Title
          </label>
          <input
            id="title"
            v-model="bannerStateObj.title"
            :disabled="bannerStateObj.disabled"
            type="text"
            :class="bannerStateObj.errors && bannerStateObj.errors.title ? 'admin-input-error' : 'admin-input-primary'"
          >
          <p
            v-if="bannerStateObj.errors && bannerStateObj.errors.title"
            class="input-error-message"
          >
            {{ bannerStateObj.errors.title[0] }}
          </p>
        </div>

        <div class="my-2">
          <label
            for="url"
            class="text-sm"
          >
            Url
          </label>
          <input
            id="url"
            v-model="bannerStateObj.url"
            :disabled="bannerStateObj.disabled"
            type="text"
            :class="bannerStateObj.errors && bannerStateObj.errors.url ? 'admin-input-error' : 'admin-input-primary'"
          >
          <p
            v-if="bannerStateObj.errors && bannerStateObj.errors.url"
            class="input-error-message"
          >
            {{ bannerStateObj.errors.url[0] }}
          </p>
        </div>

        <div class="my-2">
          <label
            for="status"
            class="text-sm"
          >
            Status
          </label>
          <select
            id="status"
            v-model="bannerStateObj.status"
            :class="bannerStateObj.errors && bannerStateObj.errors.status ? 'admin-input-error' : 'admin-input-primary'"
            name="status"
            :disabled="bannerStateObj.disabled"
          >
            <option
              value=""
              disabled
            >
              Select a status
            </option>
            <option value="active">
              Active
            </option>
            <option value="inactive">
              Inactive
            </option>
          </select>
          <p
            v-if="bannerStateObj.errors && bannerStateObj.errors.status"
            class="input-error-message"
          >
            {{ bannerStateObj.errors.status[0] }}
          </p>
        </div>

        <div class="my-2">
          <label
            for="image_path"
            class="text-sm"
          >
            Image
          </label>
          <input
            id="image_path"
            :disabled="bannerStateObj.disabled"
            type="file"
            :class="bannerStateObj.errors && bannerStateObj.errors.imagePath ? 'admin-input-error' : 'admin-input-primary'"
          >
          <p
            v-if="bannerStateObj.errors && bannerStateObj.errors.status"
            class="input-error-message"
          >
            {{ bannerStateObj.errors.status[0] }}
          </p>
        </div>

        <div
          class="my-2 relative border border-slate-400 p-4 flex items-center justify-center"
          @mouseenter="bannerStateObj.isHover = true"
          @mouseleave="bannerStateObj.isHover = false"
        >
          <img
            :src="bannerStateObj.imagePreview"
            :class="bannerStateObj.isHover ? 'opacity-40 rounded' : ''"
          >
          <button
            v-if="bannerStateObj.isHover"
            class="absolute px-2 bg-red-500 rounded text-white flex items-center py-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="w-5 h-5"
            >
              <path
                fill-rule="evenodd"
                d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                clip-rule="evenodd"
              />
            </svg>

            Delete
          </button>
        </div>

        <div
          v-if="!bannerStateObj.disabled"
          class="flex justify-end mt-4"
        >
          <button
            class="bg-blue-500 px-4 py-1 rounded text-sm text-white hover:opacity-90"
            @click="updateBanner(id)"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
