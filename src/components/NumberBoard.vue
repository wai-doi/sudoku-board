<script setup lang="ts">
import { computed, inject, onBeforeUnmount, onMounted, ref, toRaw, type Ref } from 'vue'
import NumberCell from './NumberCell.vue'
import type { Board, Cell, Mode } from '../type'

const props = defineProps<{
  board: Board
}>()

const emit = defineEmits<{
  'update-board': [Board]
  'save-history': [Board]
  'store-local-storege': []
}>()

const mode = inject<Ref<Mode>>('mode')

const shiftKeyMap: Record<string, number> = {
  '!': 1,
  '@': 2,
  '#': 3,
  $: 4,
  '%': 5,
  '^': 6,
  '&': 7,
  '*': 8,
  '(': 9,
}

function handleKeyDown(event: KeyboardEvent): void {
  if (!selectedCellId.value) return

  const newBoard: Board = structuredClone(toRaw(props.board))
  const selectedCell: Cell = newBoard.flat().find((cell) => cell.id === selectedCellId.value)!

  if (mode?.value === 'solve' && selectedCell.readonly) return

  if (/^[1-9]$/.test(event.key)) {
    selectedCell.value = Number(event.key)
    selectedCell.candidates = []
    if (mode?.value === 'edit') selectedCell.readonly = true
  } else if (event.key === 'Backspace') {
    selectedCell.value = null
    selectedCell.candidates = []
    selectedCell.readonly = false
  } else if (event.shiftKey && shiftKeyMap[event.key]) {
    if (selectedCell.value) return
    const num = shiftKeyMap[event.key]
    if (selectedCell.candidates.includes(num)) {
      selectedCell.candidates = selectedCell.candidates.filter((c) => c !== num)
    } else {
      selectedCell.candidates.push(num)
      selectedCell.candidates.sort()
    }
  } else {
    return
  }

  emit('update-board', newBoard)

  if (mode?.value === 'solve') emit('save-history', newBoard)

  emit('store-local-storege')
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

const boardContainerClass = computed(() => ({
  'edit-mode': mode?.value === 'edit',
  'solve-mode': mode?.value === 'solve',
}))
</script>

<template>
  <div class="board-container" :class="boardContainerClass">
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
.board-container {
  border: 5px solid;
  transition: background-color 0.3s ease;
}

.edit-mode {
  background-color: #fdf6e3;
  border-color: #ffcc80;
}

.solve-mode {
  background-color: #e3f2fd;
  border-color: #90caf9;
}

.row {
  display: flex;
}
</style>
