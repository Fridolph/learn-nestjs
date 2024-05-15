<template>
  <h2 class="mb-5">Home Page</h2>

  <!-- <button
    class="p-2 bg-blue-400 text-white rounded-md"
    @click="click">
    点击拿ref
  </button> -->
  <Child />
</template>

<script setup lang="ts">
import Child from './Child.vue'
// import type { ComponentInternalInstance } from 'vue'
// import { getCurrentInstance, ref } from 'vue'

defineOptions({
  name: 'HomePage',
})

// const instance = getCurrentInstance() as ComponentInternalInstance
// function click() {
// console.log(`click -->`, instance.parent?.vnode.ctx.exposed)

// instance.parent?.vnode.ctx.exposed.refresh()
// console.log(instance?.parent?.vnode.ctx.exposed.avatarRef.value)

// 希望拿到 dom --- 命令式搞定，封装成方法
// console.log(instance?.parent?.parent?.type.name === 'DefaultLayout')

// let target = instance?.parent?.parent

// let dom = target?.exposed?.avatarRef.value
// console.log(target?.exposed?.avatarRef.value)
// dom.querySelector('.w-full').setAttribute('title', '增加一个标题')

// console.log(getTargetInstance(instance, 'DefaultLayout'))
// }
</script>

<style scoped></style>
