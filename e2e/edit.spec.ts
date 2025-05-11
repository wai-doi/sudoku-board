import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  page.on('dialog', (dialog) => dialog.accept())

  await page.goto('/')
})

test('編集モードで数字を入力したり削除できる', async ({ page }) => {
  const cell = page.getByTestId('cell-4-4')

  await expect(cell).toHaveText('')

  await cell.click()

  await page.keyboard.press('1')
  await expect(cell).toHaveText('1')

  await page.keyboard.press('2')
  await expect(cell).toHaveText('2')
})

test('編集モードで0~9の数字以外は入力できない', async ({ page }) => {
  const cell = page.getByTestId('cell-4-4')

  await expect(cell).toHaveText('')

  await cell.click()

  await page.keyboard.press('0')
  await expect(cell).toHaveText('')

  await page.keyboard.press('a')
  await expect(cell).toHaveText('')
})

test('編集モードで数字を削除できる', async ({ page }) => {
  const cell = page.getByTestId('cell-4-4')

  await expect(cell).toHaveText('')

  await cell.click()

  await page.keyboard.press('1')
  await expect(cell).toHaveText('1')

  await page.keyboard.press('Backspace')
  await expect(cell).toHaveText('')
})

test('編集モードでリセットボタンで数字を削除できる', async ({ page }) => {
  const cell = page.getByTestId('cell-4-4')

  await expect(cell).toHaveText('')

  await cell.click()

  await page.keyboard.press('1')
  await expect(cell).toHaveText('1')

  const resetButton = page.getByTestId('reset-button')

  await resetButton.click()

  await expect(cell).toHaveText('')
})

test('編集モードで解答モードに切り替えができる', async ({ page }) => {
  const modeText = page.getByTestId('mode-text')

  await expect(modeText).toHaveText('📝 編集モード')

  const switchModeButton = page.getByTestId('switch-mode-button')
  await switchModeButton.click()

  await expect(modeText).toHaveText('🧩 解答モード')
})
