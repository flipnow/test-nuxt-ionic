<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tab 2</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 2</ion-title>
        </ion-toolbar>
      </ion-header>

      <ExploreContainer name="Tab 2 page" />

      <ion-button @click="counterStore.add">{{ counter }}</ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useCounterStore } from '@/stores/counterStore';
import { Event } from '@/types/LiveEvents';

const { data } = await useFetch('/api/live-event');

console.log(data.value);

useHead({
  title: (data.value as { events: { rows: [Event] } })?.events?.rows?.[0]?.event?.eventName,
});

// onIonViewDidEnter(() => {
//   useHead({
//     title: 'Tab 2',
//   });
// });

const counterStore = useCounterStore();
const { counter } = storeToRefs(counterStore);
</script>
