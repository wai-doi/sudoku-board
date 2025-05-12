import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  page.on('dialog', (dialog) => dialog.accept())

  await page.goto('/')
})

test('編集モードで数字を入力できる', async ({ page }) => {
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

  const resetButton = page.getByRole('button', { name: 'リセット' })
  await resetButton.click()

  await expect(cell).toHaveText('')
})

test('編集モードで解答モードに切り替えができる', async ({ page }) => {
  await expect(page.getByText('📝 編集モード')).toBeVisible()

  const switchModeButton = page.getByRole('button', { name: '解答モードに切り替え' })
  await switchModeButton.click()

  await expect(page.getByText('🧩 解答モード')).toBeVisible()
})
