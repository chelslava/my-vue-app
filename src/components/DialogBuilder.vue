<template>
  <div class="w-3/4 p-4">
    <p class="text-2xl mb-4">Конструктор диалогов</p>
    <draggable v-model="blocks" item-key="id" group="blocks" :clone="cloneBlock">
      <template #item="{ element }">
        <div v-if="element.type !== 'ifelse'" class="draggable p-4 bg-gray-100 mb-2">
          {{ element.content }}
          <button @click="removeBlock(element.id)" class="ml-4 text-red-500">Удалить</button>
        </div>
        <div v-else class="draggable ifelse p-4 bg-gray-100 mb-2">
          <div class="ifelse-section">
            <p class="ifelse-title">Если:</p>
            <!-- Место для перетаскивания блоков IF -->
            <draggable v-model="element.ifBlocks" item-key="id" group="blocks" :clone="cloneBlock">
              <template #item="{ element: ifBlock }">
                <div class="draggable p-4 bg-gray-200 mb-2">
                  {{ ifBlock.content }}
                  <button @click="removeNestedBlock(element, 'ifBlocks', ifBlock.id)" class="ml-4 text-red-500">Удалить</button>
                </div>
              </template>
              <template #footer>
                <div class="drop-zone full-width p-4 bg-gray-50 mb-2 border border-dashed border-gray-400">
                  Перетащите сюда блок для секции "Если"
                </div>
              </template>
            </draggable>
          </div>
          <div class="ifelse-section">
            <p class="ifelse-title">ТО:</p>
            <!-- Место для перетаскивания блоков THEN -->
            <draggable v-model="element.thenBlocks" item-key="id" group="blocks" :clone="cloneBlock">
              <template #item="{ element: thenBlock }">
                <div class="draggable p-4 bg-gray-200 mb-2">
                  {{ thenBlock.content }}
                  <button @click="removeNestedBlock(element, 'thenBlocks', thenBlock.id)" class="ml-4 text-red-500">Удалить</button>
                </div>
              </template>
              <template #footer>
                <div class="drop-zone full-width p-4 bg-gray-50 mb-2 border border-dashed border-gray-400">
                  Перетащите сюда блок для секции "ТО"
                </div>
              </template>
            </draggable>
          </div>
          <div class="ifelse-section">
            <p class="ifelse-title">ИНАЧЕ:</p>
            <!-- Место для перетаскивания блоков ELSE -->
            <draggable v-model="element.elseBlocks" item-key="id" group="blocks" :clone="cloneBlock">
              <template #item="{ element: elseBlock }">
                <div class="draggable p-4 bg-gray-200 mb-2">
                  {{ elseBlock.content }}
                  <button @click="removeNestedBlock(element, 'elseBlocks', elseBlock.id)" class="ml-4 text-red-500">Удалить</button>
                </div>
              </template>
              <template #footer>
                <div class="drop-zone full-width p-4 bg-gray-50 mb-2 border border-dashed border-gray-400">
                  Перетащите сюда блок для секции "ИНАЧЕ"
                </div>
              </template>
            </draggable>
          </div>
          <button @click="removeBlock(element.id)" class="ml-4 text-red-500">Удалить IF ELSE</button>
        </div>
      </template>
    </draggable>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { defineExpose } from 'vue';
import draggable from 'vuedraggable';

const blocks = ref([]);

const addBlock = (block) => {
  const newBlock = {
    ...block,
    id: Date.now(),
    ifBlocks: block.type === 'ifelse' ? [] : undefined,
    thenBlocks: block.type === 'ifelse' ? [] : undefined,
    elseBlocks: block.type === 'ifelse' ? [] : undefined
  };
  blocks.value.push(newBlock);
};

const removeBlock = (id) => {
  blocks.value = blocks.value.filter(block => block.id !== id);
};

const removeNestedBlock = (parentBlock, key, id) => {
  parentBlock[key] = parentBlock[key].filter(block => block.id !== id);
};

const cloneBlock = (block) => {
  return { ...block, id: Date.now() };
};

watch(blocks, (newBlocks) => {
  localStorage.setItem('blocks', JSON.stringify(newBlocks));
}, { deep: true });

onMounted(() => {
  const savedBlocks = localStorage.getItem('blocks');
  if (savedBlocks) {
    blocks.value = JSON.parse(savedBlocks);
  }
});

defineExpose({
  addBlock,
  removeBlock,
});
</script>

<style scoped>
.draggable {
  border: 1px solid #ccc;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ifelse {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.ifelse-section {
  margin-bottom: 1rem;
  width: 100%;
}

.ifelse-title {
  font-weight: bold;
  text-align: left;
  width: 100%;
}

.drop-zone {
  background-color: #f8f8f8;
  border-radius: 5px;
  margin-bottom: 1rem;
  width: 100%;
}

.full-width {
  width: 100%;
}
</style>
