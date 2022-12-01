import { ONE_SEC_IN_MS } from '@/utils/time.utils';
import { Event } from '@/types/LiveEvents';
import { ref, computed, watch } from 'vue';
import { useEventUtils } from '@/composables/useEventUtils';

export function useLiveTimer(show: Event) {
  const now = ref(new Date().getTime());

  let intervalHandle: ReturnType<typeof setInterval> | undefined;

  const startTimer = () => {
    if (isLive.value) {
      if (!intervalHandle) {
        intervalHandle = setInterval?.(() => {
          now.value = new Date().getTime();
        }, ONE_SEC_IN_MS);
      }
    } else {
      stopTimer();
    }
  };

  const stopTimer = () => {
    if (intervalHandle) {
      clearInterval(intervalHandle);
      intervalHandle = undefined;
    }
  };
  const isLive = computed(() => show.event.currentStatus === 'live');

  const { getEventTimeLabel, getEventColor } = useEventUtils();

  const tagVariant = computed(() => getEventColor(show.event) ?? 'grey');

  const tagTitle = computed(() => {
    return getEventTimeLabel(show.event, now.value);
  });

  watch(isLive, (isLiveValue) => (isLiveValue ? startTimer() : stopTimer()), { immediate: true });
  return { startTimer, stopTimer, isLive, tagVariant, tagTitle };
}
