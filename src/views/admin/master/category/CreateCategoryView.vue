<script setup>
import axios from 'axios'
import { ref } from 'vue'
import MessageComponent from '../../../../components/ui/admin/MessageComponent.vue'
import { useAdminCategoryStore } from '../../../../stores/admin/category'

const parentCategories = ref([])
const { requestObj, storeCategory, categoryStateObj } = useAdminCategoryStore()

function searchCategory (keyword, loading) {
  if (keyword.length < 3) return false
  loading(true)
  axios.get(`http://localhost:8000/api/admin/categories/search?q=${keyword}`).then(response => {
    loading(false)
    parentCategories.value = response.data.data
  }).catch(error => {
    loading(false)
    console.log(error)
  })
}

</script>

<template>
  <div>
    <h1 class="text-xl font-bold">
      Create Category
    </h1>
    <MessageComponent :success-message="categoryStateObj.successMessage" />
    <div class="border border-slate-400 bg-slate-300 text-xs px-2 py-1.5 font-thin my-4 rounded">
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium, illum?</p>
    </div>
    <div class="border border-slate-400 rounded">
      <div class="bg-slate-300 px-2 py-1 text-xs font-thin">
        Create Category
      </div>
      <div class="p-2">
        <div class="my-2">
          <label
            for="category_name"
            class="text-sm"
          >Category Name</label>
          <input
            v-model="requestObj.name"
            type="text"
            :class="categoryStateObj.errors && categoryStateObj.errors.name ? 'admin-input-error' : 'admin-input-primary'"
          >
          <p
            v-if="categoryStateObj.errors && categoryStateObj.errors.name"
            class="input-error-message"
          >
            {{ categoryStateObj.errors.name[0] }}
          </p>
        </div>
        <div class="my-2">
          <label
            for="parentCategory"
            class="text-sm"
          >Select Parent Category</label>
          <v-select
            v-model="requestObj.parentId"
            class="bg-white rounded-md"
            :filterable="false"
            :options="parentCategories"
            :reduce="(label) => label.id"
            @search="searchCategory"
          >
            <template #no-options>
              type to search categories...
            </template>
            <template #option="option">
              <div class="d-center">
                {{ option.id }} - {{ option.name }}
              </div>
            </template>
            <template #selected-option="option">
              <div class="selected d-center">
                {{ option.id }} - {{ option.name }}
              </div>
            </template>
          </v-select>
        </div>
        <div class="flex justify-end mt-4">
          <button
            class="bg-blue-500 px-4 py-1 rounded text-sm text-white hover:opacity-90"
            @click="storeCategory"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
