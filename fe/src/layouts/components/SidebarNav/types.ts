export interface SidebarLogoProps {
  logo: string
}

export interface MenuListItemProps {
  name: string
  icon?: string
  path?: string
  pathName?: string
  meta?: object
  children?: MenuListItemProps[]
}

export interface SidebarProps {
  logo: string
  menuList: MenuListItemProps[]
}
