import { createI18n } from 'vue-i18n';
import en from '@/locale/en/shared.json';
import da from '@/locale/da/shared.json';
import { DateTimeFormat } from '@intlify/core-base';

const messages = { 'en-GB': en, da };
const datetimeFormats: DateTimeFormat = {
  longDay: {
    weekday: 'long',
  },
  time: {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  },
  dateWithTime: {
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  },
  weekdayWithTime: {
    weekday: 'long',
    day: 'numeric',
    month: 'numeric',
  },
};

export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
    legacy: false, // you must set `false`, to use Composition API
    locale: 'da',
    fallbackLocale: {
      en: ['en-GB'],
      default: ['da'],
    },
    globalInjection: true,
    messages,
    datetimeFormats: {
      'en-GB': datetimeFormats,
      da: datetimeFormats,
    },
  });

  vueApp.use(i18n);
});
