<template>
  <header class="flex justify-between px-3 h-16">
    <div class="leading-[64px]">左侧</div>
    <div class="flex items-center">
      <ComplianceEntry ref="complianceRef" />

      <div
        class="h-10 flex overflow-hidden border-2 rounded-full"
        ref="avatarRef">
        <img
          class="w-full"
          :src="toggle ? '/img/avatar.jpg' : '/img/avatar2.jpg'" />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ComplianceEntry from './complianceEntry.vue'
import useHeader from './useCommonHeader'
defineOptions({ name: 'ComplianceEntry' })
const { toggle, handleToggle } = useHeader()
const avatarRef = ref<HTMLDivElement>()
const complianceRef = ref<InstanceType<typeof ComplianceEntry>>()

defineExpose({
  handleToggle,
  complianceRef,
})
</script>

<style scoped></style>
