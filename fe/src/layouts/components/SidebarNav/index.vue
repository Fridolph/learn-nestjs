<template>
  <nav class="w-[280px] bg-slate-900 h-[100vh]">
    <Logo :logo="logo" />
    <ul class="flex flex-col px-4">
      <li class="group h-10 leading-10 w-full">
        <router-link
          v-for="item in menuList"
          :key="item.name"
          :to="{ name: item.name }"
          class="block hover:bg-slate-700">
          <Iconfont
            v-if="item.icon"
            :name="item.icon" />
          {{ item.name }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import Iconfont from '@/components/Iconfont/Iconfont.vue'
import Logo from './logo.vue'
import { SidebarProps } from './types'

defineProps<SidebarProps>()
</script>

<style scoped></style>
