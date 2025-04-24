<script setup lang="ts">
import NumberCell from './NumberCell.vue'
import type { Board } from '../type'

defineProps<{
  board: Board
}>()
</script>

<template>
  <div class="container">
    <div v-for="(row, rowIndex) in board" :key="rowIndex" class="row">
      <NumberCell v-for="(cell, cellIndex) in row" :key="cellIndex" :cell="cell" />
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
