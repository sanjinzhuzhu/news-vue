import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import Layout from '@/views/Layout'
import Home from '@/views/Home'
import User from '@/views/User'
import Search from '@/views/Search'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/layout/home'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/layout',
    component: Layout,
    children:[
      {
        path: 'home',
        component: Home,
      },
      {
        path: 'user',
        component: User,
      },
    ]
  },
  {
    path: '/search',
    component: Search
  },
]

const router = new VueRouter({
  routes
})

export default router
