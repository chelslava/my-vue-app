<template>
  <!-- Основная обертка для панели с блоками -->
  <div class="w-1/4 p-4 border-r border-gray-200">
    <!-- Заголовок панели -->
    <p class="text-xl mb-4">Панель блоков</p>
    <!-- Цикл по доступным блокам для отображения кнопок выбора -->
    <div v-for="block in availableBlocks" :key="block.type" class="mb-2">
      <button
        @click="$emit('select-block', block)"  
        class="w-full p-2 bg-gray-200 rounded hover:bg-gray-300"  
      >
        {{ block.name }}  <!-- Отображение имени блока на кнопке -->
      </button>
    </div>
  </div>
</template>

<script setup>
// Определение доступных блоков для выбора
const availableBlocks = [
  { type: 'text', name: 'Текстовый блок', content: 'Это текстовый блок' },  // Текстовый блок
  { type: 'image', name: 'Блок изображения', content: 'Это блок изображения' },  // Блок изображения
  { type: 'button', name: 'Кнопочный блок', content: 'Это кнопочный блок' },  // Кнопочный блок
  { type: 'ifelse', name: 'Блок IF ELSE', content: 'Это блок IF ELSE' },  // Блок IF ELSE
  // Можно добавить другие типы блоков по мере необходимости
];
</script>