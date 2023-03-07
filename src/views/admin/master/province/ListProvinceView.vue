<script setup>
import MessageComponent from '../../../../components/ui/admin/MessageComponent.vue'
import { onMounted } from 'vue'
import { useAdminProvinceStore } from '../../../../stores/admin/province'
import { usePagination } from '../../../../stores/helper/pagination'
import { useAdminUiStore } from '../../../../stores/admin/ui'

const adminProvinceStore = useAdminProvinceStore()
const pagination = usePagination()
const { uiStateObj } = useAdminUiStore()

onMounted(() => {
  pagination.stateObj.currentPage = 1
  adminProvinceStore.getAllProvinces()
})
</script>

<template>
  <div>
    <h3 class="text-3xl font-medium text-slate-700">
      Province
    </h3>

    <div class="mt-5">
      <div class="flex justify-end p-4">
        <router-link
          to="/admin/master/province/create"
          class="bg-green-500 px-2 py-2 rounded text-slate-100 hover:opacity-90"
        >
          Create new province
        </router-link>
      </div>
      <MessageComponent :success-message="adminProvinceStore.provinceStateObj.successMessage" />
      <div class="flex">
        <table class="table-auto border-collapse border border-slate-400 w-full">
          <thead>
            <tr>
              <th class="border-2 border-slate-400 py-3">
                #
              </th>
              <th class="border-2 border-slate-400">
                Province Name
              </th>
              <th class="border-2 border-slate-400 w-1/5">
                Action
              </th>
            </tr>
          </thead>
          <tbody v-if="uiStateObj.loadLoading">
            <tr>
              <td
                colspan="3"
                class="border-2 border-slate-400 py-1.5 text-center text-sm font-thin italic"
              >
                <p>loading . . .</p>
              </td>
            </tr>
          </tbody>
          <tbody v-if="!uiStateObj.loadLoading">
            <tr
              v-for="(province, index) in adminProvinceStore.provinces"
              :key="province.id"
              :index="index"
            >
              <td class="border-2 border-slate-400 py-1.5 text-center">
                {{ ++index }}
              </td>
              <td class="border-2 border-slate-400 pl-2">
                {{ province.name }}
              </td>
              <td class="border-2 border-slate-400">
                <div class="flex justify-around px-2">
                  <router-link
                    :to="{ name: 'master.province.show', params: { id: province.id } }"
                    class="flex items-center bg-green-500 px-2 py-1 text-sm rounded text-white hover:opacity-90"
                  >
                    Show
                    <span class="pl-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        class="w-4 h-4"
                      >
                        <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                        <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
                      </svg>
                    </span>
                  </router-link>
                  <button
                    class="flex items-center bg-red-500 px-2 py-1 text-sm rounded text-white hover:opacity-90"
                    @click="adminProvinceStore.deleteCategory(province.id)"
                  >
                    Delete
                    <span class="pl-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        class="w-4 h-4"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                          clip-rule="evenodd"
                        />
                      </svg>

                    </span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <ul class="pagination mt-2 flex justify-end">
        <li
          v-if="!pagination.stateObj.isFirstPage"
          class="page-item"
        >
          <a
            href="#"
            class="page-link border px-2 py-1 border-slate-500"
            @click="adminProvinceStore.openPrevPage()"
          >Previous</a>
        </li>
        <li
          v-for="link in pagination.paginationLinks"
          :key="link"
          class="page-item"
          :class="{ 'active': link == pagination.currentPage }"
        >
          <a
            v-if="link != 0"
            href="#"
            class="page-link border px-2 py-1 border-slate-500"
            :disabled="link == pagination.currentPage"
            @click.prevent="adminProvinceStore.openPage(link)"
          >{{ link }}</a>
          <a
            v-if="link == 0"
            href="javascript:;"
            class="page-link"
            disabled="disabled"
          >...</a>
        </li>
        <li
          v-if="!pagination.stateObj.isLastPage"
          class="page-link"
        >
          <a
            href="#"
            class="page-link border px-2 py-1 border-slate-500"
            @click.prevent="adminProvinceStore.openNextPage()"
          >Next</a>
        </li>
      </ul>
    </div>
  </div>
</template>
