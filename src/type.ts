export type Cell = {
  id: string
  value: number | null
  row: number
  col: number
  readonly: boolean
}

export type Board = Cell[][]

export type Mode = 'edit' | 'solve'
