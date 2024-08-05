<script setup>
import VerticalNavSectionTitle from '@/@layouts/components/VerticalNavSectionTitle.vue'
import VerticalNavGroup from '@layouts/components/VerticalNavGroup.vue'
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue'
</script>

<template>

  <!-- 👉 Forms & Tables -->
  <VerticalNavSectionTitle
    :item="{
      heading: '配置信息',
    }"
  />
  <VerticalNavLink
    :item="{
      title: '有效期预警',
      icon: 'ri-table-alt-line',
      to: '/tables',
    }"
  />

    <VerticalNavLink
    :item="{
      title: '库存报警',
      icon: 'ri-table-alt-line',
      to: '/inventory-waring',
    }"
  />
</template>
