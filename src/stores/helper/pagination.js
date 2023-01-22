import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { getPaginationPageList } from '../../helper/pagination_helper'

export const usePagination = defineStore('usePagination', () => {
  const paginationLinks = ref([])
  const stateObj = reactive({
    isFirstPage: false,
    isLastPage: false,
    currentPage: 1,
    totalPages: 1
  })

  function generatePages () {
    paginationLinks.value = getPaginationPageList(stateObj.totalPages, stateObj.currentPage, 25)
  }

  function openPrevPage () {
    stateObj.currentPage = stateObj.currentPage - 1
  }

  function openNextPage () {
    stateObj.currentPage = stateObj.currentPage + 1
  }

  function openPage (link) {
    console.log(link)
    stateObj.currentPage = link
  }

  return { paginationLinks, stateObj, generatePages, openPrevPage, openNextPage, openPage }
})
