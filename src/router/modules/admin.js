export default {
    path: '/admin',
    component: resolve => require(['@/components/admin/layout.vue'], resolve),
    redirect: '/admin/index',
    children:[
    {
      path: 'ChallengeList',
      name: 'Challenge-List',
      component: resolve => require(['@/components/admin/Challenge/list.vue'], resolve),
    },
    {
        path: 'ChallengeAdd',
        name: 'Challenge-Add',
        component: resolve => require(['@/components/admin/Challenge/add.vue'], resolve),
    },
    {
        path: 'AddCategory',
        name: 'Category-List',
        component: resolve => require(['@/components/admin/Category/addCategory.vue'], resolve),
    },
    {
        path: 'Bulltin',
        name: 'BulltinManager',
        component: resolve => require(['@/components/admin/Bulltin.vue'], resolve),
    },
    {
        path: 'index',
        name: 'Admin-Index',
        component: resolve => require(['@/components/admin/index.vue'], resolve),
    },
    {
        path: 'UserList',
        name: 'User-List',
        component: resolve => require(['@/components/admin/User/list.vue'], resolve),
    },
    {
        path: 'CourseList', //课程列表
        name: 'Course-List',
        component: resolve => require(['@/components/admin/Course/CourseList.vue'], resolve),
    },
    {
        path: 'AddCourse', //添加课程
        name: 'Add-Course',
        component: resolve => require(['@/components/admin/Course/addcourse.vue'], resolve),
    },
    {
        path: 'AddCourseCategory', //添加课程
        name: 'Add-CourseCategory',
        component: resolve => require(['@/components/admin/Course/addCourseCategory.vue'], resolve),
    },
    {
        path: 'Exam',
        name: 'Exam-manager',
        component: resolve => require(['@/components/admin/Exam/index.vue'], resolve),
    },
    {
        path: 'Examlog',
        name: 'Exam-Log',
        component: resolve => require(['@/components/admin/Exam/log.vue'], resolve),
    }
]
}
