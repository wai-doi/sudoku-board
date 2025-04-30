<script setup lang="ts">
import { provide, ref, type Ref } from 'vue'
import NumberBoard from './components/NumberBoard.vue'
import type { Board, Mode } from './type'
import GameMode from './components/GameMode.vue'

const board = ref<Board>(initializeCellValue())
const mode = ref<Mode>('edit')

provide<Ref<Mode>>('mode', mode)


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
</script>

<template>
  <main class="main-container">
    <GameMode :mode="mode" @switch-mode="switchMode" />
    <NumberBoard :board="board" />
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
</style>
