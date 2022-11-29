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

const { data } = await useFetch('/search/liveEvents', {
  baseURL: import.meta.env.VITE_API_URL as string,
  body: { eventIds: '7xjk8lotjth0fbyfm8uigbu' },
  method: 'POST',
});

useHead({
  title: (data.value as { events: { rows: [Event] } })?.events?.rows?.[0]?.event?.eventName ?? 'Test',
});
</script>
