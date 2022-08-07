<script setup>
const props = defineProps({
  type: {
    required: false,
    type: String,
    default: 'button'
  },
  style: {
    required: false,
    type: String,
    default: ''
  }
})
</script>

<template>
  <button
    class="px-3 py-2 bg-primary rounded-lg font-bold text-white hover:opacity-80 focus:outline-none"
    :type="props.type"
    :class="props.style"
  >
    <slot>
      Primary
    </slot>
  </button>
</template>
