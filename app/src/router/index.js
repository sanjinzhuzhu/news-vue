import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import Layout from '@/views/Layout'
import Home from '@/views/Home'
import User from '@/views/User'
import Search from '@/views/Search'
import SearchResult from '@/views/Search/SearchResult'
import ArticleDetail from '@/views/ArticleDetail'
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
  {
    //搜索结果页
    path:'/search_result/:kw',//需要动态路由传参
    component:SearchResult
  },
  {//文章详情页
    path:'/detail',
    component:ArticleDetail
  }
]

const router = new VueRouter({
  routes
})

export default router
