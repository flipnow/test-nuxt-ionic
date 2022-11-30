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
      {{ events }}
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/stores/counterStore';
import { Event } from '@/types/LiveEvents';
import { storeToRefs } from 'pinia';

const { events } = storeToRefs(useCounterStore());
</script>
