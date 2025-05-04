<script setup lang="ts">
import { provide, ref, toRaw, type Ref } from 'vue'
import NumberBoard from './components/NumberBoard.vue'
import type { Board, Cell, Mode } from './type'
import GameMode from './components/GameMode.vue'
import ClearButton from './components/ClearButton.vue'
import UndoButton from './components/UndoButton.vue'
import RedoButton from './components/RedoButton.vue'
import GitHublink from './components/GitHubLink.vue'

const board = ref<Board>(savedBoard() || initializeCellValue())
const history = ref<Board[]>([])
const currentHistoryIndex = ref<number>(-1)
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

  history.value = [structuredClone(toRaw(board.value))]
  currentHistoryIndex.value = 0
}

function clearBoard(): void {
  board.value = initializeCellValue()
}

function updateBoard(newBoard: Board): void {
  board.value = newBoard
}

function saveHistory(newBoard: Board): void {
  history.value = [...history.value.slice(0, currentHistoryIndex.value + 1), newBoard]
  currentHistoryIndex.value = history.value.length - 1
}

function undo(): void {
  currentHistoryIndex.value = currentHistoryIndex.value - 1
  board.value = history.value[currentHistoryIndex.value]
}

function redo(): void {
  currentHistoryIndex.value = currentHistoryIndex.value + 1
  board.value = history.value[currentHistoryIndex.value]
}
</script>

<template>
  <main>
    <div class="main-container">
      <div class="header">
        <GitHublink />
      </div>
      <GameMode :mode="mode" @switch-mode="switchMode" />
      <NumberBoard :board="board" @update-board="updateBoard" @save-history="saveHistory" />
      <div class="button-container">
        <ClearButton v-show="mode === 'edit'" @click="clearBoard" />
        <UndoButton v-show="mode === 'solve'" @click="undo" :disabled="currentHistoryIndex === 0" />
        <RedoButton
          v-show="mode === 'solve'"
          @click="redo"
          :disabled="currentHistoryIndex === history.length - 1"
        />
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.main-container {
  display: flex;
  flex-flow: column;
  gap: 10px;
  user-select: none;
}

.header {
  display: flex;
  justify-content: end;
  margin-top: 10px;
}

.button-container {
  display: flex;
  gap: 50px;
  justify-content: center;
}
</style>
