<template>
  <router-view ref="routerViewRef"></router-view>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ref } from 'vue'

const routerViewRef = ref(null)
</script>
