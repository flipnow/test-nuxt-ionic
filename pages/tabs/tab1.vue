<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tab 1 {{ md }}</ion-title>
        <router-link to="/test">Test meta from app</router-link>
        <router-link to="/test-head">Test meta from page</router-link>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 1</ion-title>

          <ion-button @click="counterStore.add">{{ counter }}</ion-button>
        </ion-toolbar>
      </ion-header>

      <ShowCard v-for="show in events" :show="show" :key="show.id"></ShowCard>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useCounterStore } from '@/stores/counterStore';
import { fetchHomepage } from '@/services/search';
import { Event } from '@/types/LiveEvents';
import ShowCard from '@/components/ShowCard.vue';
import { useMedia } from '@/composables/useMedia';
import { HomepageSearchResults } from '@/types/SearchQuery';

const { md } = useMedia();

useRegisterIonHooks('Tab1', {
  onIonViewWillEnter,
  onIonViewDidEnter,
  onIonViewWillLeave,
  onIonViewDidLeave,
});

onIonViewDidEnter(() => {
  useHead({
    title: 'Tab 1',
  });
});

const events = ref<Event[]>([]);

const getData = async () => {
  const { data } = await useFetch<HomepageSearchResults>(
    `https://europe-west1-elisashop-a7b5f.cloudfunctions.net/shopApi/search/homepage`,
    {
      method: 'POST',
      body: {
        page: 1,
        showExpired: false,
        size: 20,
      },
    },
  );
  events.value = data.value?.liveEventsPlanned?.rows || [];
};

onMounted(() => {
  getData();
});

const counterStore = useCounterStore();
const { counter } = storeToRefs(counterStore);
</script>
