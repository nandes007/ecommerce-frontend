<script setup>
import MessageComponent from '../../../../components/ui/admin/MessageComponent.vue'
import { useAdminProductStore } from '../../../../stores/admin/product'
import { useAdminCategoryStore } from '../../../../stores/admin/category'
import { onMounted } from 'vue'

const { requestObj, productStateObj, storeProduct, previewImages } = useAdminProductStore()
const adminCategoryStore = useAdminCategoryStore()

onMounted(() => {
  adminCategoryStore.getCategoryDropdown()
})

</script>

<template>
  <div>
    <h1 class="text-xl font-bold">
      Create Product
    </h1>
    <MessageComponent :success-message="productStateObj.successMessage" />
    <div class="border border-slate-400 bg-slate-300 text-xs px-2 py-1.5 font-thin my-4 rounded">
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium, illum?</p>
    </div>
    <form
      class="border border-slate-400 rounded"
      enctype="multipart/form-data"
      @submit.prevent="storeProduct()"
    >
      <div class="bg-slate-300 px-2 py-1 text-xs font-thin">
        Create Product
      </div>
      <div class="p-2">
        <div class="my-2">
          <label
            for="sku"
            class="text-sm"
          >SKU</label>
          <input
            id="sku"
            v-model="requestObj.sku"
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
            for="barcode"
            class="text-sm"
          >Barcode</label>
          <input
            id="barcode"
            v-model="requestObj.barcode"
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
            for="product_name"
            class="text-sm"
          >Product Name</label>
          <input
            id="product_name"
            v-model="requestObj.product_name"
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
              v-model="requestObj.unitprice"
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
              v-model="requestObj.unitprice"
              disabled
              type="text"
              :class="productStateObj.errors && productStateObj.errors.lastcost ? 'admin-input-error' : 'admin-input-primary'"
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
              v-model="requestObj.price"
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
              for="unit"
              class="text-sm"
            >Unit</label>
            <input
              id="unit"
              v-model="requestObj.unit"
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
              for="fraction"
              class="text-sm"
            >Fraction</label>
            <input
              id="fraction"
              v-model="requestObj.fraction"
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
              for="unit_price"
              class="text-sm"
            >Unit Price</label>
            <input
              id="unit_price"
              v-model="requestObj.unitprice"
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
              for="sell_price"
              class="text-sm"
            >Sell Price</label>
            <input
              id="sell_price"
              v-model="requestObj.price"
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
              for="weight"
              class="text-sm"
            >Weight</label>
            <input
              id="weight"
              v-model="requestObj.weight"
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
              for="tax"
              class="text-sm"
            >Tax</label>
            <select
              id="tax"
              v-model="requestObj.tax"
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
              for="status"
              class="text-sm"
            >Status</label>
            <select
              id="status"
              v-model="requestObj.status"
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
            for="description"
            class="text-sm"
          >Description</label>
          <textarea
            id="description"
            v-model="requestObj.description"
            type="text"
            class="mt-1 px-3 py-1.5 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-200 focus:ring-sky-200 block w-full rounded sm:text-sm text-sm focus:ring-1"
          />
        </div>
        <div class="border border-gray-400 p-2 rounded my-2">
          <div class="mb-2">
            <input
              type="text"
              placeholder="Search options"
              class="mt-1 px-3 py-1.5 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-200 focus:ring-sky-200 block w-full rounded sm:text-sm text-sm focus:ring-1"
              @input="adminCategoryStore.searchCategoryDropdown"
            >
          </div>
          <div class="max-h-40 overflow-y-scroll">
            <div
              v-for="option in adminCategoryStore.categoriesDropdown"
              :key="option.value"
              class="mb-2"
            >
              <label class="flex items-center cursor-pointer">
                <input
                  v-model="requestObj.category_ids"
                  type="checkbox"
                  :value="option.value"
                  class="form-checkbox h-4 w-4 text-blue-600"
                >
                <span class="ml-2 text-gray-700">{{ option.label }}</span>
              </label>
            </div>
            <button @click="adminCategoryStore.categoryStateObj.canLoadMore">
              Load More
            </button>
          </div>
        </div>
        <div>
          <label
            for="description"
            class="text-sm"
          >Product Image</label>
          <input
            ref="fileInput"
            name="file"
            type="file"
            multiple
            :class="productStateObj.errors && productStateObj.errors.status ? 'admin-input-error' : 'admin-input-primary'"
            @change="previewImages"
          >
          <div class="flex">
            <div
              v-for="(image, index) in requestObj.productImagePreviews"
              :key="index"
              :index="index"
              class="flex w-1/4"
            >
              <img
                :src="image"
                class="pr-2"
              >
            </div>
          </div>
        </div>
        <div class="flex justify-end mt-4">
          <button
            type="submit"
            class="bg-blue-500 px-4 py-1 rounded text-sm text-white hover:opacity-90"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
