<script>
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_ENDPOINT;

export default {
  data() {
    return {
      desserts: [],
    }
  },
  mounted() {
    axios.get(BASE_URL + '/inventory/validity-waring')
      .then(response => {
        // 成功时的处理逻辑
        console.log(response);
        const { code, data } = response.data;
        if (code == 200) {
          this.desserts = data;
        }
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
          有效期预警
        </th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="item in desserts" :key="item.specNo">
        <td>
          {{ item.brandName }}
        </td>
        <td class="text-center">
          {{ item.specNo }}
        </td>
        <td class="text-center">
          {{ item.goodsName }}
        </td>
        <td class="text-center">
          {{ item.specNName }}
        </td>
        <td class="text-center">
          {{ item.groupType }}
        </td>
        <td class="text-center">
          {{ item.inventoryNum }}
        </td>
      </tr>
    </tbody>
  </VTable>
</template>
