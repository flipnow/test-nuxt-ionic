<script setup lang="ts">
import { Animation, createAnimation } from '@ionic/vue';
import { ref, watchEffect } from 'vue';

export type TagVariant = 'blue' | 'violet' | 'red' | 'green' | 'yellow' | 'orange' | 'grey' | 'black';
export type TagSize = 'small' | 'medium';
export type TagAnimation = 'none' | 'pulse';

type TagItemProps = {
  variant?: TagVariant;
  size?: TagSize;
  animation?: TagAnimation;
  tint?: boolean;
  title: string;
};

const props = withDefaults(defineProps<TagItemProps>(), {
  variant: 'blue',
  animation: 'none',
  size: 'medium',
  tint: false,
});

const elRef = ref();
let animation: Animation;
watchEffect(() => {
  if (props.animation === 'pulse') {
    if (elRef.value) {
      animation = createAnimation()
        .addElement(elRef.value)
        .duration(1500)
        .iterations(Infinity)
        .keyframes([
          { offset: 0, boxShadow: `0 0 0 0 var(--${props.variant}-tag-tint-light)` },
          { offset: 0.7, boxShadow: `0 0 0 4px var(--${props.variant}-tag-tint-dark)` },
        ]);
      animation.play();
    }
  } else {
    animation?.stop();
  }
});
</script>

<template>
  <div ref="elRef" :class="['tag', `tag--${size}`, `tag-${variant}`, tint ? `tag-${variant}--tint` : '']">
    {{ title }}
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/stylesheets/base.scss';
.tag {
  @include flex(row, center, center);
  background: var(--bg-color);
  border-radius: 4px;
  font-weight: 500;
  line-height: 110%;
  color: var(--white);
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 110%;
  box-sizing: border-box;

  // tag sizes
  &--medium {
    min-width: 46px;
    height: 32px;
    padding: 8px 12px;
  }

  &--small {
    min-width: 38px;
    height: 24px;
    padding: 8px;
  }

  &-blue {
    background: var(--blue-tag);

    &--tint {
      background: var(--blue-tag-tint);
      color: var(--blue-tag);
    }
  }

  &-violet {
    background: var(--violet-tag);

    &--tint {
      background: var(--violet-tag-tint);
      color: var(--violet-tag);
    }
  }

  &-red {
    background: var(--red-tag);
    &--tint {
      background: var(--red-tag-tint);
      color: var(--red-tag);
    }
  }

  &-green {
    background: var(--green-tag);
    &--tint {
      background: var(--green-tag-tint);
      color: var(--green-tag);
    }
  }

  &-yellow {
    background: var(--yellow-tag);
    &--tint {
      background: var(--yellow-tag-tint);
      color: var(--yellow-tag);
    }
  }

  &-orange {
    background: var(--orange-tag);
    &-tint {
      background: var(--orange-tag-tint);
      color: var(--orange-tag);
    }
  }

  &-grey {
    background: var(--grey-tag);
    color: var(--green-900);

    &--tint {
      background: var(--grey-tag-tint);
      color: var(--green-900);
    }
  }

  &-black {
    background: var(--black-tag);
    color: var(--green-50);

    &--tint {
      background: var(--black-tag-tint);
      color: var(--green-50);
    }
  }
}
</style>
