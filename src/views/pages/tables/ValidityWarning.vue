<script>
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_ENDPOINT;

export default {
  data() {
    return {
      headers: [
        { title: '品牌', value: 'brandName', sortable: true, },
        { title: '商品编码', value: 'specNo', sortable: false },
        { title: '货品名称', value: 'goodsName', sortable: false },
        { title: '规格名称', value: 'specName', sortable: false },
        { title: '分类', value: 'groupType', sortable: true, minWidth: 100 },
        { title: '1/3效期', value: 'waring1Num', sortable: true, minWidth: 100 },
        { title: '2/3效期', value: 'waring2Num', sortable: true, minWidth: 80 },
        { title: '临期', value: 'waring3Num', sortable: true, minWidth: 100 },
        { title: '库存数量', value: 'inventoryNum', sortable: true, minWidth: 100 },
      ],
      items: [

      ],
    };
  },
  methods: {
    updateData() {
      axios.get(BASE_URL + '/inventory/validity-waring')
        .then(response => {
          const { code, data } = response.data;
          if (code == 200) {
            this.items = data;
          }
          // 成功时的处理逻辑
          console.log(this.items);
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
  </v-data-table>
</template>

<style lang="scss">
.blue-header {
  color: blue;
  font-weight: bold;
}
</style>
