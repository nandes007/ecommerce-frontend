<template>
  <div class="relative">
    <input
      v-model="searchText"
      class="border border-gray-300 rounded px-4 py-2 w-full"
      placeholder="Search..."
      @focus="isFocused = true"
      @blur="isFocused = false"
    >
    <ul
      v-show="isFocused && filteredOptions.length > 0"
      class="absolute z-50 left-0 right-0 border border-gray-300 rounded-t-none rounded-b-md overflow-hidden mt-1"
    >
      <li
        v-for="(option, index) in filteredOptions"
        :key="index"
        class="px-4 py-2 cursor-pointer hover:bg-gray-200"
        @click="selectOption(option)"
      >
        {{ option }}
      </li>
    </ul>
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
    value: {
      type: String,
      required: true
    }
  },
  setup (props, { emit }) {
    const searchText = ref('')
    const isFocused = ref(false)

    const filteredOptions = computed(() => {
      return props.options.filter(option =>
        option.toLowerCase().includes(searchText.value.toLowerCase())
      )
    })

    function selectOption (option) {
      emit('update:value', option)
      searchText.value = option
      isFocused.value = false
    }

    return {
      searchText,
      isFocused,
      filteredOptions,
      selectOption
    }
  }
}
</script>
