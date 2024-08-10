<script setup>
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue';
</script>

<template>

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

  <VerticalNavLink :item="{
    title: '库存周转系数配置',
    icon: 'ri-table-alt-line',
    to: '/inventory-turnover',
  }" />

  <VerticalNavLink :item="{
    title: '参数配置',
    icon: 'ri-table-alt-line',
    to: '/inventory/config',
  }" />

</template>
