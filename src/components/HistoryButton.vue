<script setup lang="ts">
defineProps<{
  disabled: boolean
}>()
</script>

<template>
  <button class="history-button" :disabled="disabled">
    <slot></slot>
  </button>
</template>

<style scoped>
.history-button {
  padding: 8px 16px;
  font-size: 1rem;
  font-weight: bold;
  color: #333;
  cursor: pointer;
  background-color: #e0e0e0;
  border: none;
  border-radius: 6px;
  transition: background-color 0.3s ease;
}

.history-button:disabled {
  color: #aaa;
  cursor: not-allowed;
  background-color: #f5f5f5;
}

.history-button:hover:not(:disabled) {
  background-color: #bdbdbd;
}
</style>
