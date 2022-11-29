<script setup lang="ts">
import { Animation, createAnimation } from '@ionic/vue';
import { ref, watch } from 'vue';
import { animate } from 'popmotion';
import { interpolate } from 'flubber';
import { useIonHooks } from '@/composables/useIonHooks';

const props = withDefaults(
  defineProps<{
    playing?: boolean;
    loading?: boolean;
    size?: 'small' | 'medium';
  }>(),
  {
    size: 'medium',
  },
);

const { onIonViewWillEnter, onIonViewWillLeave } = useIonHooks();
const isInView = ref(true);

onIonViewWillEnter(() => (isInView.value = true));
onIonViewWillLeave(() => (isInView.value = false));

const spinnerRef = ref();
const playIconRef = ref();

let spinningAnimation: Animation;
let arcLengthAnimation: ReturnType<typeof animate>;

const morph: ReturnType<typeof interpolate> = interpolate(
  // triangle - play icon shape
  'M12,0 L40,20 L40,20 L12,40Z',
  // square with round corners - stop icon shape
  'M36.1953 0.3125H3.80469C1.87601 0.3125 0.3125 1.87601 0.3125 3.80469V36.1953C0.3125 38.124 1.87601 39.6875 3.80469 39.6875H36.1953C38.124 39.6875 39.6875 38.124 39.6875 36.1953V3.80469C39.6875 1.87601 38.124 0.3125 36.1953 0.3125Z',
);

const spinnerDuration = 1750;

watch([() => props.playing, playIconRef], ([newPlaying], [oldPlaying]) => {
  if (!isInView.value) return;
  if (!playIconRef.value) return;
  if (newPlaying && !oldPlaying) {
    animate({
      duration: 250,
      from: 0,
      to: 1,
      onUpdate: (latest: number) => {
        playIconRef.value.setAttribute('d', morph(latest));
      },
    });
  } else if (!newPlaying && oldPlaying) {
    animate({
      duration: 250,
      from: 1,
      to: 0,
      onUpdate: (latest: number) => {
        playIconRef.value.setAttribute('d', morph(latest));
      },
    });
  }
});

watch(
  [() => props.loading, spinnerRef],
  ([loading, spinner]) => {
    if (!isInView.value) return;
    if (!spinner) return;
    if (loading) {
      spinningAnimation = createAnimation()
        .addElement(spinner)
        .duration(spinnerDuration)
        .iterations(Infinity)
        .easing('linear')
        .keyframes([
          { offset: 0, transform: 'rotate(0deg)' },
          { offset: 0.5, transform: 'rotate(-360deg)' },
          { offset: 1, transform: 'rotate(-720deg)' },
        ]);
      spinningAnimation.play();

      arcLengthAnimation?.stop?.();
      arcLengthAnimation = animate({
        duration: spinnerDuration,
        to: [376, 282, 376], // stroke-dashoffset values - from a dot to quarter arc to a dot
        repeat: Infinity,
        onUpdate: (latest: number) => {
          spinner.setAttribute('stroke-dashoffset', latest);
        },
      });
    } else {
      spinningAnimation?.pause?.();
      arcLengthAnimation?.stop?.();
    }
  },
  { immediate: true },
);
</script>

<template>
  <div :class="{ 'play-button-wrapper': true, 'play-button-backdrop': playing }">
    <div :class="{ 'play-button': true, 'play-button--small': size === 'small' }">
      <div v-if="isInView && loading" class="play-button__spinner-wrapper">
        <svg
          class="play-button__spinner"
          width="120"
          height="120"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            id="spinnerCircle"
            ref="spinnerRef"
            cx="60"
            cy="60"
            r="57"
            stroke-dasharray="376"
            stroke-dashoffset="376"
            stroke-width="8"
            stroke-linecap="round"
            stroke="url('#spriiGradient')"
          />
          <defs>
            <linearGradient id="spriiGradient" x1="18" y1="120" x2="102" y2="20" gradientUnits="userSpaceOnUse">
              <stop stop-color="#C2E7EE" stop-opacity="0" />
              <stop offset="0.253282" stop-color="#C2E7EE" />
              <stop offset="0.480938" stop-color="#5D6775" />
              <stop offset="0.692204" stop-color="#DE6E7E" />
              <stop offset="0.833811" stop-color="#ED806E" />
              <stop offset="1" stop-color="#FB9A8A" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <button class="play-button-indicator-background">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path ref="playIconRef" d="M12,0 L40,20 L40,20 L12,40Z" fill="white" fill-opacity="0.9" />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.play-button {
  position: relative;

  &-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
  }

  &-backdrop {
    background-color: rgba(0, 0, 0, 0.4);
  }

  &-indicator-background {
    width: 120px;
    height: 120px;
    border-radius: 120px;
    border-color: var(--gray-900);
    border-width: 6px;
    border-style: solid;
    background-color: rgba(0, 0, 0, 0.8);
  }

  &__spinner {
    position: absolute;
    right: 0;
    top: 0;
    transform: scaleY(-1);

    &-wrapper {
      position: absolute;
      width: 100%;
      height: 100%;
    }

    circle {
      transform-origin: 60px 60px 0;
    }
  }

  &--small {
    scale: (0.5);
  }
}
</style>
