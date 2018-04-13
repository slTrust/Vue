import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/Login'
import Index from '@/components/Index'
import NoAuth from '@/components/NoAuth'

// UserAdmin-->用户管理-路由
import UserAdmin from '@/components/UserAdmin'

//UserAdmin的子路由
import UserList from '@/components/UserAdmin/UserList'
import AddUser from '@/components/UserAdmin/AddUser'
import UserInfo from '@/components/UserAdmin/UserInfo'
import AddAccount from '@/components/UserAdmin/AddAccount'

// BaseStationAdmin--> 系统管理路由
import BaseStationAdmin from '@/components/BaseStationAdmin'

//BaseStationAdmin 的子路由
import BaseStationList from '@/components/BaseStationAdmin/BaseStationList'

// SystemAdmin--> 系统管理路由
import SystemAdmin from '@/components/SystemAdmin'

//SystemAdmin的子路由
import SystemList from '@/components/SystemAdmin/SystemList'
import AddSystemUser from '@/components/SystemAdmin/AddSystemUser'


// TestMenu--> 含子菜单的menu
import TestMenu from '@/components/TestMenu'

//TestMenu的子路由
import Aaa from '@/components/TestMenu/Aaa'
import Bbb from '@/components/TestMenu/Bbb'
import Ccc from '@/components/TestMenu/Ccc'

Vue.use(Router)
const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'IF_000000',
      component: Login
    },
    {
      path: '/index',
      name: 'IF_999999',
      component: Index,
      // redirect: "/index/userAdmin",
      children:[
        // 客户管理
        {
          path: "userAdmin",
          component: UserAdmin,
          name: "IF_010000",
          isMenu:true,
          expanding:false, //是否是可展开的列表
          meta: {
            title: "客户管理",
            icon: 'ios-people',
          },
          redirect: "userAdmin/userList",
          children: [
            {
              path: "userList",
              component: UserList,
              name: "IF_010001",
              meta: {
                title: "客户管理"
              }
            },
            {
              path: "addUser",
              component: AddUser,
              name: "IF_010002",
              meta: {
                title: "新增客户"   //这个是添加牧场信息
              }
            },
            {
              path: "userInfo",
              component: UserInfo,
              name: "IF_010003",
              meta: {
                title: "查看详情"
              }
            },
            {
              path: "editUser",
              component: AddUser,
              name: "IF_010004",
              meta: {
                title: "编辑牧场信息"
              }
            },
            {
              path: "addAccount",
              component: AddAccount,
              name: "IF_010005",
              meta: {
                title: "添加用户"  //这个是添加账号密码
              }
            }
          ]
         
        },
        // 客户管理 end

        // 基站管理
        {
         
          path: "baseStationAdmin",
          redirect: "baseStationAdmin/baseStationList",
          component: BaseStationAdmin,
          name: "IF_020000",
          isMenu:true,//是不是菜单
          expanding:false, //是否是可展开的列表
          meta: {
            title: "基站管理",
            icon: 'social-codepen',
          },
          children: [
            {
              path: "baseStationList",
              component: BaseStationList,
              name: "IF_020001",
              meta: {
                title: "基站管理"
              }
            }
          ]
         
        },
        //基站管理 end

        // 系统管理
        {
          
          path: "systemAdmin",
          redirect: "systemAdmin/systemList",
          component: SystemAdmin,
          name: "IF_030000",
          isMenu:true,//是不是菜单
          expanding:false, //是否是可展开的列表
          meta: {
            title: "系统管理",
            icon: 'gear-a',
          },
          children: [
            {
              path: "systemList",
              component: SystemList,
              name: "IF_030001",
              meta: {
                title: "系统管理"
              }
            },
            {
              path: "addSystemUser",
              component: AddSystemUser,
              name: "IF_030002",
              meta: {
                title: "添加系统管理"
              }
            },
            {
              path: "editSystemUser",
              component: AddSystemUser,
              name: "IF_030002",
              meta: {
                title: "修改系统用户信息"
              }
            }
          ]
        },
        //系统管理 end


         // TestMenu
        {
         
          path: "testMenu",
          component: TestMenu,
          name: "IF_040000",
          isMenu:true,//是不是菜单
          expanding:true, //是否是可展开的列表
          meta: {
            title: "测试菜单",
            icon: 'ios-paper',
          },
          children: [
            {
              path: "aaa",
              isMenu:true,
              component: Aaa,
              name: "IF_040001",
              meta: {
                title: "Aaa"
              }
            },
            {
              path: "bbb",
              isMenu:true,
              component: Bbb,
              name: "IF_040002",
              meta: {
                title: "Bbb"
              }
            },
            {
              path: "ccc",
              isMenu:true,
              component: Ccc,
              name: "IF_040003",
              meta: {
                title: "Ccc"
              }
            }
          ]
         
        },
        //TestMenu end

        // 无权限的页面
        {
          path: "noAuth",
          component: NoAuth,
          name: "IF_000001",
          meta: {
            title: "NoAuth"
          },
          isMenu:false,//是不是菜单
          expanding:false //是否是可展开的列表
        }
      ]
    }
  ]
})


export default router
