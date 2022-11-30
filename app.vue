<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/stores/counterStore';
import { Event } from '@/types/LiveEvents';
import { storeToRefs } from 'pinia';
try {
  const route = useRoute();

  const { events } = storeToRefs(useCounterStore());

  if (route.name === 'Test') {
    const data = await $fetch(`${import.meta.env.VITE_API_URL}/search/liveEvents`, {
      body: { eventIds: 'ugn29046xzrbvyv0fbif9' },
      method: 'POST',
    });

    events.value = (data as { events: { rows: [Event] } })?.events?.rows;

    useHead({
      title: events.value?.[0]?.event?.eventName ?? 'Head',
    });
  }
} catch (e) {
  console.log(e);
}

onMounted(() => {
  const { initAuth } = useAuth();
  initAuth();
});
</script>
