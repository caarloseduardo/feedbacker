<template>
  <div class="flex flex-col items-center justify-between w-full my-5">
    <icon
      name="atention"
      :color="palette.danger"
      size="70"
    />

    <p class="text-xl font-black text-center w-full mt-2">
      Ocorreu um erro ao enviar o feedback.
    </p>

    <div class="flex justify-center items-center w-full mt-2">
      <button
        @click="goBack"
        class="
          rounded-full font-regular text-sm flex flex-col justify-center bg-brand-gray
          items-center py-2 px-5 cursour-pointer focus:outline-none
        "
      >
        Tente novamente
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import palette from '../../../palette'
import { resetStore } from '@/store'
import Icon from '@/components/Icon/index.vue'

interface SetupReturn {
 goBack: () => void;
 palette: Record<string, string>;
}

export default defineComponent({
  components: { Icon },
  setup (): SetupReturn {
    function goBack () {
      resetStore()
    }

    return {
      goBack,
      palette: palette.brand
    }
  }
})
</script>
