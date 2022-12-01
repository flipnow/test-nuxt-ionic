<script setup lang="ts">
import { IonImg } from '@ionic/vue';
import { ref } from 'vue';

defineProps<{ src?: string; altText?: string; loadFailIcon: boolean }>();
const emit = defineEmits(['load-error', 'loaded']);

const photoError = ref(false);

const handleImageFail = () => {
  photoError.value = true;
  emit('load-error');
};
</script>
<template>
  <IonImg
    v-if="!photoError && src"
    :src="src"
    :alt="altText"
    @ion-error="handleImageFail"
    @ion-img-did-load="emit('loaded')"
  />
</template>

<style scoped>
svg {
  height: 100%;
  width: 50%;
  margin: auto;
  fill: var(--gray-600);
}
</style>
