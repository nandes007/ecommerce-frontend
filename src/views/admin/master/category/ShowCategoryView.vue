<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useAdminCategoryStore } from '../../../../stores/admin/category'
import MessageComponent from '../../../../components/ui/admin/MessageComponent.vue'

const parentCategories = ref([])
const { getAllCategories, getCategoryById, categoryStateObj, updateCategory } = useAdminCategoryStore()
const param = defineProps({
  id: {
    type: String,
    required: true
  }
})

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

function editCategory () {
  categoryStateObj.disabled = !categoryStateObj.disabled
}

onMounted(() => {
  getAllCategories()
  getCategoryById(param.id)
})

</script>

<template>
  <div>
    <h1 class="text-xl font-bold">
      Category
    </h1>
    <MessageComponent />
    <div class="border border-slate-400 bg-slate-300 text-xs px-2 py-1.5 font-thin my-4 rounded">
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium, illum?</p>
    </div>
    <div class="border border-slate-400 rounded">
      <div class="bg-slate-300 px-2 py-1 text-xs font-thin">
        Category
      </div>
      <div class="p-2">
        <div
          v-if="categoryStateObj.disabled"
          class="flex justify-end"
        >
          <button
            class="bg-blue-500 px-4 py-1 rounded text-sm text-white hover:opacity-90"
            @click="editCategory()"
          >
            Edit Category
          </button>
        </div>
        <div
          v-if="!categoryStateObj.disabled"
          class="flex justify-end"
        >
          <button
            class="bg-blue-500 px-4 py-1 rounded text-sm text-white hover:opacity-90"
            @click="editCategory()"
          >
            Cancel
          </button>
        </div>
        <div
          v-if="categoryStateObj.disabled"
          class="mb-4"
        >
          <h1 class="text-sm text-slate-800">
            Parent Category Name : {{ categoryStateObj.parentCategoryName }}
          </h1>
        </div>
        <div>
          <label
            for="category_name"
            class="text-sm"
          >Category Name</label>
          <input
            v-model="categoryStateObj.name"
            type="text"
            :disabled="categoryStateObj.disabled"
            class="mt-1 px-3 py-1.5 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-200 focus:ring-sky-200 block w-full rounded sm:text-sm text-sm focus:ring-1"
          >
        </div>
        <div
          v-if="!categoryStateObj.disabled"
          class="my-2"
        >
          <label
            for="parentCategory"
            class="text-sm"
          >Select Parent Category</label>
          <v-select
            v-model="categoryStateObj.parentId"
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
        <div
          v-if="!categoryStateObj.disabled"
          class="flex justify-end"
        >
          <button
            class="bg-blue-500 px-4 py-1 rounded text-sm text-white hover:opacity-90"
            @click="updateCategory(id)"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
