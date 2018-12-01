import Vue from 'vue'
import Router from 'vue-router'

import Movie from '../pages/movie/Root'
import Cinema from '../pages/cinema/Root'
import Mine from '../pages/mine/Root'

import Search from '../pages/common/Search'
import CityList from '../pages/common/CityList'

import Detail from '../pages/movie/Detail'
import Detail2 from '../pages/movie/Detail2'

import Detailcin from '../pages/cinema/Detail'

import Login from '../pages/user/Login'
import Register from '../pages/user/Register'


Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/movie',
      component: Movie,
      children: [
        {
          path: 'search',
          component: Search,
          props: {
            type: ['cinema', 'movie']
          }
        },
        {
          path: 'city',
          component: CityList,
        },
        {
          path:'detail/:id',
          component:Detail,
        },
        {
          path:'detail2/:id',
          component:Detail2
        }
      ]
    },
    {
      path: '/cinema',
      component: Cinema,
      children: [
        {
          path: 'search',
          component: Search,
          props: {
            type: ['cinema']
          }
        },
        {
          path: 'city',
          component: CityList,
        },
        {
          path:'detail/:id/:nm',
          component:Detailcin,
        }
      ]
    },
    {
      path: '/mine',
      component: Mine
    },
    {
      path: '/login',
      component:Login
    },
    {
      path: '/register',
      component:Register
    },
    {
      path: '**',
      redirect: '/movie'
    }
  ]
})

export default router;

router.beforeEach((to, from, next)=>{
  if(to.path == '/mine'){
    // 判断是否登录了
    let token = localStorage.getItem('token');
    if(token){
      next();
    }else{
      next('/login');
    }
  }
  else{
    next();
  }
  
})