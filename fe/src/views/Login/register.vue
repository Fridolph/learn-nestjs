<template>
  <div class="w-full h-[100vh]">
    <section class="w-full h-full flex justify-center items-center">
      <form class="w-[400px] ring-1 ring-gray-200 shadow-xl rounded p-6">
        <div class="flex flex-col mb-1">
          <label
            class="mb-2"
            for="username"
            >用户名</label
          >
          <input
            type="text"
            id="username"
            class="peer" />
          
          <p class="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">请输入手机号 或 邮箱</p>
        </div>
        <div class="flex flex-col mb-5">
          <label
            class="mb-2"
            for="password"
            >密码</label
          >
          <input
            type="text"
            id="password"
            class="peer" />
          <p class="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">用户名或密码错误</p>
        </div>
        <div class="flex flex-col items-center">
          <button
            class="w-full h-10 bg-blue-400 hover:bg-blue-500 px-4 py-2 rounded text-white mb-2">
            注册新用户
          </button>
          <router-link
            to="/login"
            class="w-full h-10 leading-10 text-center"
            >已有账号？点击登录</router-link
          >
        </div>
      </form>
    </section>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
