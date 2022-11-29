import mitt, { Handler } from 'mitt'
import { provide, inject, onUnmounted } from 'vue'

const emitter = mitt()

type Hook = (handler: () => void) => void
type IonHooks = {
  onIonViewWillEnter: Hook
  onIonViewDidEnter: Hook
  onIonViewWillLeave: Hook
  onIonViewDidLeave: Hook
}

export function useRegisterIonHooks(id: string, hooks: IonHooks) {
  if (!id) throw new Error('useRegisterIonHooks - registration id is required')
  provide('ion-hooks-id', id)

  hooks?.onIonViewWillEnter(() => {
    emitter.emit(`${id}-onIonViewWillEnter`)
  })
  hooks?.onIonViewDidEnter(() => {
    emitter.emit(`${id}-onIonViewDidEnter`)
  })
  hooks?.onIonViewWillLeave(() => {
    emitter.emit(`${id}-onIonViewWillLeave`)
  })
  hooks?.onIonViewDidLeave(() => {
    emitter.emit(`${id}-onIonViewDidLeave`)
  })
}

export function useIonHooks() {
  const id: string = inject('ion-hooks-id', '')
  // resolve this with registering parents id in view Page wrapper
  if (!id) throw new Error('Sprii Function Error - @/composables/useIonHooks.ts - parent component id is not defined')

  const onIonViewWillEnter = (handler: Handler) => emitter.on(`${id}-onIonViewWillEnter`, handler)
  const onIonViewDidEnter = (handler: Handler) => emitter.on(`${id}-onIonViewDidEnter`, handler)
  const onIonViewWillLeave = (handler: Handler) => emitter.on(`${id}-onIonViewWillLeave`, handler)
  const onIonViewDidLeave = (handler: Handler) => emitter.on(`${id}-onIonViewDidLeave`, handler)

  onUnmounted(() => {
    emitter.off(`${id}-onIonViewWillEnter`)
    emitter.off(`${id}-onIonViewDidEnter`)
    emitter.off(`${id}-onIonViewWillLeave`)
    emitter.off(`${id}-onIonViewDidLeave`)
  })

  return {
    onIonViewWillEnter,
    onIonViewDidEnter,
    onIonViewWillLeave,
    onIonViewDidLeave,
  }
}
