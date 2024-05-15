import { MenuListItemProps } from '@/layouts/components/SidebarNav/types'
import { defineStore } from 'pinia'
import { nextTick } from 'vue'

export const useMenuStore = defineStore('menu', {
  state: () => ({
    logo: '/img/avatar.jpg',
    list: [] as MenuListItemProps[],
  }),

  actions: {
    async getMenuList() {
      // 这里可以根据用户权限动态生成菜单列表
      nextTick(() => {
        this.list = [
          {
            name: '主页',
            pathName: 'homeindex',
            icon: 'icon-home',
            meta: {
              title: '主页',
            },
          },
          {
            name: '用户管理',
            pathName: 'users',
            icon: 'icon-job-roles',
            meta: {
              title: '用户管理',
            },
          },
          {
            name: '菜单管理',
            pathName: 'menus',
            icon: 'icon-menu',
            meta: {
              title: '菜单管理',
            },
          },
          {
            name: '角色管理',
            pathName: 'roles',
            icon: 'icon-quanxian',
            meta: {
              title: '角色管理',
            },
          },
        ]
        // console.log('🚀 ~ nextTick ~ list:', this.list)
      })

      return this.list
    },
  },
})

