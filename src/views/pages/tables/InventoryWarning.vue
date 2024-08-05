<script setup>
const desserts = [
  {
    dessert: 'Frozen Yogurt',
    calories: 159,
    fat: 6,
    carbs: 24,
    protein: 4,
  },
  {
    dessert: 'Ice cream sandwich',
    calories: 237,
    fat: 6,
    carbs: 24,
    protein: 4,
  },
  {
    dessert: 'Eclair',
    calories: 262,
    fat: 6,
    carbs: 24,
    protein: 4,
  },
  {
    dessert: 'Cupcake',
    calories: 305,
    fat: 6,
    carbs: 24,
    protein: 4,
  },
  {
    dessert: 'Gingerbread',
    calories: 356,
    fat: 6,
    carbs: 24,
    protein: 4,
  },
]
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
      <tr
        v-for="item in inventorywarning"
        :key="item.id"
      >
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
