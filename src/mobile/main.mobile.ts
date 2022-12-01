import { createApp } from 'vue';
import App from './App.mobile.vue';
// import { router } from '@/router/index'; // TODO handle and share router and i18n for ssr and mobile
// import { i18n } from '@/i18n/i18n';

import { createPinia } from 'pinia';

import { IonicVue } from '@ionic/vue';
/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

import { App as CapacitorApp, URLOpenListenerEvent } from '@capacitor/app';

CapacitorApp.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
  const { pathname } = new URL(event.url);
  if (pathname) {
    // router.push({
    //   path: pathname,
    // });
  }
});

createApp(App)
  .use(IonicVue, {
    mode: 'ios',
    swipeBackEnabled: true,
  })
  .use(createPinia())
  // .use(router)
  // .use(i18n)
  .mount('#app');
