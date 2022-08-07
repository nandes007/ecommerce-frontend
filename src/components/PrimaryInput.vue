<script setup>

const props = defineProps({
  type: {
    required: false,
    type: String,
    default: 'text'
  },
  style: {
    required: false,
    type: String,
    default: ''
  },
  id: {
    required: false,
    type: String,
    default: ''
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
</script>

<template>
  <label
    :for="id"
    class="block mt-4 relative"
  >
    <span class="span-required">
      <slot>Input</slot>
    </span>
    <input
      :id="id"
      :type="props.type"
      :value="props.modelValue"
      class="input-primary"
      :class="props.errors.length ? 'ring-1 ring-danger' : '' + ' ' + props.style"
      :placeholder="props.placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
    >
    <p
      v-if="props.errors.length"
      class="text-xs text-danger"
    >{{ props.errors[0] }}</p>
  </label>
</template>
