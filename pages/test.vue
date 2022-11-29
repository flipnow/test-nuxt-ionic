<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Test</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Test</ion-title>
        </ion-toolbar>
      </ion-header>
      {{ data }}
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { Event } from '@/types/LiveEvents';

const data = await $fetch(`${import.meta.env.VITE_API_URL}/search/liveEvents`, {
  body: JSON.stringify({ eventIds: '7xjk8lotjth0fbyfm8uigbu' }),
  headers: { 'Content-Type': 'application/json' },
  method: 'POST',
});

// definePageMeta({
//   title: (data.value as { events: { rows: [Event] } })?.events?.rows?.[0]?.event?.eventName ?? 'Page',
// });

useHead({
  title: (data as { events: { rows: [Event] } })?.events?.rows?.[0]?.event?.eventName ?? 'Head',
});
</script>
