<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import NumberCell from './NumberCell.vue'
import type { Board, Cell } from '../type'

const props = defineProps<{
  board: Board
}>()

function handleKeyDown(event: KeyboardEvent): void {
  if (!selectedCellId.value) return
  const selectedCell: Cell = props.board.flat().find((cell) => cell.id === selectedCellId.value)!

  if (/^[1-9]$/.test(event.key)) {
    selectedCell.value = Number(event.key)
  } else if (event.key === 'Backspace') {
    selectedCell.value = null
  } else {
    return
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
})

const selectedCellId = ref<string | null>(null)
function isSelectedCell(id: string): boolean {
  if (!selectedCellId.value) return false

  return selectedCellId.value === id
}
function updateSelectedCell(id: string): void {
  selectedCellId.value = id == selectedCellId.value ? null : id
}
</script>

<template>
  <div class="container">
    <div v-for="(row, rowIndex) in board" :key="rowIndex" class="row">
      <NumberCell
        v-for="(cell, cellIndex) in row"
        :key="cellIndex"
        :cell="cell"
        :selected="isSelectedCell(cell.id)"
        @click="updateSelectedCell(cell.id)"
      />
    </div>
  </div>
</template>

<style scoped>
.container {
  margin: 100px;
  border: 5px solid;
}

.row {
  display: flex;
}
</style>
