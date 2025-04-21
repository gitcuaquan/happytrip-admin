// plugins/maska.ts
import { MaskInput } from 'maska'

export default defineNuxtPlugin((nuxtApp: any) => {
  nuxtApp.vueApp.directive('maska', {
    mounted(el: HTMLInputElement, binding: any) {
      new MaskInput(el, binding.value || {})
    },
    unmounted(el: HTMLInputElement) {
      // Cleanup if needed
    }
  })
})