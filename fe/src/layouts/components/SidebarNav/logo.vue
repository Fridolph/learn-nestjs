<template>
  <router-link
    v-if="showLogo"
    class="block w-24 px-4 py-3"
    to="/index">
    <img
      class="w-24"
      :src="logo" />
  </router-link>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { SidebarLogoProps } from './types'

const props = defineProps<SidebarLogoProps>()

const showLogo = computed(() => {
  if (props.logo) return true
  return false
})
</script>

<style scoped></style>
