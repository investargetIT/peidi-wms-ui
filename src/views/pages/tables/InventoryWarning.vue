<script>
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_ENDPOINT;

export default {
  data() {
    return {
      desserts: [
      ],
    };
  },
  mounted() {
    console.log('base url', BASE_URL);
    axios.get(BASE_URL + 'inventory/inventory-waring')
      .then(response => {
        // 成功时的处理逻辑
        this.desserts = response.data;
        console.log(this.desserts);
      })
      .catch(error => {
        // 错误处理
        console.error("API调用错误：", error);
      });
  },
};
</script>

<template>
  <VTable density="compact">
    <thead>
      <tr>
        <th class="text-uppercase">
          品牌
        </th>
        <th class="text-uppercase text-center">
          商品编码
        </th>
        <th class="text-uppercase text-center">
          货品名称
        </th>
        <th class="text-uppercase text-center">
          规格名称
        </th>
        <th class="text-uppercase text-center">
          分类
        </th>
        <th class="text-uppercase text-center">
          库存量
        </th>
        <th class="text-uppercase text-center">
          预警天数
        </th>
        <th class="text-uppercase text-center">
          预警状态
        </th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="item in desserts" :key="item.id">
        <td class="text-center">
          {{ item.brandName }}
        </td>
        <td class="text-center">
          {{ item.goodsName }}
        </td>
        <td class="text-center">
          {{ item.groupType }}
        </td>
        <td class="text-center">
          {{ item.inventoryNum }}
        </td>
        <td class="text-center">
          {{ item.specName }}
        </td>
        <td class="text-center">
          {{ item.specNo }}
        </td>
        <td class="text-center">
          {{ item.turnoverDays }}
        </td>
        <td class="text-center">
          <div class="circle" :style="{ 'background': item.waringLevel }">
            <!-- {{ item.waringLevel }} -->
          </div>
        </td>
      </tr>
    </tbody>
  </VTable>
</template>
<style lang="scss">
.circle {
  border-radius: 50%;
  height: 20px;
  width: 20px;
}
</style>
