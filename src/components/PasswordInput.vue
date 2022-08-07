<script setup>
import { ref } from 'vue'

const props = defineProps({
  type: {
    required: false,
    type: String,
    default: 'password'
  },
  style: {
    required: false,
    type: String,
    default: ''
  },
  id: {
    required: false,
    type: String,
    default: 'password'
  },
  modelValue: {
    required: true,
    type: String
  },
  placeholder: {
    required: false,
    type: String,
    default: ''
  },
  errors: {
    required: false,
    type: Array,
    default () {
      return []
    }
  }
})

defineEmits(['passwordToggle', 'update:modelValue'])
const passwordToggle = ref(false)
</script>

<template>
  <label
    :for="id"
    class="block mt-4 relative"
  >
    <span
      v-show="passwordToggle"
      class="absolute right-2 top-8 text-secondary cursor-pointer"
      @click="passwordToggle = !passwordToggle"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </svg>
    </span>
    <span
      v-show="!passwordToggle"
      class="absolute right-2 top-8 text-secondary cursor-pointer"
      @click="passwordToggle = !passwordToggle"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
        />
      </svg>
    </span>
    <span class="span-required">
      <slot>Password</slot>
    </span>
    <input
      :id="id"
      :value="props.modelValue"
      :type="passwordToggle ? 'text' : 'password'"
      class="input-primary"
      :class="errors.length ? 'ring-1 ring-danger' : ''"
      :placeholder="props.placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
    >
    <p
      v-if="errors.length"
      class="text-xs text-danger"
    >{{ errors[0] }}</p>
  </label>
</template>
