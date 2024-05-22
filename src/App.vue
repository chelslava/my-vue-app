<template>
  <!-- Основная обертка для панели блоков и билдера диалогов -->
  <div class="flex h-screen">
    <!-- Компонент BlockPanel, передающий событие выбора блока -->
    <BlockPanel @select-block="handleBlockSelection" />
    <!-- Компонент DialogBuilder с рефом для доступа к методам -->
    <DialogBuilder ref="dialogBuilder" />
  </div>
</template>

<script setup>
import { ref } from 'vue'; // Импорт функции ref для создания реактивных ссылок
import BlockPanel from './components/BlockPanel.vue'; // Импорт компонента BlockPanel
import DialogBuilder from './components/DialogBuilder.vue'; // Импорт компонента DialogBuilder

const dialogBuilder = ref(null); // Создание реф-ссылки для DialogBuilder

// Обработчик события выбора блока
const handleBlockSelection = (block) => {
  dialogBuilder.value.addBlock(block); // Вызов метода addBlock на экземпляре DialogBuilder
};
</script>

<style>
body {
  margin: 0; 
  font-family: Arial, sans-serif; 
}
</style>
