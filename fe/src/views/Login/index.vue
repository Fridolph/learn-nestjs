<template>
  <div class="w-full h-[100vh]">
    <section class="w-full h-full flex justify-center items-center">
      <form class="lg:w-[600px] w-[400px] ring-1 ring-gray-200 shadow-xl rounded p-6">
        <div class="flex flex-col mb-1">
          <label
            class="mb-2"
            for="username"
            >用户名</label
          >
          <input
            v-model="loginForm.username"
            type="text"
            id="username"
            class="peer"
            :class="{ invalid: loginForm.usernameMsg }" />
          <p class="mt-2 text-pink-600 text-sm">
            {{ usernameMsg }}<span class="invisible">.</span>
          </p>
        </div>
        <div class="flex flex-col mb-5">
          <label
            class="mb-2"
            for="password"
            >密码</label
          >
          <input
            v-model="loginForm.password"
            type="text"
            id="password"
            class="peer"
            :class="{ invalid: loginForm.passwordMsg }" />
          <p class="mt-2 text-pink-600 text-sm">
            {{ passwordMsg }}<span class="invisible">.</span>
          </p>
        </div>
        <div class="flex flex-col items-center">
          <button
            class="h-10 w-full bg-blue-400 hover:bg-blue-500 px-4 py-2 focus:outline-1 rounded mb-2 text-white"
            @click="handleLogin">
            登录
          </button>
          <router-link
            to="/register"
            class="h-10 w-full bg-white ring-1 ring-gray-200 px-4 py-2 rounded-sm text-center"
            >注册</router-link
          >
        </div>
      </form>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
// import axios from '@/utils/axios'
import { useRouter } from 'vue-router'

const router = useRouter()
// 表单验证相关逻辑
const usernameMsg = computed(() => {
  const telReg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
  const mailReg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  if (
    loginForm.username === '' ||
    telReg.test(loginForm.username) ||
    mailReg.test(loginForm.username)
  ) {
    return ''
  } else {
    return '请输入正确的用户名（手机或邮箱）'
  }
})
const passwordMsg = computed(() => {
  if (
    loginForm.password === '' ||
    (loginForm.password.length >= 6 && loginForm.password.length <= 16)
  ) {
    return ''
  } else {
    return '请输入正确的用户名或密码'
  }
})
const loginForm = reactive({
  username: '',
  password: '',
  usernameMsg,
  passwordMsg
})

async function handleLogin() {
  // console.log('🚀 ~ handleLogin:', loginForm)
  // const res = await axios.post('/auto/login', loginForm)
  // console.log('🚀 ~ handleLogin ~ res:', res)
  router.push({
    path: '/home'
  })
}
</script>

<style scoped></style>
