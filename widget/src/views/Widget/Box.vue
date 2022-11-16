<template>
  <div class="box animate__animated animate__fadeInUp animate__faster">
    <div
      :class="{
        'justify-between': canShowAdditionalControlAndInfo,
        'justify-end': !canShowAdditionalControlAndInfo
      }"
      class="relative w-full flex"
    >
    <button
      v-if="canShowAdditionalControlAndInfo"
      @click="back"
      :disabled="canGoBack"
      :class="{ invisible: canGoBack }"
      class="text-xl text-gray-800 focus:outline-none"
    >
      <icon name="arrow-right" :color="colors.gray['800']" />
    </button>

    <p
      v-if="canShowAdditionalControlAndInfo"
      class="text-xl font-black text-center text-brand-main"
    >
      {{ label }}
    </p>

    <button
      @click="() => emit('close-box')"
      class="text-xl text-gray-800 focus:outline-none"
    >
      <icon size="14" name="close" :color="colors.gray['800']" />
    </button>
    </div>

    <wizard />

    <div
      v-if="canShowAdditionalControlAndInfo"
      class="text-gray-800 text-sm flex"
    >
      <icon name="chat" class="mr-1" :color="brandColors.graydark" />
      widget by
      <span class="ml-1 font-bold">feedbacker</span>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, SetupContext } from 'vue'

import { brand } from '../../../palette'
import colors from 'tailwindcss/colors'

import Icon from '@/components/Icon/index.vue'
import Wizard from '@/components/Wizard/index.vue'

import useStore from '@/hooks/store'
import useNavigation, { Navigation } from '@/hooks/navigation'

interface SetupReturn {
  emit: SetupContext['emit'];
  colors: Record<string, string>;
  brandColors: Record<string, string>;
  label: ComputedRef<string>;
  canGoBack: ComputedRef<boolean>;
  canShowAdditionalControlAndInfo: ComputedRef<boolean>;
  back: Navigation['back'];
}

export default defineComponent({
  emits: ['close-box'],
  components: { Icon, Wizard },
  setup (_, { emit }: SetupContext): SetupReturn {
    const store = useStore()
    const { back } = useNavigation()

    const label = computed<string>(() => {
      if (store.feedbackType === 'ISSUE') {
        return 'Reporte um problema'
      }

      if (store.feedbackType === 'IDEA') {
        return 'Nos fale a sua ideia'
      }

      if (store.feedbackType === 'OTHER') {
        return 'Abra sua mente'
      }

      return 'O que você tem em mente?'
    })

    const canGoBack = computed<boolean>(() => {
      return store.currentComponent === 'SelectFeedbackType'
    })

    const canShowAdditionalControlAndInfo = computed<boolean>(() => {
      return store.currentComponent !== 'Success' && store.currentComponent !== 'Error'
    })

    return {
      emit,
      colors,
      brandColors: brand,
      label,
      canGoBack,
      canShowAdditionalControlAndInfo,
      back
    }
  }
})
</script>

<style scoped lang="postcss">
.box {
  @apply fixed z-50 bottom-0 right-0 mb-5 mr-5 bg-white rounded-xl
  py-5 px-5 flex flex-col items-center shadow-xl select-none;
  width: 400px;
}
</style>
