export default {
    path: 'course',
    name: 'CourseLayout',
    component: resolve => require(['@/components/Course/layout.vue'], resolve),
    redirect: 'course/list',
    children:[
    {
        path: 'list',
        name: 'CourseList',
        component: resolve => require(['@/components/Course/list.vue'], resolve),
    },
    {
        path: ':id',
        name: 'CourseInfo',
        component: resolve => require(['@/components/Course/CourseInfo.vue'], resolve),
        redirect: ':id/Introduction',
        children:[
            {
                path: 'Introduction',
                name: 'Introduction',
                component: resolve => require(['@/components/Course/first.vue'], resolve),
            },
            {
                path: ':video',
                name: 'Video',
                
            },
        ]
    },


],
}
