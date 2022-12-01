import { Capacitor } from '@capacitor/core';
import { computed, ref, watchEffect } from 'vue';

export const useMedia = () => {
  const sm = ref(false);
  const md = ref(false);
  const lg = ref(false);
  const xl = ref(false);
  const xxl = ref(false);

  watchEffect((onInvalidate) => {
    const smMedia = window.matchMedia('(min-width: 36rem)');
    const mdMedia = window.matchMedia('(min-width: 48rem)');
    const lgMedia = window.matchMedia('(min-width: 62rem)');
    const xlMedia = window.matchMedia('(min-width: 75rem)');
    const xxlMedia = window.matchMedia('(min-width: 96rem)');

    sm.value = smMedia.matches;
    md.value = mdMedia.matches;
    lg.value = lgMedia.matches;
    xl.value = xlMedia.matches;
    xxl.value = xxlMedia.matches;

    const onChangeSmMedia = () => {
      sm.value = smMedia.matches;
    };

    const onChangeMdMedia = () => {
      md.value = mdMedia.matches;
    };

    const onChangeLgMedia = () => {
      lg.value = lgMedia.matches;
    };

    const onChangeXlMedia = () => {
      xl.value = xlMedia.matches;
    };

    const onChangeXxlMedia = () => {
      xxl.value = xxlMedia.matches;
    };

    smMedia.addEventListener('change', onChangeSmMedia);
    mdMedia.addEventListener('change', onChangeMdMedia);
    lgMedia.addEventListener('change', onChangeLgMedia);
    xlMedia.addEventListener('change', onChangeXlMedia);
    xxlMedia.addEventListener('change', onChangeXxlMedia);

    onInvalidate(() => {
      smMedia.removeEventListener('change', onChangeSmMedia);
      mdMedia.removeEventListener('change', onChangeMdMedia);
      lgMedia.removeEventListener('change', onChangeLgMedia);
      xlMedia.removeEventListener('change', onChangeXlMedia);
      xxlMedia.removeEventListener('change', onChangeXxlMedia);
    });
  });

  const isMobileDevice = computed(() => {
    return !md.value || Capacitor.isNativePlatform();
  });

  return {
    isMobileDevice,
    sm,
    md,
    lg,
    xl,
    xxl,
  };
};
