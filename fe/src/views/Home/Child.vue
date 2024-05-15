<template>
  <section class=" bg-slate-200 p-10">
    <div class="mb-5">我是嵌套很深的子组件</div>
    <button
      @click="handleRefresh"
      class="bg-orange-500 text-white p-2 rounded-md">
      刷新合规入口数据
    </button>

    <button
      @click="changeAvatar"
      class="ml-2 bg-green-500 text-white p-2 rounded-md">
      更换头像
    </button>

    <button
      class="ml-2 bg-sky-400 text-white p-2 rounded-md"
      @click="handleConfig">
      模拟合规设置
    </button>
  </section>
</template>

<script setup lang="ts">
import { getCurrentInstance } from 'vue'
import type { ComponentInternalInstance } from 'vue'
import { getTargetInstExposed } from '../../utils/dom.ts'

const instance = getCurrentInstance()

defineOptions({
  name: 'HomeChildPage',
})

function handleRefresh() {
  const targetRef = getTargetInstExposed(instance as ComponentInternalInstance, 'DefaultLayout')
  // console.log(`targetRef -->`, targetRef.commonHeaderRef.value.complianceRef)

  targetRef.commonHeaderRef.value.complianceRef.queryCompliance()
  // targetRef.commonHeaderRef.value.complianceRef.refresh()
}

function changeAvatar() {
  const targetRef = getTargetInstExposed(instance as ComponentInternalInstance, 'DefaultLayout')
  // console.log(`targetRef -->`, targetRef.commonHeaderRef.value)

  targetRef.commonHeaderRef.value.handleToggle()
}

function handleConfig() {
  const info =
    typeof localStorage.getItem('SAAS_COMPLIANCE_INFO') === 'string' &&
    JSON.parse(localStorage.getItem('SAAS_COMPLIANCE_INFO') as string)

  if (info) {
    alert(
      `从storage里取: ${JSON.stringify(info)}\n${
        info.enableStatus == 1 ? '进入编辑页' : '进入介绍页'
      }`
    )
  } else {
    alert('缓存没有，从接口取')
  }
}
</script>

<style scoped></style>
