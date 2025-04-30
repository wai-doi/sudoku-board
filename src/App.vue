<script setup lang="ts">
import { provide, ref, type Ref } from 'vue'
import NumberBoard from './components/NumberBoard.vue'
import type { Board, Mode } from './type'
import GameMode from './components/GameMode.vue'
import ClearButton from './components/ClearButton.vue'

const board = ref<Board>(savedBoard() || initializeCellValue())
const mode = ref<Mode>('edit')

provide<Ref<Mode>>('mode', mode)

function savedBoard() {
  return JSON.parse(localStorage.getItem('sudoku-board') || 'null')
}

function initializeCellValue(): Board {
  return [...Array(9)].map((_, row) => {
    return [...Array(9)].map((_, col) => {
      return { id: `${row}-${col}`, value: null, row: row, col: col, readonly: false }
    })
  })
}

function switchMode(): void {
  mode.value = mode.value === 'edit' ? 'solve' : 'edit'
}

function clearBoard(): void {
  board.value = initializeCellValue()
}
</script>

<template>
  <main class="main-container">
    <GameMode :mode="mode" @switch-mode="switchMode" />
    <NumberBoard :board="board" />
    <div class="button-container">
      <ClearButton v-show="mode === 'edit'" @clear-board="clearBoard" />
    </div>
  </main>
</template>

<style scoped>
.main-container {
  display: flex;
  flex-flow: column;
  gap: 10px;
  margin: 50px;
  user-select: none;
}

.button-container {
  display: flex;
  justify-content: center;
}
</style>
