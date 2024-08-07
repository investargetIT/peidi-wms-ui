<template>
  <div class="warehouse-container">
    <!-- List of existing warehouses -->
    <div class="warehouses-list">
      <div v-for="(warehouse, index) in warehouses" :key="index" class="warehouse-item">
        <span>{{ warehouse.name }}</span>
        <span @click="deleteWarehouse(index)" class="delete-icon">&#10005;</span>
      </div>
    </div>

    <!-- Section for adding a new warehouse -->
    <div class="add-warehouse-input">
      <input type="text" v-model="newWarehouseName" placeholder="输入新仓库名称">
      <button @click="addWarehouse">添加</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      warehouses: [
        { id: 1, name: '现货仓' },
        { id: 2, name: '京东仓' },
        { id: 3, name: '天猫仓' },
        { id: 4, name: '自营仓' }
      ],
      newWarehouseName: ''
    };
  },
  methods: {
    addWarehouse() {
      if (this.newWarehouseName.trim() !== '') {
        addWarehouseAPI({ name: this.newWarehouseName })
          .then(newWarehouse => {
            this.warehouses.push(newWarehouse);
            this.newWarehouseName = ''; // Clear input field
          })
          .catch(error => {
            console.error('新增接口调用失败', error);
          });
      }
    },
    deleteWarehouse(index) {
      deleteWarehouseAPI(this.warehouses[index].id)
        .then(() => {
          this.warehouses.splice(index, 1);
        })
        .catch(error => {
          console.error('删除接口调用失败', error);
        });
    }
  }
};

// Example API functions, replace with actual API calls in your project
function addWarehouseAPI(newWarehouse) {
  return new Promise((resolve, reject) => {
    // Simulated API call, replace with actual API request
    setTimeout(() => {
      // Simulating success
      const id = Math.floor(Math.random() * 1000) + 1; // Generate random ID
      const warehouse = { id, name: newWarehouse.name };
      resolve(warehouse);
    }, 500); // Simulated delay of 500ms
  });
}

function deleteWarehouseAPI(warehouseId) {
  return new Promise((resolve, reject) => {
    // Simulated API call, replace with actual API request
    setTimeout(() => {
      // Simulating success
      resolve();
    }, 300); // Simulated delay of 300ms
  });
}
</script>

<style scoped>
.warehouse-container {
  margin: 0 auto;
  font-family: Arial, sans-serif;
}

.warehouses-list {
  border-radius: 4px;
  margin-bottom: 10px;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.warehouse-item {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.delete-icon {
  cursor: pointer;
  color: #f44336;
  font-size: 16px;
}

.add-warehouse-input {
  display: flex;
  align-items: center;
}

.add-warehouse-input input {
  width: 200px;
  /* Adjust width as needed */
  margin-right: 10px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.add-warehouse-input button {
  width: 80px;
  /* Adjust width as needed */
  padding: 6px 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-warehouse-input button:hover {
  background-color: #45a049;
}
</style>
