<script>
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_ENDPOINT;

export default {
  data() {
    return {
      desserts: [
        {
          brandName: 'Frozen Yogurt',
          goodsName: 159,
          groupType: 6,
          inventoryNum: 24,
          specName: 4,
        },
        {
          brandName: 'Ice cream sandwich',
          goodsName: 237,
          groupType: 6,
          inventoryNum: 24,
          specName: 4,
        },
        {
          brandName: 'Eclair',
          goodsName: 262,
          groupType: 6,
          inventoryNum: 24,
          specName: 4,
        },
        {
          brandName: 'Cupcake',
          goodsName: 305,
          groupType: 6,
          inventoryNum: 24,
          specName: 4,
        },
        {
          brandName: 'Gingerbread',
          goodsName: 356,
          groupType: 6,
          inventoryNum: 24,
          specName: 4,
        },
      ],
    };
  },
  mounted() {
    console.log('base url', BASE_URL);
    axios.get(BASE_URL + 'inventory/inventory-waring')
      .then(response => {
        // 成功时的处理逻辑
        console.log(response);
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
        <td>
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
          {{ item.waringLevel }}
        </td>
      </tr>
    </tbody>
  </VTable>
</template>
