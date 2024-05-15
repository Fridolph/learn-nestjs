import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import { App } from 'vue'

let routes = [
  // 其他内容页
  {
    path: '/',
    component: () => import('@/layouts/DefaultLayout/index.vue'),
    name: '主页',
    redirect: '/index',
    children: [
      {
        name: '概览',
        path: 'index',
        component: () => import('@/views/Home/index.vue'),
        meta: {
          icon: 'fas fa-home',
        },
      },
      {
        name: '用户管理',
        path: 'users',
        component: () => import('@/views/Users/index.vue'),
        meta: {
          icon: 'fas fa-user',
        },
      },
      {
        name: '菜单管理',
        path: 'menus',
        component: () => import('@/views/Menus/index.vue'),
        meta: {
          icon: 'fas fa-bars',
        },
      },
      {
        name: '角色管理',
        path: 'roles',
        component: () => import('@/views/Roles/index.vue'),
        meta: {
          icon: 'fas fa-tools',
        }
      },
    ],
  },
  {
    path: '/login',
    name: '登录',
    component: () => import('@/views/Login/index.vue'),
  },
  {
    path: '/register',
    name: '注册',
    component: () => import('@/views/Login/register.vue'),
  },
] as RouteRecordRaw[]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export function setupRouter(app: App<Element>) {
  app.use(router)
}
