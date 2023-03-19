<script setup>
import { onMounted } from 'vue'
import MessageComponent from '../../../../components/ui/admin/MessageComponent.vue'
import { useAdminProductStore } from '../../../../stores/admin/product'
import { useAdminCategoryStore } from '../../../../stores/admin/category'

const { productStateObj, getProductById, updateProduct } = useAdminProductStore()
const adminCategorystore = useAdminCategoryStore()
const param = defineProps({
  id: {
    type: String,
    required: true
  }
})

function editProduct () {
  productStateObj.disabled = !productStateObj.disabled
}

onMounted(() => {
  getProductById(param.id)
  adminCategorystore.getCategoryDropdown()
})

</script>

<template>
  <div>
    <h1 class="text-xl font-bold">
      Edit Product
    </h1>
    <MessageComponent :success-message="productStateObj.successMessage" />
    <div class="border border-slate-400 bg-slate-300 text-xs px-2 py-1.5 font-thin my-4 rounded">
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium, illum?</p>
    </div>
    <div class="border border-slate-400 rounded">
      <div class="bg-slate-300 px-2 py-1 text-xs font-thin">
        Edit Product
      </div>
      <div class="p-2">
        <div
          v-if="productStateObj.disabled"
          class="flex justify-end"
        >
          <button
            class="bg-blue-500 px-4 py-1 rounded text-sm text-white hover:opacity-90"
            @click="editProduct()"
          >
            Edit Category
          </button>
        </div>
        <div
          v-if="!productStateObj.disabled"
          class="flex justify-end"
        >
          <button
            class="bg-blue-500 px-4 py-1 rounded text-sm text-white hover:opacity-90"
            @click="editProduct()"
          >
            Cancel
          </button>
        </div>
        <div class="my-2">
          <label
            for="category_name"
            class="text-sm"
          >SKU</label>
          <input
            v-model="productStateObj.sku"
            :disabled="productStateObj.disabled"
            type="text"
            :class="productStateObj.errors && productStateObj.errors.sku ? 'admin-input-error' : 'admin-input-primary'"
          >
          <p
            v-if="productStateObj.errors && productStateObj.errors.sku"
            class="input-error-message"
          >
            {{ productStateObj.errors.sku[0] }}
          </p>
        </div>
        <div class="my-2">
          <label
            for="category_name"
            class="text-sm"
          >Barcode</label>
          <input
            v-model="productStateObj.barcode"
            :disabled="productStateObj.disabled"
            type="text"
            :class="productStateObj.errors && productStateObj.errors.barcode ? 'admin-input-error' : 'admin-input-primary'"
          >
          <p
            v-if="productStateObj.errors && productStateObj.errors.barcode"
            class="input-error-message"
          >
            {{ productStateObj.errors.barcode[0] }}
          </p>
        </div>
        <div class="my-2">
          <label
            for="category_name"
            class="text-sm"
          >Product Name</label>
          <input
            v-model="productStateObj.product_name"
            :disabled="productStateObj.disabled"
            type="text"
            :class="productStateObj.errors && productStateObj.errors.product_name ? 'admin-input-error' : 'admin-input-primary'"
          >
          <p
            v-if="productStateObj.errors && productStateObj.errors.product_name"
            class="input-error-message"
          >
            {{ productStateObj.errors.product_name[0] }}
          </p>
        </div>
        <div class="my-2 flex justify-between">
          <div class="w-1/3 pr-4">
            <label
              for="avgcost"
              class="text-sm"
            >Avg Cost</label>
            <input
              id="avgcost"
              v-model="productStateObj.unitprice"
              disabled
              type="text"
              :class="productStateObj.errors && productStateObj.errors.avgcost ? 'admin-input-error' : 'admin-input-primary'"
            >
            <p
              v-if="productStateObj.errors && productStateObj.errors.avgcost"
              class="input-error-message"
            >
              {{ productStateObj.errors.avgcost[0] }}
            </p>
          </div>
          <div class="w-1/3 pr-4">
            <label
              for="last_cost"
              class="text-sm"
            >Last Cost</label>
            <input
              id="last_cost"
              v-model="productStateObj.unitprice"
              disabled
              type="text"
              :class="productStateObj.errors && productStateObj.errors.avgcost ? 'admin-input-error' : 'admin-input-primary'"
            >
            <p
              v-if="productStateObj.errors && productStateObj.errors.lastcost"
              class="input-error-message"
            >
              {{ productStateObj.errors.lastcost[0] }}
            </p>
          </div>
          <div class="w-1/3">
            <label
              for="price_old"
              class="text-sm"
            >Price Old</label>
            <input
              id="price_old"
              v-model="productStateObj.price"
              disabled
              type="text"
              :class="productStateObj.errors && productStateObj.errors.price_old ? 'admin-input-error' : 'admin-input-primary'"
            >
            <p
              v-if="productStateObj.errors && productStateObj.errors.price_old"
              class="input-error-message"
            >
              {{ productStateObj.errors.price_old[0] }}
            </p>
          </div>
        </div>
        <div class="my-2 flex justify-between">
          <div class="w-1/2 pr-4">
            <label
              for="category_name"
              class="text-sm"
            >Unit</label>
            <input
              v-model="productStateObj.unit"
              :disabled="productStateObj.disabled"
              type="text"
              :class="productStateObj.errors && productStateObj.errors.unit ? 'admin-input-error' : 'admin-input-primary'"
            >
            <p
              v-if="productStateObj.errors && productStateObj.errors.unit"
              class="input-error-message"
            >
              {{ productStateObj.errors.unit[0] }}
            </p>
          </div>
          <div class="w-1/2">
            <label
              for="category_name"
              class="text-sm"
            >Fraction</label>
            <input
              v-model="productStateObj.fraction"
              :disabled="productStateObj.disabled"
              type="text"
              :class="productStateObj.errors && productStateObj.errors.fraction ? 'admin-input-error' : 'admin-input-primary'"
            >
            <p
              v-if="productStateObj.errors && productStateObj.errors.fraction"
              class="input-error-message"
            >
              {{ productStateObj.errors.fraction[0] }}
            </p>
          </div>
        </div>
        <div class="my-2 flex justify-between">
          <div class="w-1/2 pr-4">
            <label
              for="category_name"
              class="text-sm"
            >Unit Price</label>
            <input
              v-model="productStateObj.unitprice"
              :disabled="productStateObj.disabled"
              type="text"
              :class="productStateObj.errors && productStateObj.errors.unitprice ? 'admin-input-error' : 'admin-input-primary'"
            >
            <p
              v-if="productStateObj.errors && productStateObj.errors.unitprice"
              class="input-error-message"
            >
              {{ productStateObj.errors.unitprice[0] }}
            </p>
          </div>
          <div class="w-1/2">
            <label
              for="category_name"
              class="text-sm"
            >Sell Price</label>
            <input
              v-model="productStateObj.price"
              :disabled="productStateObj.disabled"
              type="text"
              :class="productStateObj.errors && productStateObj.errors.price ? 'admin-input-error' : 'admin-input-primary'"
            >
            <p
              v-if="productStateObj.errors && productStateObj.errors.price"
              class="input-error-message"
            >
              {{ productStateObj.errors.price[0] }}
            </p>
          </div>
        </div>
        <div class="my-2 flex justify-between">
          <div class="w-1/3 pr-4">
            <label
              for="category_name"
              class="text-sm"
            >Weight</label>
            <input
              v-model="productStateObj.weight"
              :disabled="productStateObj.disabled"
              type="text"
              :class="productStateObj.errors && productStateObj.errors.weight ? 'admin-input-error' : 'admin-input-primary'"
            >
            <p
              v-if="productStateObj.errors && productStateObj.errors.weight"
              class="input-error-message"
            >
              {{ productStateObj.errors.weight[0] }}
            </p>
          </div>
          <div class="w-1/3 pr-4">
            <label
              for="category_name"
              class="text-sm"
            >Tax</label>
            <select
              v-model="productStateObj.tax"
              :disabled="productStateObj.disabled"
              :class="productStateObj.errors && productStateObj.errors.tax ? 'admin-input-error' : 'admin-input-primary'"
            >
              <option value="1">
                Y
              </option>
              <option value="0">
                N
              </option>
            </select>
            <p
              v-if="productStateObj.errors && productStateObj.errors.tax"
              class="input-error-message"
            >
              {{ productStateObj.errors.tax[0] }}
            </p>
          </div>
          <div class="w-1/3">
            <label
              for="category_name"
              class="text-sm"
            >Status</label>
            <select
              v-model="productStateObj.status"
              :disabled="productStateObj.disabled"
              :class="productStateObj.errors && productStateObj.errors.status ? 'admin-input-error' : 'admin-input-primary'"
            >
              <option value="active">
                Active
              </option>
              <option value="inactive">
                Inactive
              </option>
            </select>
            <p
              v-if="productStateObj.errors && productStateObj.errors.status"
              class="input-error-message"
            >
              {{ productStateObj.errors.status[0] }}
            </p>
          </div>
        </div>
        <div class="my-2">
          <label
            for="category_name"
            class="text-sm"
          >Description</label>
          <textarea
            v-model="productStateObj.description"
            :disabled="productStateObj.disabled"
            type="text"
            class="mt-1 px-3 py-1.5 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-200 focus:ring-sky-200 block w-full rounded sm:text-sm text-sm focus:ring-1"
          />
        </div>
        <div class="border border-gray-400 p-2 rounded">
          <label
            for="category_name"
            class="text-sm"
          >Category</label>
          <div class="mb-2">
            <input
              type="text"
              placeholder="Search options"
              class="mt-1 px-3 py-1.5 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-200 focus:ring-sky-200 block w-full rounded sm:text-sm text-sm focus:ring-1"
              :disabled="productStateObj.disabled"
              @input="adminCategorystore.searchCategoryDropdown"
            >
          </div>
          <div class="max-h-40 overflow-y-scroll">
            <div
              v-for="option in adminCategorystore.categoriesDropdown"
              :key="option.value"
              class="mb-2"
            >
              <label class="flex items-center cursor-pointer">
                <input
                  v-model="productStateObj.category_ids"
                  type="checkbox"
                  :value="option.value"
                  class="form-checkbox h-4 w-4 text-blue-600"
                  :disabled="productStateObj.disabled"
                >
                <span class="ml-2 text-gray-700">{{ option.label }}</span>
              </label>
            </div>
            <button
              v-if="adminCategorystore.categoryStateObj.canLoadMore"
              @click="adminCategorystore.getCategoryDropdown"
            >
              Load More
            </button>
          </div>
        </div>
        <div
          v-if="!productStateObj.disabled"
          class="flex justify-end mt-4"
        >
          <button
            class="bg-blue-500 px-4 py-1 rounded text-sm text-white hover:opacity-90"
            @click="updateProduct(id)"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
