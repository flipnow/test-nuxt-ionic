import { Event } from '@/types/LiveEvents';

export async function useSeoMeta() {
  const route = useRoute();

  if (route.name === 'Test') {
    const { data } = await useFetch(`${import.meta.env.VITE_API_URL}/search/liveEvents`, {
      body: { eventIds: '7xjk8lotjth0fbyfm8uigbu' },
      method: 'POST',
    });

    useHead({
      title: (data.value as { events: { rows: [Event] } })?.events?.rows?.[0]?.event?.eventName ?? 'Head',
    });
  }
}
