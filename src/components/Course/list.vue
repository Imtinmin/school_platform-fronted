<template>
    <div>
        <el-container>
            <el-main>
                <el-card v-loading="loading">
                    <div slot="header" class="clearfix">
                        <span>课程学习</span>
                    </div>
                    <el-tabs v-if="result.length > 0" type="border-card">
                        <template v-for="(category,j) in result">
                            <el-tab-pane :key="j">
                                <template slot="label">
                                    {{ category.category_name }}
                                </template>
                                <el-col :span="6" v-for="(course,i) in category.course" :key="i" :offset="1">
                                    
                                    <router-link :to="baseRoute + course.course_id">
                                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                                            <el-image style="width: 320px; height: 200px" :src="course.image_url"
                                                fit="contain">
                                            </el-image>
                                            <div style="text-align:center;margin-top:10px">
                                                {{ course.course_name}}
                                                <div style="height:10px"></div>
                                            </div>
                                        </el-card>
                                    </router-link>
                                </el-col>
                            </el-tab-pane>
                        </template>
                    </el-tabs>
                    <el-tabs v-else>
                        <center>当前无课程</center>
                    </el-tabs>
                </el-card>
            </el-main>
        </el-container>
    </div>
</template>
<style>
    .content {
        font-size: 13px;
        color: #999;
    }

    .bottom {
        margin-top: 13px;
        line-height: 12px;
    }

    .button {
        padding: 0;
        float: right;
    }

    .image {
        width: 100%;
        display: block;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }
</style>

<script>
    import Course from '@/api/Course';
    export default {
        data() {
            return {
                currentDate: new Date(),
                radio: '1',
                result: [],
                baseRoute: '/course/',
                category: '',
                loading: false
            };
        },
        methods: {
            async LoadCourseList() {
                this.loading = true
                try {
                    let result = await Course.getCourseList();
                    this.result = result.data.data;
                    this.loading = false
                    //alert(JSON.stringify(this.CourseList))
                } catch (error) {
                    this.$handleError(error);
                    this.loading = false
                }
            },

        },
        mounted() {
            this.LoadCourseList();
        }
    }
</script>