export default {
    path: 'ctf',
    component: resolve => require(['@/components/ctf/layout.vue'], resolve),
    redirect: '/ctf/list',
    children:[
    {
      path: 'list',
      name: 'ChallengeList',
      component: resolve => require(['@/components/ctf/list2.vue'], resolve),
      //component: resolve => require(['@/components/ctf/list1.vue'], resolve),
    },
]
}
