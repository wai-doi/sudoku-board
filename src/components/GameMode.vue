<script setup lang="ts">
import { computed } from 'vue'
import type { Mode } from '../type'
const props = defineProps<{
  mode: Mode
}>()

const emit = defineEmits<{
  'switch-mode': []
}>()

const modeClass = computed(() => ({
  'edit-mode': props.mode === 'edit',
  'solve-mode': props.mode === 'solve',
}))
</script>

<template>
  <div class="mode-container">
    <span data-testid="mode-text" class="mode-text" :class="modeClass">
      {{ mode === 'edit' ? '📝 編集モード' : '🧩 解答モード' }}
    </span>
    <button
      data-testid="switch-mode-button"
      class="switch-mode-button"
      :class="modeClass"
      @click="() => emit('switch-mode')"
    >
      {{ mode === 'edit' ? '解答モード' : '編集モード' }}に切り替え
    </button>
  </div>
</template>

<style scoped>
.mode-text {
  font-size: 1.7rem;
  font-weight: bold;
}

.mode-text.edit-mode {
  color: #fb8c00;
}

.mode-text.solve-mode {
  color: #1e88e5;
}

.switch-mode-button {
  padding: 10px 16px;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  cursor: pointer;
  border: none;
  border-radius: 6px;
  transition: background-color 0.3s ease;
}

.switch-mode-button.edit-mode {
  background-color: #1e88e5;
}

.switch-mode-button.edit-mode:hover {
  background-color: #1565c0;
}

.switch-mode-button.solve-mode {
  background-color: #fb8c00;
}

.switch-mode-button.solve-mode:hover {
  background-color: #ef6c00;
}

.mode-container {
  display: flex;
  justify-content: space-between;
}
</style>
