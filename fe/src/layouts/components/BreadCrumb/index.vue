<template>
  <nav class="bg-slate-100 h-10 px-3 leading-10">
    <template
      v-for="item in breadCrumbs"
      :key="item.name">
      <router-link :to="item.path">{{ item.name }}</router-link>
      <span class="last:invisible"> &gt; </span>
    </template>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const breadCrumbs = computed(() => {
  const { matched } = route
  return matched.map(v => ({
    path: v.redirect || v.path,
    name: v.name,
  }))
})
</script>

<style scoped></style>
