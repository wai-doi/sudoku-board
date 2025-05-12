import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  page.on('dialog', (dialog) => dialog.accept())

  await page.goto('/')
})

test('解答モードで数字を入力できる', async ({ page }) => {
  const switchModeButton = page.getByRole('button', { name: '解答モードに切り替え' })
  await switchModeButton.click()

  const cell = page.getByTestId('cell-4-4')

  await expect(cell).toHaveText('')

  await cell.click()

  await page.keyboard.press('1')
  await expect(cell).toHaveText('1')

  await page.keyboard.press('2')
  await expect(cell).toHaveText('2')
})

test('解答モードで編集モードから入力されている数字を上書きできない', async ({ page }) => {
  const cell = page.getByTestId('cell-4-4')
  await cell.click()

  await page.keyboard.press('1')
  await expect(cell).toHaveText('1')

  const switchModeButton = page.getByRole('button', { name: '解答モードに切り替え' })
  await switchModeButton.click()

  await cell.click()

  await page.keyboard.press('2')
  await expect(cell).toHaveText('1')
})

test('解答モードで候補の数字を入力できる', async ({ page }) => {
  const switchModeButton = page.getByRole('button', { name: '解答モードに切り替え' })
  await switchModeButton.click()

  const cell = page.getByTestId('cell-4-4')

  await expect(cell).toHaveText('')

  await cell.click()

  await page.keyboard.down('Shift')

  await page.keyboard.press('Digit1')
  await expect(cell).toHaveText('1')

  await page.keyboard.press('Digit2')
  await expect(cell).toHaveText('12')

  await page.keyboard.press('Digit3')
  await expect(cell).toHaveText('123')

  await page.keyboard.press('Digit4')
  await expect(cell).toHaveText('1234')

  await page.keyboard.press('Digit5')
  await expect(cell).toHaveText('12345')

  await page.keyboard.press('Digit6')
  await expect(cell).toHaveText('123456')

  await page.keyboard.press('Digit7')
  await expect(cell).toHaveText('1234567')

  await page.keyboard.press('Digit8')
  await expect(cell).toHaveText('12345678')

  await page.keyboard.press('Digit9')
  await expect(cell).toHaveText('123456789')

  await page.keyboard.up('Shift')
})

test('解答モードで候補の数字を同じ数字を入力すると削除できる', async ({ page }) => {
  const switchModeButton = page.getByRole('button', { name: '解答モードに切り替え' })
  await switchModeButton.click()

  const cell = page.getByTestId('cell-4-4')

  await expect(cell).toHaveText('')

  await cell.click()

  await page.keyboard.down('Shift')

  await page.keyboard.press('Digit1')
  await expect(cell).toHaveText('1')

  await page.keyboard.press('Digit2')
  await expect(cell).toHaveText('12')

  await page.keyboard.press('Digit1')
  await expect(cell).toHaveText('2')
})

test('解答モードで候補の数字をBackspaceで削除できる', async ({ page }) => {
  const switchModeButton = page.getByRole('button', { name: '解答モードに切り替え' })
  await switchModeButton.click()

  const cell = page.getByTestId('cell-4-4')

  await expect(cell).toHaveText('')

  await cell.click()

  await page.keyboard.down('Shift')

  await page.keyboard.press('Digit1')
  await expect(cell).toHaveText('1')

  await page.keyboard.press('Digit2')
  await expect(cell).toHaveText('12')

  await page.keyboard.press('Backspace')
  await expect(cell).toHaveText('')
})

test('解答モードで候補の数字を通常の数字を入力して上書きできる', async ({ page }) => {
  const switchModeButton = page.getByRole('button', { name: '解答モードに切り替え' })
  await switchModeButton.click()

  const cell = page.getByTestId('cell-4-4')

  await expect(cell).toHaveText('')

  await cell.click()

  await page.keyboard.down('Shift')

  await page.keyboard.press('Digit1')
  await expect(cell).toHaveText('1')

  await page.keyboard.up('Shift')

  await page.keyboard.press('2')
  await expect(cell).toHaveText('2')
})

test('解答モードで編集モードに切り替えると入力した数字がリセットされる', async ({ page }) => {
  const cell1 = page.getByTestId('cell-1-1')
  await cell1.click()

  await page.keyboard.press('1')
  await expect(cell1).toHaveText('1')

  const switchSolveModeButton = page.getByRole('button', { name: '解答モードに切り替え' })
  await switchSolveModeButton.click()

  const cell2 = page.getByTestId('cell-2-2')
  await cell2.click()

  await page.keyboard.press('2')

  await expect(cell1).toHaveText('1')
  await expect(cell2).toHaveText('2')

  const switchEditModeButton = page.getByRole('button', { name: '編集モードに切り替え' })
  await switchEditModeButton.click()

  await expect(page.getByText('📝 編集モード')).toBeVisible()

  await expect(cell1).toHaveText('1')
  await expect(cell2).toHaveText('')
})

test('解答モードで戻すことと進めることができる', async ({ page }) => {
  const switchSolveModeButton = page.getByRole('button', { name: '解答モードに切り替え' })
  await switchSolveModeButton.click()

  const undoButton = page.getByRole('button', { name: '戻す' })
  await expect(undoButton).toBeDisabled()

  const redoButton = page.getByRole('button', { name: '進む' })
  await expect(redoButton).toBeDisabled()

  const cell = page.getByTestId('cell-4-4')
  await cell.click()

  await page.keyboard.down('Shift')

  await page.keyboard.press('Digit1')
  await expect(cell).toHaveText('1')

  await page.keyboard.press('Digit2')
  await expect(cell).toHaveText('12')

  await page.keyboard.up('Shift')

  await page.keyboard.press('3')
  await expect(cell).toHaveText('3')

  await undoButton.click()
  await expect(cell).toHaveText('12')

  await undoButton.click()
  await expect(cell).toHaveText('1')

  await undoButton.click()
  await expect(cell).toHaveText('')

  await redoButton.click()
  await expect(cell).toHaveText('1')

  await redoButton.click()
  await expect(cell).toHaveText('12')

  await redoButton.click()
  await expect(cell).toHaveText('3')
})

test('解答モードでクリアしたときメッセージが表示される', async ({ page }) => {
  const switchSolveModeButton = page.getByRole('button', { name: '解答モードに切り替え' })
  await switchSolveModeButton.click()

  const answer = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [4, 5, 6, 7, 8, 9, 1, 2, 3],
    [7, 8, 9, 1, 2, 3, 4, 5, 6],
    [2, 3, 4, 5, 6, 7, 8, 9, 1],
    [5, 6, 7, 8, 9, 1, 2, 3, 4],
    [8, 9, 1, 2, 3, 4, 5, 6, 7],
    [3, 4, 5, 6, 7, 8, 9, 1, 2],
    [6, 7, 8, 9, 1, 2, 3, 4, 5],
    [9, 1, 2, 3, 4, 5, 6, 7, 8],
  ]

  for (let i = 0; i <= 8; i++) {
    for (let j = 0; j <= 8; j++) {
      const cell = page.getByTestId(`cell-${i}-${j}`)
      await cell.click()
      await page.keyboard.press(String(answer[i][j]))
    }
  }

  await expect(page.getByText('🎉 数独クリア！')).toBeVisible()
})
