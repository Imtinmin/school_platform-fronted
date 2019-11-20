<template>
    <div>
        <el-container>
            <el-aside width="250px">
                <el-row class="tac">
                    <router-link to="/">返回前台</router-link>
                    <h5>菜单</h5>
                    <el-menu default-active="/admin/UserList" class="el-menu-vertical-demo" router @open="handleOpen"
                        @close="handleClose">
                        <el-submenu :collapse="false" index="1">
                            <template slot="title">
                                <i class="el-icon-user"></i>
                                用户管理</template>
                            <el-menu-item index="/admin/UserList">用户列表</el-menu-item>
                        </el-submenu>
                        <el-submenu :collapse="false" index="2">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>题目管理</span>
                            </template>
                            <el-menu-item-group>
                                <template slot="title">题目</template>
                                <el-menu-item index="/admin/ChallengeList">题目列表</el-menu-item>
                                <el-menu-item index="/admin/ChallengeAdd">添加题目</el-menu-item>
                            </el-menu-item-group>
                            <el-menu-item-group title="题目类型">
                                <el-menu-item index="/admin/AddCategory">添加题目类型</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-menu-item index="/admin/Bulltin">
                            <i class="el-icon-menu"></i>
                            <span slot="title">公告管理</span>
                        </el-menu-item>
                        <el-submenu :collapse="false" index="4">
                            <template slot="title">
                                <i class="el-icon-setting"></i>
                                <span slot="title">课程管理</span>
                            </template>
                            <el-menu-item-group>
                                <template slot="title">课程</template>
                                <el-menu-item index="/admin/CourseList">课程列表</el-menu-item>
                                <el-menu-item index="/admin/AddCourse">添加课程、章节、小节</el-menu-item>
                            </el-menu-item-group>
                            <el-menu-item-group title="课程类型">
                                <el-menu-item index="/admin/AddCourseCategory">添加课程类型</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-submenu :collapse="false" index="5">
                            <template slot="title">
                                <i class="el-icon-postcard"></i>
                                <span slot="title">测验管理</span>
                            </template>
                            <el-menu-item index="/admin/Exam">测验列表</el-menu-item>
                            <el-menu-item index="/admin/Examlog">测验记录</el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-row>
            </el-aside>
            <el-main style="background-color: #E9EEF3;">
                <router-view></router-view>
            </el-main>
        </el-container>

    </div>
</template>


<script>
    import User from '@/api/User'
    export default {
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        },
        async mounted() {
            try {
                let result = await User.getUserInfo();
                if (result.data.code === 200) {
                    if (!result.data.data.admin) {
                        this.$handleError({
                            'redirect': 'UserInfo',
                            'message': 'Promission denied'
                        });
                    }
                }
            } catch (e) {
                this.$handleError(e)
            }
        }
    }
</script>


<style>
    .el-header,
    .el-footer {
        color: #333;
        line-height: 80px;
    }

    .el-aside {
        color: #333;
        margin-left: 2%;
    }


    body>.el-container {
        margin-bottom: 1px;

    }
</style>