<script setup lang="ts">
import { computed } from 'vue'
import type { Cell } from '../type'

const props = defineProps<{
  cell: Cell
}>()

const cellBorderClass = computed(() => ({
  'border-bottom-thick': (props.cell.row + 1) % 3 === 0 && props.cell.row !== 8,
  'border-right-thick': (props.cell.col + 1) % 3 === 0 && props.cell.col !== 8,
}))
</script>

<template>
  <div class="cell" :class="cellBorderClass">{{ cell.value }}</div>
</template>

<style scoped>
.cell {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 75px;
  height: 75px;
  font-size: 3rem;
  cursor: pointer;
  border: solid 1px;
}

.cell:hover {
  background-color: gray;
}

.border-bottom-thick {
  border-bottom: 5px solid;
}

.border-right-thick {
  border-right: 5px solid;
}
</style>
