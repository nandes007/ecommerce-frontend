<template>
  <div class="relative">
    <label class="block font-medium text-gray-700">{{ label }}</label>
    <input
      v-model="searchTerm"
      class="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      type="text"
      placeholder="Search"
      @input="filterOptions"
      @focus="isOpen = true"
      @blur="closeDropdown"
    >
    <div
      v-show="isOpen"
      class="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg"
    >
      <ul class="py-1">
        <li
          v-for="(option, index) in filteredOptions"
          :key="index"
          class="px-4 py-2 cursor-pointer hover:bg-gray-100"
          @click="selectOption(option)"
        >
          {{ option.label }}
        </li>
      </ul>
    </div>
    <input
      type="hidden"
      :value="selectedOption.value"
    >
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  props: {
    options: {
      type: Array,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: false
    }
  },
  setup (props) {
    const searchTerm = ref('')
    const isOpen = ref(false)
    const selectedOption = ref(null)

    const filteredOptions = computed(() => {
      return props.options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.value.toLowerCase())
      )
    })

    function filterOptions (event) {
      searchTerm.value = event.target.value
    }

    function selectOption (option) {
      selectedOption.value = option
      searchTerm.value = option.label
      closeDropdown()
    }

    function closeDropdown () {
      isOpen.value = false
    }

    return {
      searchTerm,
      isOpen,
      selectedOption,
      filteredOptions,
      filterOptions,
      selectOption,
      closeDropdown
    }
  }
}
</script>
