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
    class="px-2 py-1 rounded-full font-bold text-primary border-2 border-primary hover:opacity-80 focus:outline-none"
    :type="props.type"
    :class="props.style"
  >
    <slot>
      Primary
    </slot>
  </button>
</template>
