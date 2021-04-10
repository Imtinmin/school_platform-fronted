export default {
        path: '/user',
        component: resolve => require(['@/components/user/layout.vue'], resolve),
        children:[
          {
          path: 'login',
          name: 'UserLogin',
          component: resolve => require(['@/components/user/login.vue'], resolve),
        },
        {
            path: 'register',
            name: 'UserRegister',
            component: resolve => require(['@/components/user/register.vue'], resolve),
        },
        {
            path: 'profile',
            name: 'UserInfo',
            component: resolve => require(['@/components/user/profile.vue'], resolve),
      
        },
        {
          path: 'logout',
          name: 'UserLogout',
          component: resolve => require(['@/components/user/logout.vue'], resolve),
        },
        {
          path: 'repassword',
          name: 'UserRepasswd',
          component: resolve => require(['@/components/user/resetpasswd.vue'], resolve),
        },
        {
          path: 'ctf/:id',
          name: 'UserSelectInfo',
          component: resolve => require(['@/components/user/userctf.vue'], resolve),
        }
      ]
        
}
