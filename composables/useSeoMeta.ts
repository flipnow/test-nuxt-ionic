import { useCounterStore } from '@/stores/counterStore';
import { Event } from '@/types/LiveEvents';
import { storeToRefs } from 'pinia';

export function useSeoMeta() {
  const setHead = async () => {
    const route = useRoute();

    const { events } = storeToRefs(useCounterStore());

    if (route.name === 'Test') {
      const data = await $fetch(`${import.meta.env.VITE_API_URL}/search/liveEvents`, {
        body: { eventIds: 'ugn29046xzrbvyv0fbif9' },
        method: 'POST',
      });

      events.value = (data as { events: { rows: [Event] } })?.events?.rows;

      return {
        title: events.value?.[0]?.event?.eventName ?? 'Head',
      };
    }
  };
  return { setHead };
}
