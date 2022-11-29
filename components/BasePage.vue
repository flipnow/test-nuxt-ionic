<script setup lang="ts">
import { IonPage, IonContent, IonRefresher, IonRefresherContent } from '@ionic/vue';
import FooterBlock from '@/components/FooterBlock.vue';
import TopNavigation from '@/components/navigation/TopNavigation.vue';
import { computed, ref } from 'vue';
import { useIonHooks } from '@/composables/useIonHooks';
import { useRoute } from 'vue-router';
import { Capacitor } from '@capacitor/core';
import TopStripe from '@/components/TopStripe.vue';
import { useMedia } from '@/composables/useMedia';
import arrowDownIconUrl from '@/assets/icons/arrow-down-1 1.svg?url';

export type RefreshHandlers = { complete: () => void; cancel: () => void };

const props = defineProps<{
  withBackground?: boolean;
  noMargins?: boolean;
  withRefresh?: boolean;
}>();

const emit = defineEmits<{
  (e: 'refresh', handlers: RefreshHandlers): void;
}>();

const { isMobileDevice } = useMedia();

const contentRef = ref();
const refresherRef = ref();

const { onIonViewDidEnter } = useIonHooks();
const route = useRoute();

onIonViewDidEnter(() => {
  if (route.meta.scrollToTop) {
    contentRef.value?.$el?.scrollToTop?.();
  }
});

const handleRefresh = () => {
  const complete = () => refresherRef.value?.$el?.complete();
  const cancel = () => refresherRef.value?.$el?.cancel();
  emit('refresh', { complete, cancel });
};

const isTopBarHidden = computed(() => {
  if (isMobileDevice.value) {
    return isTop.value && !!props.withBackground;
  } else {
    return !!props.withBackground;
  }
});

const isTop = ref(true);
const handleScroll = (e: CustomEvent) => {
  if (e.detail.scrollTop <= 0) isTop.value = true;
  else isTop.value = false;
};
</script>

<template>
  <IonPage>
    <IonContent ref="contentRef" scroll-events @ion-scroll="handleScroll">
      <IonRefresher
        v-if="withRefresh"
        ref="refresherRef"
        slot="fixed"
        :disabled="!withRefresh"
        @ion-refresh="handleRefresh"
      >
        <IonRefresherContent :pulling-icon="arrowDownIconUrl" class="base-page__refresher" refreshing-spinner="dots" />
      </IonRefresher>
      <div class="base-page__wrapper">
        <TopStripe v-if="!isTopBarHidden" :sticky="isMobileDevice" />
        <TopNavigation :is-background-gradient="withBackground" />
        <div class="content-wrapper">
          <div
            :class="{
              'content-wrapper--with-background': withBackground,
              'content-wrapper--mobile-app': Capacitor.isNativePlatform(),
            }"
          >
            <slot name="background"> </slot>
          </div>
          <div :class="{ 'default-margins': !noMargins }">
            <slot name="default"></slot>
          </div>
        </div>
        <FooterBlock v-if="!$route?.meta?.hideFooter && !Capacitor.isNativePlatform()" class="base-page__footer" />
      </div>
    </IonContent>
  </IonPage>
</template>

<style scoped lang="scss">
ion-content {
  --padding-top: var(--ion-safe-area-top);
  @include md {
    --padding-top: 0;
  }
}

.base-page__refresher {
  padding-top: calc(var(--ion-safe-area-top));
}

.base-page__wrapper {
  display: flex;
  flex-direction: column;
}

.base-page__footer {
  display: none;
  margin: auto 0 0 0;
  @include md {
    display: unset;
  }
}

.content-wrapper {
  &--with-background {
    position: relative;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: calc((var(--ion-safe-area-top) + var(--top-menu-height)) * -1);
      width: 100%;
      height: calc(100% + var(--transparent-bg-adjustment) + var(--top-menu-height) + var(--ion-safe-area-top));
      background-image: url('/background-gradient.svg');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      z-index: -1;

      @include sm {
        top: calc((var(--ion-safe-area-top) + var(--top-menu-height-sm)) * -1);
        height: calc(100% + var(--transparent-bg-adjustment) + var(--top-menu-height-sm) + var(--ion-safe-area-top));
      }
    }

    &.content-wrapper--mobile-app::before {
      background-image: url('/background-gradient.png');
    }
  }
}

.default-margins {
  margin: var(--margin-sm);

  @include md {
    margin: var(--margin-md);
    --grid-column-width-min: var(--hosts-card-width-min-md);
  }

  @include lg {
    margin: var(--margin-lg);
  }

  @include xxl {
    max-width: var(--max-width-xxl);
    margin: var(--margin-xxl);
  }
}

.header-md::after,
.footer-md::after {
  /* Removes the toolbar shadow. */
  background: none;
}
</style>
