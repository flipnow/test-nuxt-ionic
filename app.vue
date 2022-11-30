<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
try {
  if (process.server) {
    const { setHead } = useSeoMeta();
    const head = await setHead();
    console.log(head);
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
