<script setup>
import MessageComponent from '../../../../components/ui/admin/MessageComponent.vue'
import { useAdminProductStore } from '../../../../stores/admin/product'

const { requestObj, productStateObj, storeProduct } = useAdminProductStore()

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
    <div class="border border-slate-400 rounded">
      <div class="bg-slate-300 px-2 py-1 text-xs font-thin">
        Create Product
      </div>
      <div class="p-2">
        <div class="my-2">
          <label
            for="category_name"
            class="text-sm"
          >SKU</label>
          <input
            v-model="requestObj.sku"
            type="text"
            class="mt-1 px-3 py-1.5 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-200 focus:ring-sky-200 block w-full rounded sm:text-sm text-sm focus:ring-1"
          >
        </div>
        <div class="my-2">
          <label
            for="category_name"
            class="text-sm"
          >Barcode</label>
          <input
            v-model="requestObj.barcode"
            type="text"
            class="mt-1 px-3 py-1.5 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-200 focus:ring-sky-200 block w-full rounded sm:text-sm text-sm focus:ring-1"
          >
        </div>
        <div class="my-2">
          <label
            for="category_name"
            class="text-sm"
          >Product Name</label>
          <input
            v-model="requestObj.product_name"
            type="text"
            class="mt-1 px-3 py-1.5 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-200 focus:ring-sky-200 block w-full rounded sm:text-sm text-sm focus:ring-1"
          >
        </div>
        <div class="my-2 flex justify-between">
          <div class="w-1/2 pr-4">
            <label
              for="category_name"
              class="text-sm"
            >Unit</label>
            <input
              v-model="requestObj.unit"
              type="text"
              class="mt-1 px-3 py-1.5 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-200 focus:ring-sky-200 block w-full rounded sm:text-sm text-sm focus:ring-1"
            >
          </div>
          <div class="w-1/2">
            <label
              for="category_name"
              class="text-sm"
            >Fraction</label>
            <input
              v-model="requestObj.fraction"
              type="text"
              class="mt-1 px-3 py-1.5 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-200 focus:ring-sky-200 block w-full rounded sm:text-sm text-sm focus:ring-1"
            >
          </div>
        </div>
        <div class="my-2 flex justify-between">
          <div class="w-1/2 pr-4">
            <label
              for="category_name"
              class="text-sm"
            >Unit Price</label>
            <input
              v-model="requestObj.unitprice"
              type="text"
              class="mt-1 px-3 py-1.5 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-200 focus:ring-sky-200 block w-full rounded sm:text-sm text-sm focus:ring-1"
            >
          </div>
          <div class="w-1/2">
            <label
              for="category_name"
              class="text-sm"
            >Sell Price</label>
            <input
              v-model="requestObj.price"
              type="text"
              class="mt-1 px-3 py-1.5 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-200 focus:ring-sky-200 block w-full rounded sm:text-sm text-sm focus:ring-1"
            >
          </div>
        </div>
        <div class="my-2 flex justify-between">
          <div class="w-1/3 pr-4">
            <label
              for="category_name"
              class="text-sm"
            >Weight</label>
            <input
              v-model="requestObj.weight"
              type="text"
              class="mt-1 px-3 py-1.5 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-200 focus:ring-sky-200 block w-full rounded sm:text-sm text-sm focus:ring-1"
            >
          </div>
          <div class="w-1/3 pr-4">
            <label
              for="category_name"
              class="text-sm"
            >Tax</label>
            <select
              v-model="requestObj.tax"
              class="mt-1 px-3 py-1.5 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-200 focus:ring-sky-200 block w-full rounded sm:text-sm text-sm focus:ring-1"
            >
              <option value="1">
                Y
              </option>
              <option value="0">
                N
              </option>
            </select>
          </div>
          <div class="w-1/3">
            <label
              for="category_name"
              class="text-sm"
            >Status</label>
            <select
              v-model="requestObj.status"
              class="mt-1 px-3 py-1.5 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-200 focus:ring-sky-200 block w-full rounded sm:text-sm text-sm focus:ring-1"
            >
              <option value="active">
                Active
              </option>
              <option value="inactive">
                Inactive
              </option>
            </select>
          </div>
        </div>
        <div class="my-2">
          <label
            for="category_name"
            class="text-sm"
          >Description</label>
          <textarea
            v-model="requestObj.description"
            type="text"
            class="mt-1 px-3 py-1.5 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-200 focus:ring-sky-200 block w-full rounded sm:text-sm text-sm focus:ring-1"
          />
        </div>
        <div class="flex justify-end mt-4">
          <button
            class="bg-blue-500 px-4 py-1 rounded text-sm text-white hover:opacity-90"
            @click="storeProduct()"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
