<script setup lang="ts">
const emit = defineEmits<{
  'clear-board': []
}>()
</script>

<template>
  <button class="clear-button" @click="emit('clear-board')">クリア</button>
</template>

<style scoped>
.clear-button {
  font-size: 1.5rem;
  cursor: pointer;
}
</style>
