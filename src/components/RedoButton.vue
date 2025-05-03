<script setup lang="ts">
defineProps<{
  disabled: boolean
}>()
</script>

<template>
  <button class="back-button" :disabled="disabled">進む</button>
</template>

<style scoped>
.back-button {
  font-size: 1.5rem;
  cursor: pointer;
}
</style>
