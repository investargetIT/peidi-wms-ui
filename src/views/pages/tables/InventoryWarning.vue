<script>
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_ENDPOINT;

export default {
  data() {
    return {
      headers: [
        { title: '品牌', value: 'brandName', sortable: true },
        { title: '商品编码', value: 'specNo', sortable: false },
        { title: '货品名称', value: 'goodsName', sortable: false },
        { title: '规格名称', value: 'specName', sortable: false },
        { title: '库存数量', value: 'inventoryNum', sortable: true, minWidth: 100 },
        { title: '预计可周转天数', value: 'turnoverDays', sortable: true, minWidth: 100 },
        { title: '分类', value: 'groupType', sortable: true, minWidth: 80 },
        { title: '库存预警', value: 'waringLevel', sortable: true, minWidth: 100 },
      ],
      items: [

      ],
    };
  },
  methods: {
    updateData() {
      const defaultSort = [
        { sortName: 'waringLevel', sortType: 'desc' },
        { sortName: 'groupType', sortType: 'asc' },
        { sortName: 'brandName', sortType: 'desc' },
        { sortName: 'inventoryNum', sortType: 'desc' },
      ];
      axios.get(BASE_URL + '/inventory/inventory-waring?sortStr=' + encodeURIComponent(JSON.stringify(defaultSort)))
        .then(response => {
          const { code, data } = response.data;
          if (code == 200) {
            this.items = data;
          }
        })
        .catch(error => {
          // 错误处理
          console.error("API调用错误：", error);
        });
    },
  },
  mounted() {
    // 当组件挂载后，更新数据
    this.updateData();
    // 设置定时器模拟数据更新 (实际应用中应该避免使用setInterval)
    // setInterval(() => {
    //   this.updateData();
    // }, 5000); // 每5秒更新一次数据
  },
};
</script>

<template>
  <v-data-table :headers="headers" :items="items" :items-per-page="-1" :hide-default-footer="true">
    <template v-slot:item.waringLevel="{ item }">
      <span class="circle" :style="{ 'background': item.waringLevel }"></span>
    </template>
  </v-data-table>
</template>

<style lang="scss">
.circle {
  display: block;
  border-radius: 50%;
  height: 20px;
  width: 20px;
}

.blue-header {
  color: blue;
  font-weight: bold;
}
</style>
