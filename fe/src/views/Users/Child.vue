<template>
  <h3 class="mb-4">这里是嵌套很深的孙组件</h3>
  <div class="flex ">
    <button
      class="bg-blue-500 text-white p-2 px-4 rounded-md"
      @click="handleRefresh">
      刷新合规
    </button>

    <button
      @click="changeAvatar"
      class="ml-2 bg-green-500 text-white p-2 rounded-md">
      更换头像
    </button>

    <button
      class="ml-2 bg-sky-400 text-white p-2 rounded-md"
      @click="handleConfig">
      其他操作
    </button>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance } from 'vue'
import type { ComponentInternalInstance } from 'vue'
import { getTargetInstExposed } from '../../utils/dom.ts'

const instance = getCurrentInstance()

defineOptions({
  name: 'UsersChildPage',
})

function handleRefresh() {
  const targetRef = getTargetInstExposed(instance as ComponentInternalInstance, 'DefaultLayout')
  // console.log(`targetRef -->`, targetRef.commonHeaderRef.value.complianceRef)

  targetRef.commonHeaderRef.value.complianceRef.refresh()
}

function changeAvatar() {
  const targetRef = getTargetInstExposed(instance as ComponentInternalInstance, 'DefaultLayout')
  // console.log(`targetRef -->`, targetRef.commonHeaderRef.value.toggleAvatar)

  targetRef.commonHeaderRef.value.toggleAvatar()
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
