<script setup lang="ts">
import { computed, ref } from 'vue';
import { Event } from '@/types/LiveEvents';
import BaseImage from '@/components/BaseImage.vue';
import { useLiveTimer } from '@/composables/useLiveTimer';
import { useIonHooks } from '@/composables/useIonHooks';
import { IonCardContent, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonAvatar } from '@ionic/vue';
import TagItem from '@/components/TagItem.vue';
import PlayButton from '@/components/PlayButton.vue';

type Props = {
  show: Event;
  responsive?: boolean;
};
const props = defineProps<Props>();

const showImageSrc = computed(() => {
  const { event } = props.show;
  return event.coverPhotoPath || event.storeInfo.cover || event.storeInfo.picture;
});

const videoImageSrc = computed(() => {
  const { event } = props.show;
  return event.liveVideoCover || event.storeInfo.cover || event.storeInfo.picture;
});

const storeImageSrc = computed(() => {
  const { event } = props.show;
  return event.storeInfo.picture || event.storeInfo.cover;
});

const hasVideo = computed(() => {
  const { currentStatus } = props.show.event;
  return ['live', 'vod'].includes(currentStatus);
});

const { isLive, tagVariant, tagTitle, stopTimer, startTimer } = useLiveTimer(props.show);

const { onIonViewWillEnter, onIonViewWillLeave } = useIonHooks();

onIonViewWillEnter(startTimer);
onIonViewWillLeave(stopTimer);
</script>

<template>
  <RouterLink
    :class="{
      'show-card': true,
      'show-card--responsive': responsive,
    }"
    :to="{ name: 'Tab2', params: { id: show.id } }"
    draggable="false"
  >
    <IonCard>
      <TagItem
        class="show-card__tag"
        :title="tagTitle"
        size="small"
        :variant="tagVariant"
        :animation="isLive ? 'pulse' : 'none'"
      />
      <BaseImage class="show-card__image" :src="showImageSrc" :alt-text="show.event.eventName" load-fail-icon />
      <div class="show-card__content">
        <div class="show-card__info-wrapper">
          <IonCardHeader>
            <IonCardSubtitle class="show-card__top">
              <IonAvatar class="show-card__avatar">
                <img :src="storeImageSrc" alt="store avatar" />
              </IonAvatar>

              <div>
                {{ show.event.storeInfo.name }}
              </div>
            </IonCardSubtitle>

            <IonCardTitle>
              {{ show.event.eventName || $t('event.title') }}
            </IonCardTitle>
          </IonCardHeader>

          <IonCardContent class="show-card__description">
            <TagItem
              v-if="show.event?.category"
              :title="$t(`tags_and_categories.${show.event.category}`)"
              size="small"
              :variant="tagVariant"
              tint
            />
          </IonCardContent>
        </div>

        <div class="show-card__mini-player">
          <div v-if="hasVideo" class="show-card__mini-player__play-card">
            <BaseImage
              :src="videoImageSrc"
              :alt-text="show.event.eventName"
              load-fail-icon
              class="show-card__mini-player__image"
            />
            <PlayButton size="small" :playing="false" :loading="true" />
          </div>
        </div>
      </div>
    </IonCard>
  </RouterLink>
</template>

<style lang="scss" scoped>
.show-card {
  text-align: left;
  text-transform: capitalize;
  text-decoration: none;
  user-select: none;
  -webkit-user-drag: none;
  position: relative;
  width: var(--base-show-card-width);
  @include md {
    width: var(--base-show-card-width-md);
  }

  &--responsive {
    min-width: var(--base-show-card-width-min);
    max-width: var(--base-show-card-width-max);
    width: 100%;

    @include md {
      max-width: var(--base-show-card-width-max-md);
    }
  }

  ion-card {
    margin: 0;
    padding: 0;
    border-radius: 24px;
    box-shadow: 0px 4px 64px rgba(25, 25, 25, 0.14);
    transition: box-shadow 0.25s ease-in;

    &:hover,
    &:focus {
      box-shadow: 0px 4px 64px rgba(25, 25, 25, 0.4);
      cursor: pointer;
    }
  }

  ion-card-header {
    padding: 0;
  }

  ion-card-title {
    font-size: 1rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  ion-card-subtitle {
    font-size: 0.625rem;
  }

  ion-card-content {
    padding: 8px 0;
    font-size: 0.75rem;
  }

  &__tag {
    position: absolute;
    z-index: 1;
    top: 1rem;
    left: 1rem;
  }

  &__content {
    padding: 8px 8px 8px 16px;
    height: 111px;
    display: grid;
    grid-template-columns: 1fr auto;
  }

  &__info-wrapper {
    display: flex;
    flex-flow: column;
    justify-items: flex-end;
    min-width: 0;
    min-height: 0;
  }

  &__description {
    display: flex;
    align-items: flex-end;
    height: 100%;
    position: relative;
    margin-top: auto;
  }

  &__top {
    display: flex;
    grid-gap: 5px;
    align-items: center;
  }

  &__avatar {
    width: 20px;
    height: 20px;
  }

  &__image {
    position: relative;
    display: flex;
    aspect-ratio: 2 / 1;
    // firefox related issue, when swiping
    // it would drag the image
    // and stop the slider
    pointer-events: none;
    &::part(image) {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      object-fit: cover;
    }
    &::after {
      position: absolute;
      content: '';
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      background: linear-gradient(
        242.9deg,
        rgba(62, 75, 92, 0.2) 0.54%,
        rgba(62, 75, 92, 0.08) 13.23%,
        rgba(62, 75, 92, 0) 22.53%
      );
    }
  }

  &__mini-player {
    display: flex;
    min-width: 89px;
    width: 100%;
    height: 100%;
    position: relative;
    pointer-events: auto;
    padding-bottom: 8px;

    @include md {
      min-width: 114px;
    }

    &__play-card {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      bottom: 0;
      right: 0;
      width: 100%;
      min-height: 100%;
      border: 2px white solid;
      border-radius: 16px;
      overflow: hidden;
      padding: 0;

      transition-property: transform;
      transition-duration: 0.2s;

      &:hover {
        transform: scale(1.04);
      }

      aspect-ratio: 0.56;
      @supports not (aspect-ratio: 0.56) {
        min-height: 156px;

        @include md {
          min-height: 196px;
        }
      }
    }

    &__image {
      display: flex;
      object-fit: cover;
      object-position: center;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
  }
  .show-card__icon {
    position: absolute;
    right: 1rem;
    top: 1rem;
    fill: var(--white);
    filter: drop-shadow(0px 2px 6px rgba(29, 34, 43, 0.08));
    &--fill {
      fill: var(--green-500);
    }
    :deep(path) {
      stroke-width: 0px;
    }
  }
}
</style>
