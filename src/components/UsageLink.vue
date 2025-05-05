<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>

<template>
  <a
    href="https://github.com/wai-doi/sudoku-board/blob/main/README.md"
    class="usage-link"
    target="_blank"
  >
    <Icon icon="fa:question-circle" />
  </a>
</template>

<style scoped>
.usage-link {
  font-size: 2.5rem;
  line-height: 1;
  color: inherit;
}

.usage-link:hover {
  opacity: 0.7;
}
</style>
