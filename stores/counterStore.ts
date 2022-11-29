import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counterStore', () => {
  const counter = ref(0);

  const add = () => counter.value++;

  return {
    counter,
    add,
  };
});
