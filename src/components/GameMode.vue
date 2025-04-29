<script setup lang="ts">
import type { Mode } from '../type'
defineProps<{
  mode: Mode
}>()

const emit = defineEmits<{
  'switch-mode': []
}>()
</script>

<template>
  <div class="mode-container">
    <span class="mode-text">
      {{ mode === 'edit' ? '編集モード' : '解答モード' }}
    </span>
    <button class="switch-mode-button" @click="() => emit('switch-mode')">
      {{ mode === 'edit' ? '解答モード' : '編集モード' }}に切り替え
    </button>
  </div>
</template>

<style scoped>
.mode-text {
  font-size: 2rem;
  font-weight: bold;
}

.switch-mode-button {
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
}

.mode-container {
  display: flex;
  justify-content: space-between;
}
</style>
