<template>
    <div>
        <el-card>
            <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item title="添加课程" name="1">
                    <el-card>
                        <el-form :label-position="labelPosition" label-width="80px" :model="CourseFrom">
                            <el-form-item label="课程名">
                                <el-input v-model="CourseFrom.course_name"></el-input>
                            </el-form-item>
                            <el-form-item label="课程类型">
                                <el-select :loading="loading" v-model="CourseFrom.category_id" placeholder="请选择">
                                    <el-option v-for="item in result" :key="item.course_category_id"
                                        :label="item.category_name" :value="item.course_category_id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="展示图片">
                                <el-input v-model="CourseFrom.image_url">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="课程介绍">
                                <el-input type="textarea" v-model="CourseFrom.Introduction"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitForm()">确认添加</el-button>
                            </el-form-item>
                        </el-form>
                    </el-card>
                </el-collapse-item>
                <el-collapse-item title="添加章节" name="2">
                    <el-card>
                        <el-form :label-position="labelPosition" label-width="80px" :model="ChapterForm">
                            <el-form-item label="章节名">
                                <el-input v-model="ChapterForm.chapter_name"></el-input>
                            </el-form-item>
                            <el-row>
                                <el-col :span="4">
                                    <el-form-item label="属于课程">
                                        <el-select :loading="loading" v-model="ChapterForm.course_id"
                                            placeholder="请选择属于课程">
                                            <el-option v-for="item in course" :key="item.course_id"
                                                :label="item.course_name" :value="item.course_id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="4">
                                    <el-form-item label="序号">
                                        <el-select v-model="ChapterForm.order_num" placeholder="请选择序号">
                                            <el-option v-for="i in 6" :key="i" :label="i" :value="i"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-form-item>
                                <el-button type="primary" @click="submitChapterForm()">确认添加</el-button>
                            </el-form-item>
                        </el-form>
                    </el-card>
                </el-collapse-item>
                <el-collapse-item title="添加小节" name="3">
                    <el-card>
                        <el-form :label-position="labelPosition" label-width="80px" :model="VideoForm">
                            <el-form-item label=""></el-form-item>
                            <el-form-item label="小节名">
                                <el-input v-model="VideoForm.title"></el-input>
                            </el-form-item>
                            <el-form-item label="视频介绍">
                                <el-input type="textarea" v-model="VideoForm.content"></el-input>
                            </el-form-item>
                            <el-form-item label="视频链接">
                                <el-input v-model="VideoForm.url"></el-input>
                            </el-form-item>
                            <el-form-item label="PPT链接">
                                <el-input v-model="VideoForm.ppt_url"></el-input>
                            </el-form-item>
                            <el-form-item label="序号">
                                <el-select v-model="VideoForm.order_num" placeholder="请选择序号">
                                    <el-option v-for="i in 6" :key="i" :label="i" :value="i"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="属于章节">
                                <el-select :loading="loading" v-model="VideoForm.chapter_id" placeholder="请选择属于课程">
                                    <el-option v-for="item in chapter" :key="item.chapter_id"
                                        :label="item.chapter_name" :value="item.chapter_id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitVideoForm()">确认添加</el-button>
                            </el-form-item>
                        </el-form>
                    </el-card>
                </el-collapse-item>
            </el-collapse>
        </el-card>
    </div>
</template>

<script>
    import Course from '@/api/Course'
    import Chapter from '@/api/Chapter'
    import Video from '@/api/Video'
    export default {
        data() {
            return {
                CourseFrom: {
                    course_name: '',
                    image_url: '',
                    Introduction: '',
                    category_id: ''
                },
                ChapterForm: {
                    chapter_name: '',
                    course_id: '',
                    order_num: '',
                },
                VideoForm: {
                    title: '',
                    url: '',
                    content: '',
                    chapter_id: '',
                    ppt_url: '',
                    /*
                     video_id | title  | chapter_id | course_id | url | content | order_num | ppt_url 
                    */
                },
                result: '',
                loading: false,
                loading1: false,
                activeNames: ['1'],
                course: [],
                chapter: [],
                labelPosition: 'right',
                chapter: [],
                children: 'chapter',
                value: 'chapter_id',
                label: 'chapter_name',
            }
        },
        methods: {
            async LoadCourseList() {
                this.loading = true
                try {
                    let result = await Course.AdminCourseList();
                    this.result = result.data.data;
                    for (let index = 0; index < this.result.length; index++) {
                        //this.course.concat(this.result[index].course)
                        this.course = this.course.concat(this.result[index].course)
                    }
                    for (let j = 0; j < this.course.length; j++) {
                        this.chapter = this.chapter.concat(this.course[j].chapter)
                    }
                    //console.log(this.course)
                    this.loading = false
                } catch (error) {
                    this.$handleError(error);
                }
            },
            async submitCourseForm() {
                try {
                    let result = await Course.AddCouse(this.CourseFrom.course_name, this.CourseFrom.image_url, this
                        .CourseFrom.category_id, this.CourseFrom.Introduction)
                    this.$message.success("添加成功")
                    this.CourseFrom.course_name = null;
                    this.CourseFrom.image_url = null;
                    this.CourseFrom.category_id = null;
                    this.CourseFrom.Introduction = null;
                } catch (error) {
                    this.$handleError(error)
                }
            },
            async submitChapterForm() {
                try {
                    let result = await Chapter.addChapter(this.ChapterForm.chapter_name, this.ChapterForm.course_id,
                        this.ChapterForm.order_num)
                    this.$message.success("添加章节成功")
                    this.ChapterForm.course_id = null;
                    this.ChapterForm.order_num = null;
                    this.ChapterForm.chapter_name = null;
                } catch (error) {
                    this.$handleError(error)
                }
            },
            async submitVideoForm(){
                try {
                    let result = await Video.AddVideo(this.VideoForm.title,this.VideoForm.content,this.VideoForm.chapter_id,this.VideoForm.order_num,this.VideoForm.url,this.VideoForm.ppt_url)
                    this.$message.success("添加小节成功");
                    this.VideoForm.chapter_id = null;
                    this.VideoForm.content = null;
                    this.VideoForm.title = null;
                    this.VideoForm.url = null;
                    this.VideoForm.ppt_url = null;
                } catch (error) {
                    this.$handleError(error)
                }
            },
            handleChange(val) {
                console.log(val);
            }
        },
        mounted() {
            this.LoadCourseList()
        }
    }
</script>