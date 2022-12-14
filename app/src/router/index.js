import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import Layout from '@/views/Layout'
import Home from '@/views/Home'
import User from '@/views/User'
import Friends from '@/views/Friends'
import UserEditor from '@/views/User/UserEdit'
import UserStudy from '@/components/UserStudy'
import MyFavorite from '@/views/MyFavorite'
import Study from '@/views/Study'
import Search from '@/views/Search'
import SearchResult from '@/views/Search/SearchResult'
import ArticleDetail from '@/views/ArticleDetail'
import Chat from '@/views/Chat'

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
    children: [
      {
        path: 'home',
        component: Home,
      },
      {
        path: 'user',
        component: User,
      },
      {
        path: 'friends',
        component: Friends,
      },

    ]
  },
  {
    path: '/search',
    component: Search
  },
  {
    //搜索结果页
    path: '/search_result/:kw',//需要动态路由传参(路径穿参)
    component: SearchResult
  },
  {//文章详情页
    path: '/detail',
    component: ArticleDetail
  },
  //个人中心资料编辑
  {
    path: '/user_editor',
    component: UserEditor
  },
  //学习
  {
    path: '/user_study',
    component: UserStudy
  },
  {
    path: '/my_favorite',
    component: MyFavorite
  },
  //
  {
    path: '/study',
    component: Study,
  },
  //小思同学
  {
    path: '/chat',
    component: Chat
  }
]

const router = new VueRouter({
  routes
})

export default router
