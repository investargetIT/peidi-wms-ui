<template>
  <div class="info-container">
    <div v-for="(item, index) in items" :key="item.id" class="info-item">
      <span>{{ item.text }}</span>
      <button class="delete-button" @click="removeItem(index)">删除</button>
    </div>
    <button class="add-button" @click="addItem">添加项</button>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'InfoList',
  setup() {
    const items = ref([
      { id: 1, text: '信息 1' },
      { id: 2, text: '信息 2' },
    ]);

    const removeItem = (index) => {
      items.value.splice(index, 1);
    };

    const addItem = () => {
      const newId = items.value.length ? items.value[items.value.length - 1].id + 1 : 1;
      items.value.push({ id: newId, text: `信息 ${newId}` });
    };

    return {
      items,
      removeItem,
      addItem,
    };
  },
};
</script>

<style scoped>
.info-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.info-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.info-item span {
  flex: 1;
  margin-right: 10px;
}

.delete-button {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.delete-button:hover {
  background-color: #c82333;
}

.add-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.add-button:hover {
  background-color: #0056b3;
}
</style>
