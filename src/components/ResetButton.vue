<template>
  <button data-testid="reset-button" class="reset-button">リセット</button>
</template>

<style scoped>
.reset-button {
  padding: 8px 16px;
  font-size: 1.3rem;
  font-weight: bold;
  color: white;
  cursor: pointer;
  background-color: #e53935;
  border: none;
  border-radius: 6px;
  transition: background-color 0.3s ease;
}

.reset-button:hover {
  background-color: #c62828;
}
</style>
