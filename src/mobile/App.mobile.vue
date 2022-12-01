<script setup lang="ts">
// import { initEventUpdatesListener } from '@/services/liveEvents';
import { IonApp, IonRouterOutlet, isPlatform } from '@ionic/vue';
import { onMounted, watch } from 'vue';
// import MobileNavigation from '@/components/navigation/MobileNavigation.vue';

// import GlobalModalController from '@/components/modals/GlobalModalController.vue';
// import { initEventBroker } from './services/eventBroker';
// import { useModalStore } from '@/store/modalStore';
// import { useAuth } from '@/composables/useAuth';
// import { useCodepush } from '@/composables/useCodepush';
// import { usePushNotifications } from '@/composables/usePushNotifications';
// import { markNotificationAsSeen } from '@/services/mailNotifications';
// import { storeToRefs } from 'pinia';
// import { useUserStore } from '@/store/userStore';
import { useRoute } from 'vue-router';

const route = useRoute();
// const store = useUserStore();
// const modalStore = useModalStore();
// const { isLoggedIn } = storeToRefs(store);
// const { initAuth } = useAuth();
// const { initCodepush } = useCodepush();
// const { initPushNotifications } = usePushNotifications();

onMounted(() => {
  // initCodepush();
  // initAuth();
  // initEventUpdatesListener();
  // initPushNotifications();
  // initEventBroker(modalStore);

  // disable ios browser swipe back, ionic swipe back is still active
  if (isPlatform('ios') && isPlatform('mobileweb')) {
    document.querySelector('ion-app')?.addEventListener('touchstart', (e: TouchEvent) => {
      const [touch] = e.targetTouches;
      if (touch.pageX < 20 || touch.pageX > window.innerWidth - 20) {
        e.preventDefault();
        e.stopPropagation();
      }
    });
  }
});

// watch(
//   [isLoggedIn, () => route?.query?.notificationID],
//   async () => {
//     if (route?.query?.notificationID && isLoggedIn.value) {
//       try {
//         await markNotificationAsSeen(route.query.notificationID);
//       } catch (err) {
//         console.warn(err);
//       }
//     }
//   },
//   { immediate: true },
// );
</script>

<template>
  <IonApp>
    <IonRouterOutlet id="main" />
    <!-- <GlobalModalController />
    <MobileNavigation /> -->
  </IonApp>
</template>

<style lang="scss">
@import '@/assets/stylesheets/base.scss';
</style>
