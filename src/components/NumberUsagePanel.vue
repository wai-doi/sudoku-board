<script setup lang="ts">
import type { Board } from '@/type'

const props = defineProps<{
  board: Board
}>()

function isDigitUsedNineTimes(number: number): boolean {
  const flatBoard = props.board.flat()
  const count = flatBoard.filter((cell) => cell.value === number).length
  return count === 9
}
</script>

<template>
  <div class="number-usage-panel">
    <div
      v-for="n in 9"
      :key="n"
      class="number-usage-item"
      :class="{ 'used-up': isDigitUsedNineTimes(n) }"
    >
      {{ n }}
    </div>
  </div>
</template>

<style scoped>
.number-usage-panel {
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
}

.number-usage-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 5px;
  font-weight: bold;
  color: #333;
  background-color: #f0f0f0;
  border: solid 3px;
  border-radius: 50%;
}

.used-up {
  opacity: 0.2;
}
</style>
