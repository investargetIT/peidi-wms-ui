<script setup>
import InventoryWarning from '@/views/pages/tables/InventoryWarning.vue';
const BASE_URL = import.meta.env.VITE_API_ENDPOINT;
console.log(BASE_URL);
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="库存预警">
        <InventoryWarning />
      </VCard>
    </VCol>
  </VRow>
</template>
