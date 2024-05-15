<template>
  <div class="flex flex-col flex-wrap">
    <h2 class="mb-4">页面，模拟不同页面的使用场景</h2>
    <div class="bg-gray-100 flex flex-col justify-center items-center p-4 min-h-40">
      <Child />
    </div>
  </div>
</template>

<script setup lang="ts">
import Child from './Child.vue'
</script>

<style scoped></style>
