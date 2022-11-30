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

const { data } = await useFetch(`https://europe-west1-elisashop-a7b5f.cloudfunctions.net/shopApi/search/liveEvents`, {
  body: { eventIds: 'ugn29046xzrbvyv0fbif9' },
  method: 'POST',
});

const head = {
  title: (data.value as { events: { rows: [Event] } })?.events?.rows?.[0]?.event?.eventName ?? 'Head',
};

console.log('head from page', head);

useHead(head);
</script>
