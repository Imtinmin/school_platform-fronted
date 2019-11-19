export default {
    path: 'multiple-choice',
    component: resolve => require(['@/components/multiple-choice/layout.vue'], resolve),
    redirect: '/multiple-choice/Home',
    children:[
    {
      path: 'View',
      name: 'QuestionView',
      component: resolve => require(['@/components/multiple-choice/preview.vue'], resolve),
      //component: resolve => require(['@/components/ctf/list1.vue'], resolve),
    },
    {
      path: 'Home',
      name: 'QuestionHome',
      component: resolve => require(['@/components/multiple-choice/Home.vue'], resolve),
      //component: resolve => require(['@/components/ctf/list1.vue'], resolve),
    },
]
}
