import Vue from 'vue'
import Router from 'vue-router'
// import Login from '../components/login/login.vue'
// @ -> src
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
import Users from '@/components/users/users.vue'
import Right from '@/components/rights/right.vue'
import Role from '@/components/rights/role.vue'
import {Message} from 'element-ui'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'home',
      path: '/',
      component: Home,
      children: [{
        name: 'users',
        path: 'users',
        component: Users
      },
      {
        name: 'right',
        path: 'rights',
        component: Right
      },
      {
        name: 'role',
        path: 'roles',
        component: Role
      }]
    }
  ]
})

// 在路由的配置生效之前 统一判断token
// 路由/导航 守卫
// to -> 要去的路由配置
// from -> 当前的路由配置
// -> /Login home->Login to 就是Login from
router.beforeEach((to, from, next) => {
  // to from next
  // console.log(to, from)
  // 如果要去的是登录 -> next()
  if (to.path === '/login') {
    next()
  } else {
    // 如果要去的不是登录
    // 判断token
    const token = localStorage.getItem('token')
    if (!token) {
      // 如果token没有 -> login
      // 提示
      Message.warning('请先登录')
      router.push({
        name: 'login'
      })
      return
    }
    // 如果有 -> next()
    next()
  }
})

export default router
