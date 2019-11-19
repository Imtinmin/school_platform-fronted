import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index.vue'
import user from './modules/user'
import ctf from './modules/ctf'
import MultipleChoice from './modules/multiple-choice'
import course from './modules/course'
import admin from './modules/admin'
Vue.use(Router)

export default new Router({
  routes: [
      {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: function () { 
          return import(/* webpackChunkName: "about" */ '@/views/About.vue')
      },
    },
      {
      path: '/',
      name: 'index',
      component: index,
      children: [{
        path: '/',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: function () { 
          return import(/* webpackChunkName: "about" */ '@/components/home.vue')
        },
      },
      {
        path: '/Bulletin',
        name: 'Bulletin',
        component: resolve => require(['@/components/bulltin.vue'], resolve),
      },
      {
        path: '/rank',
        name: 'Rank',
        component: resolve => require(['@/components/rank.vue'], resolve),
      },
      ctf,
      course,
      user,
      MultipleChoice
    ]
    },
    admin,
    {
      path: '*',
      name: '404page',
      component: resolve => require(['@/components/404.vue'], resolve),
    },
  
    /*{
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: function () { 
        return import( webpackChunkName: "about"  '@/views/About.vue')
      }
    },*/

    

  ]
})
