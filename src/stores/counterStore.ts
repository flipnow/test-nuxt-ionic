import { defineStore } from 'pinia';
import { Event } from '@/types/LiveEvents';

export const useCounterStore = defineStore('counterStore', () => {
  const counter = ref(0);
  const events = ref<Event[]>([]);

  const add = () => counter.value++;

  return {
    counter,
    add,
    events,
  };
});
