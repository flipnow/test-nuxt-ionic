<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
try {
  if (process.server) {
    const { getHead } = useSeoMeta();
    const head = await getHead();
    console.log('head from server', head);
    if (head) useHead(head); // needs to be in root level with script setup
  }
} catch (e) {
  console.log(e);
}

onMounted(() => {
  const { initAuth } = useAuth();
  initAuth();
});
</script>
