<script setup lang="ts">
import { computed, inject, type Ref } from 'vue'
import type { Cell, Mode } from '../type'

const props = defineProps<{
  cell: Cell
  selected: boolean
}>()

const mode = inject<Ref<Mode>>('mode')

const cellClass = computed(() => ({
  'border-bottom-thick': (props.cell.row + 1) % 3 === 0 && props.cell.row !== 8,
  'border-right-thick': (props.cell.col + 1) % 3 === 0 && props.cell.col !== 8,
  'cell-selected': props.selected,
  'edit-mode': mode?.value === 'edit',
  'solve-mode': mode?.value === 'solve',
}))

const cellValueClass = computed(() => ({
  'cell-readonly': props.cell.readonly,
}))
</script>

<template>
  <div :data-testid="`cell-${cell.row}-${cell.col}`" class="cell" :class="cellClass">
    <div v-show="cell.candidates" class="cell-candidates">
      {{ cell.candidates.join('') }}
    </div>
    <div v-show="cell.value" class="cell-value" :class="cellValueClass">
      {{ cell.value }}
    </div>
  </div>
</template>

<style scoped>
.cell {
  width: 75px;
  height: 75px;
  cursor: pointer;
  border: solid 1px;
}

.cell-candidates {
  padding-left: 0.3rem;
  font-size: 1rem;
  letter-spacing: 0.3rem;
  overflow-wrap: anywhere;
}

.cell-value {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 2.5rem;
}

.cell-candidates-text {
  font-size: 0.2rem;
}

.border-bottom-thick {
  border-bottom: 5px solid;
}

.border-right-thick {
  border-right: 5px solid;
}

.edit-mode {
  border-color: #ffcc80;
}

.solve-mode {
  border-color: #90caf9;
}

.cell-selected {
  background-color: lightgray !important;
}

.cell-readonly {
  font-weight: bold;
}
</style>
