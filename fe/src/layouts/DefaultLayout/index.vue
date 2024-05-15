<template>
  <section class="flex flex-nowrap">
    <!-- 左侧固定导航 -->
    <SidebarNav
      :logo="logo"
      :menuList="list" />

    <!-- 右侧主体内容 -->
    <section class="w-[calc(100vw-280px)]">
      <CommonHeader ref="commonHeaderRef" />

      <BreadCrumb />

      <main class="overflow-hidden bg-white p-5 h-[calc(100vh-104px)] overflow-y-auto">
        <router-view></router-view>
      </main>
    </section>
  </section>
</template>

<script setup lang="ts">
import { ref, toRefs } from 'vue'
import CommonHeader from '@/layouts/components/CommonHeader/index.vue'
import BreadCrumb from '@/layouts/components/BreadCrumb/index.vue'
import { useMenuStore } from '@/store/menu'
import SidebarNav from '@/layouts/components/SidebarNav/index.vue'

defineOptions({
  name: 'DefaultLayout',
})

// console.log("🚀 ~ route:", route)
const { logo, list } = toRefs(useMenuStore())
const { getMenuList } = useMenuStore()
getMenuList()

const commonHeaderRef = ref<InstanceType<typeof CommonHeader>>()
defineExpose({
  commonHeaderRef,
})
</script>

<style scoped></style>
