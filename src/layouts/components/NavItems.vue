<script setup>
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue';
</script>

<template>

  <!-- 👉 Forms & Tables -->
  <!-- <VerticalNavSectionTitle
    :item="{
      heading: '配置信息',
    }"
  /> -->

  <VerticalNavLink :item="{
    title: '库存报警',
    icon: 'ri-table-alt-line',
    to: '/inventory-warning',
  }" />

  <VerticalNavLink :item="{
    title: '有效期预警',
    icon: 'ri-table-alt-line',
    to: '/validity-warning',
  }" />

</template>
