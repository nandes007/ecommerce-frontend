<script setup>
import MessageComponent from '../../../../components/ui/admin/MessageComponent.vue'
import { useAdminBannerStore } from '../../../../stores/admin/banner'

const { requestObj, bannerStateObj, storeBanner, onFileChange } = useAdminBannerStore()

</script>

<template>
  <div>
    <h1 class="text-xl font-bold">
      Create Banner
    </h1>
    <MessageComponent :success-message="bannerStateObj.successMessage" />
    <div class="border border-slate-400 bg-slate-300 text-xs px-2 py-1.5 font-thin my-4 rounded">
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium, illum?</p>
    </div>
    <form
      class="border border-slate-400 rounded"
      enctype="multipart/form-data"
      @submit.prevent="storeBanner()"
    >
      <div class="bg-slate-300 px-2 py-1 text-xs font-thin">
        Create Banner
      </div>
      <div class="p-2">
        <div class="my-2">
          <label
            for="title"
            class="text-sm"
          >
            Title
          </label>
          <input
            id="title"
            v-model="requestObj.title"
            type="text"
            :class="bannerStateObj.errors && bannerStateObj.errors.title ? 'admin-input-error' : 'admin-input-primary'"
          >
          <p
            v-if="bannerStateObj.errors && bannerStateObj.errors.title"
            class="input-error-message"
          >
            {{ cityStateObj.errors.title[0] }}
          </p>
        </div>
        <div class="my-2">
          <label
            for="url"
            class="text-sm"
          >
            URL
          </label>
          <input
            id="url"
            v-model="requestObj.url"
            type="text"
            :class="bannerStateObj.errors && bannerStateObj.errors.url ? 'admin-input-error' : 'admin-input-primary'"
          >
          <p
            v-if="bannerStateObj.errors && bannerStateObj.errors.url"
            class="input-error-message"
          >
            {{ cityStateObj.errors.url[0] }}
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
            v-model="requestObj.status"
            :class="bannerStateObj.errors && bannerStateObj.errors.status ? 'admin-input-error' : 'admin-input-primary'"
            name="status"
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
            {{ cityStateObj.errors.status[0] }}
          </p>
        </div>
        <div class="my-2">
          <label
            for="imagePath"
            class="text-sm"
          >
            Image
          </label>
          <input
            id="imagePath"
            ref="inputFile"
            type="file"
            :class="bannerStateObj.errors && bannerStateObj.errors.imagePath ? 'admin-input-error' : 'admin-input-primary'"
            @change="onFileChange"
          >
          <p
            v-if="bannerStateObj.errors && bannerStateObj.errors.imagePath"
            class="input-error-message"
          >
            {{ cityStateObj.errors.imagePath[0] }}
          </p>
        </div>
        <div class="flex justify-end mt-4">
          <button
            class="bg-blue-500 px-4 py-1 rounded text-sm text-white hover:opacity-90"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
