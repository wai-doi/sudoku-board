<script setup lang="ts">
import HistoryButton from './HistoryButton.vue'

defineProps<{
  disabled: boolean
}>()
</script>

<template>
  <HistoryButton :disabled="disabled">戻す</HistoryButton>
</template>
