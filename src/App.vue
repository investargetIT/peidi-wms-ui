<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
if (localStorage.getItem('authToken')) {

} else {
  router.push('/login')
}
</script>

<template>
  <VApp>
    <RouterView />
    <!-- <UpgradeToPro /> -->
  </VApp>
</template>
