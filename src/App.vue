<script setup lang="ts">
import { provide, ref, toRaw, type Ref } from 'vue'
import NumberBoard from './components/NumberBoard.vue'
import type { Board, Cell, Mode } from './type'
import GameMode from './components/GameMode.vue'
import ResetButton from './components/ResetButton.vue'
import UndoButton from './components/UndoButton.vue'
import RedoButton from './components/RedoButton.vue'
import GitHublink from './components/GitHubLink.vue'
import ClearModal from './components/ClearModal.vue'
import UsageLink from './components/UsageLink.vue'

const board = ref<Board>(loadLocalStorage()['board'] || initializeCellValue())
const history = ref<Board[]>(loadLocalStorage()['history'] || [])
const currentHistoryIndex = ref<number>(loadLocalStorage()['currentHistoryIndex'] ?? -1)
const mode = ref<Mode>(loadLocalStorage()['mode'] || 'edit')
const showModal = ref<boolean>(false)

provide<Ref<Mode>>('mode', mode)

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

function loadLocalStorage() {
  const data = localStorage.getItem('sudoku-board')
  if (!data) return {}

  return JSON.parse(data)
}

function switchMode(): void {
  if (mode.value === 'edit') {
    mode.value = 'solve'
    history.value = [structuredClone(toRaw(board.value))]
    currentHistoryIndex.value = 0
  } else {
    if (confirm('解答を終了して初期配置に戻します。よろしいですか？')) {
      mode.value = 'edit'
      board.value = history.value[0]
      history.value = []
      currentHistoryIndex.value = -1
    }
  }

  storeLocalStorage()
}

function resetBoard(): void {
  if (confirm('入力した数字を全て削除します。よろしいですか？')) {
    board.value = initializeCellValue()
  }
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

  storeLocalStorage()
}

function redo(): void {
  currentHistoryIndex.value = currentHistoryIndex.value + 1
  board.value = history.value[currentHistoryIndex.value]

  storeLocalStorage()
}

function storeLocalStorage() {
  localStorage.setItem(
    'sudoku-board',
    JSON.stringify({
      mode: mode.value,
      board: board.value,
      history: history.value,
      currentHistoryIndex: currentHistoryIndex.value,
    }),
  )
}

function checkSolved(): void {
  for (let row = 0; row < 9; row++) {
    const values = board.value[row].map((cell) => cell.value)
    const sorted = [...values].sort()
    if (!sorted.every((v, i) => v === i + 1)) return
  }

  for (let col = 0; col < 9; col++) {
    const values = board.value.map((row) => row[col].value)
    const sorted = [...values].sort()
    if (!sorted.every((v, i) => v === i + 1)) return
  }

  showModal.value = true
}
</script>

<template>
  <main>
    <div class="main-container">
      <div class="header">
        <GitHublink />
        <UsageLink />
      </div>
      <GameMode :mode="mode" @switch-mode="switchMode" />
      <NumberBoard
        :board="board"
        @update-board="updateBoard"
        @save-history="saveHistory"
        @store-local-storege="storeLocalStorage"
        @check-solved="checkSolved"
      />
      <div class="button-container">
        <ResetButton v-show="mode === 'edit'" @click="resetBoard" />
        <UndoButton v-show="mode === 'solve'" @click="undo" :disabled="currentHistoryIndex === 0" />
        <RedoButton
          v-show="mode === 'solve'"
          @click="redo"
          :disabled="currentHistoryIndex === history.length - 1"
        />
      </div>
    </div>
  </main>
  <ClearModal v-if="showModal" @click="() => (showModal = false)" />
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
  gap: 20px;
  justify-content: end;
  margin-top: 10px;
}

.button-container {
  display: flex;
  gap: 50px;
  justify-content: center;
}
</style>
