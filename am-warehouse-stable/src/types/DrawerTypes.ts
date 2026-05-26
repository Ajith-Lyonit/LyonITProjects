import { ImageSourcePropType } from "react-native"

export interface DrawerTypes {
    id: number
    title: string
    image: ImageSourcePropType
}

export interface DrawerTypesTwo {
    id: number
    title: string
    action: string
    image: ImageSourcePropType
}

export const drawerMenus1: DrawerTypes[] = [
    {
        id: 1,
        title: 'Inventory Store',
        image: require("../../assets/menus/d1.png")
    },
    {
        id: 2,
        title: 'Production',
        image: require("../../assets/menus/d2.png")
    },
    {
        id: 3,
        title: 'Quality',
        image: require("../../assets/menus/d3.png")
    },
    {
        id: 4,
        title: 'Dispatch',
        image: require("../../assets/menus/d4.png")
    },
    {
        id: 5,
        title: 'Events',
        image: require("../../assets/menus/d5.png")
    },
    {
        id: 6,
        title: 'Tasks',
        image: require("../../assets/menus/d6.png")
    },
    {
        id: 7,
        title: 'Meetings',
        image: require("../../assets/menus/d7.png")
    }
]

export const drawerMenus2: DrawerTypesTwo[] = [
  {
    id: 1,
    title: "Change Password",
    image: require("../../assets/menus/d8.png"),
    action: "change_password",
  },
  {
    id: 2,
    title: "Settings",
    image: require("../../assets/menus/d9.png"),
    action: "settings",
  },
  {
    id: 3,
    title: "Contact Us",
    image: require("../../assets/menus/d10.png"),
    action: "contact",
  },
  {
    id: 4,
    title: "Help",
    image: require("../../assets/menus/d11.png"),
    action: "help",
  },
  {
    id: 5,
    title: "Logout",
    image: require("../../assets/menus/d12.png"),
    action: "logout",
  },
]