import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import NumberUsagePanel from '../../src/components/NumberUsagePanel.vue'
import { createBoardWithNumbers } from '../utils/board'

describe('NumberUsagePanel', () => {
  it('同じ数字が9回使われると、その数字の要素に used-up クラスが付与される', () => {
    // 1 のみ 9回使われている
    const numbers = [
      [1, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 1],
    ]
    const board = createBoardWithNumbers(numbers)

    const component = mount(NumberUsagePanel, {
      props: { board },
    })

    const items = component.findAll('.number-usage-item')

    const item1 = items.find((el) => el.text() === '1')
    expect(item1?.classes()).toContain('used-up')

    const item2 = items.find((el) => el.text() === '2')
    expect(item2?.classes()).not.toContain('used-up')
  })
})
