<template>
  <div class="modal-overlay">
    <div class="modal-box">🎉 数独クリア！</div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgb(0 0 0 / 60%);
}

.modal-box {
  padding: 50px;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  background-color: white;
  border-radius: 8px;
}
</style>
