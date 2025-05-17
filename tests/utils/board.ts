import { Board, Cell } from '../../src/type'

export function createEmptyBoard(): Board {
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

export function createBoardWithNumbers(numbers: number[][]): Board {
  const board = createEmptyBoard()
  for (let i = 0; i <= 8; i++) {
    for (let j = 0; j <= 8; j++) {
      const cell = board.flat().find((cell) => cell.id === `${i}-${j}`)!
      cell.value = numbers[i][j] || null
    }
  }
  return board
}
