<script setup lang="ts">
import { ref } from 'vue'
import NumberBoard from './components/NumberBoard.vue'
import type { Board } from './type'

const board = ref<Board>(initializeCellValue())

function initializeCellValue(): Board {
  return [...Array(9)].map((_, row) => {
    return [...Array(9)].map((_, col) => {
      return { value: null, row: row, col: col, readonly: false }
    })
  })
}
</script>

<template>
  <main>
    <NumberBoard :board="board" />
  </main>
</template>
