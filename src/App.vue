<script setup lang="ts">
import { provide, ref, type Ref } from 'vue'
import NumberBoard from './components/NumberBoard.vue'
import type { Board, Cell, Mode } from './type'
import GameMode from './components/GameMode.vue'
import ClearButton from './components/ClearButton.vue'

const board = ref<Board>(savedBoard() || initializeCellValue())
const mode = ref<Mode>('edit')

provide<Ref<Mode>>('mode', mode)

function savedBoard() {
  return JSON.parse(localStorage.getItem('sudoku-board') || 'null')
}

function initializeCellValue(): Board {
  return [...Array(9)].map((_, row): Cell[] => {
    return [...Array(9)].map((_, col): Cell => {
      return {
        id: `${row}-${col}`,
        value: null,
        candidates: [],
        row: row,
        col: col,
        readonly: false,
      }
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
      <ClearButton v-show="mode === 'edit'" @click="clearBoard" />
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
