<template>
    <div>
        <el-card v-loading="loading">
            <div slot="header" class="clearfix">
                <span>课程列表</span>
                <el-button type="primary" size="small" @click="reload()">刷新</el-button>
            </div>
            <el-alert title="课程删除可能会延迟一下，更新数据刷新一下页面" type="warning" effect="dark">
            </el-alert>
            <el-tabs v-if="result.length > 0" v-model="activeTab" @tab-click="handleClick">
                <template v-for="(category,i) in result">
                    <el-tab-pane :label="category.category_name" :name="category.category_name" :key="i">
                        <el-table stripe :data="category.course" style="width: 100%;margin-bottom: 20px;"
                            row-key="course_name">
                            <el-table-column type="expand">
                                <template slot-scope="scope">
                                    <el-table :data="scope.row.chapter" @selection-change="handleSelectionChange">
                                        <el-table-column type="expand">
                                            <template slot-scope="props">
                                                <el-table :data="props.row.video">
                                                    <el-table-column label="视频ID" prop="video_id" width="100">
                                                    </el-table-column>
                                                    <el-table-column label="视频链接" prop="url"></el-table-column>
                                                    <el-table-column label="视频说明" prop="content"></el-table-column>
                                                    <el-table-column label="序号" prop="order_num" width="100">
                                                    </el-table-column>
                                                    <el-table-column label="ppt链接" prop="ppt_url"></el-table-column>
                                                    <el-table-column label="添加时间" prop="created_at"></el-table-column>
                                                    <el-table-column prop="updated_at" label="最新操作时间"></el-table-column>
                                                    <el-table-column label="操作">
                                                        <template slot-scope="scope">
                                                            <el-button size="mini"
                                                                @click="EditVideo(scope.$index,scope.row)">编辑
                                                            </el-button>
                                                            <el-button size="mini" type="danger"
                                                                @click="DelVideo(scope.$index, scope.row)">
                                                                <!-- scope.chapter_id -->
                                                                删除</el-button>
                                                        </template>
                                                    </el-table-column>
                                                </el-table>
                                            </template>
                                        </el-table-column>
                                        <!--<el-table-column type="selection" width="55">
                                        </el-table-column>-->
                                        <el-table-column prop="chapter_id" label="章节ID" width="100">
                                        </el-table-column>
                                        <el-table-column prop="chapter_name" label="章节名" width="180">
                                        </el-table-column>
                                        <el-table-column prop="order_num" label="序号" width="100">
                                        </el-table-column>
                                        <el-table-column prop="created_at" label="创建时间">
                                        </el-table-column>
                                        <el-table-column prop="updated_at" label="最新操作时间">
                                        </el-table-column>
                                        <el-table-column label="操作">
                                            <template slot-scope="scope">
                                                <el-button size="mini" @click="EditChapter(scope.$index,scope.row)">编辑
                                                </el-button>
                                                <el-button size="mini" type="danger"
                                                    @click="DelChapter(scope.$index, scope.row)">
                                                    <!-- scope.chapter_id -->
                                                    删除</el-button>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </template>
                            </el-table-column>
                            <el-table-column prop="course_id" label="课程ID" width="100">
                            </el-table-column>
                            <el-table-column prop="course_name" label="课程名" width="180">
                            </el-table-column>
                            <el-table-column prop="image_url" label="展示图片url">
                            </el-table-column>
                            <el-table-column prop="Introduction" label="介绍">
                            </el-table-column>
                            <el-table-column prop="created_at" label="创建时间">
                            </el-table-column>
                            <el-table-column prop="updated_at" label="修改时间">
                            </el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button size="mini" @click="EditCourse(scope.$index, result[i].course)">编辑
                                    </el-button>
                                    <el-button size="mini" type="danger"
                                        @click="DelCourse(scope.$index, result[i].course)">
                                        删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                </template>
            </el-tabs>
            <el-tabs v-else>
                <center>当前无课程</center>
            </el-tabs>
        </el-card>
        <el-dialog title="编辑课程" width="40%" :visible.sync="dialogCourseFormVisible">
            <el-form :label-position="labelPosition" :model="CourseForm">
                <el-form-item label="课程名称" :label-width="formLabelWidth">
                    <el-input v-model="CourseForm.course_name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="图片url" :label-width="formLabelWidth">
                    <el-input v-model="CourseForm.url" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="课程类型" :label-width="formLabelWidth">
                    <el-select v-model="CourseForm.category_id" placeholder="请选择">
                        <el-option v-for="item in result" :key="item.category_id" :label="item.category_name"
                            :value="item.course_category_id">
                            <span style="float: left">{{ item.category_name }}</span>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="介绍" :label-width="formLabelWidth">
                    <el-input type="textarea" v-model="CourseForm.Introduction" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogCourseFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="UpdateCourse(CourseForm.course_id)">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="编辑章节" width="30%" :visible.sync="dialogChapterFormVisible">
            <el-form :label-position="labelPosition" :model="ChapterForm">
                <el-form-item label="章节名称" :label-width="formLabelWidth">
                    <el-input v-model="ChapterForm.chapter_name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="序号" :label-width="formLabelWidth">
                    <el-select v-model="ChapterForm.order_num" placeholder="请选择">
                        <el-option v-for="i in 6" :key="i" :label="i" :value="i">

                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogChapterFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="UpdateChapter(ChapterForm.chapter_id)">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="编辑小节" width="30%" :visible.sync="dialogVideoFormVisible">
            <el-form :label-position="labelPosition" :model="ChapterForm">
                <el-form-item label="小节名称" :label-width="formLabelWidth">
                    <el-input v-model="VideoForm.title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="序号" :label-width="formLabelWidth">
                    <el-select v-model="VideoForm.order_num" placeholder="请选择">
                        <el-option v-for="i in 6" :key="i" :label="i" :value="i">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="视频链接" :label-width="formLabelWidth">
                    <el-input v-model="VideoForm.url" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="PPT链接" :label-width="formLabelWidth">
                    <el-input v-model="VideoForm.ppt_url" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="视频介绍" :label-width="formLabelWidth">
                    <el-input v-model="VideoForm.content" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogChapterFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="UpdateVideo(VideoForm.video_id)">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import Course from '@/api/Course';
    import Chapter from '@/api/Chapter'
    import Video from '@/api/Video'
    export default {
        data() {
            return {
                loading: false,
                activeTab: '',
                result: [],
                chapter: [],
                CourseForm: {
                    course_name: '',
                    Introduction: '',
                    url: '',
                    category_id: '',
                    course_id: '',
                },
                ChapterForm: {
                    chapter_id: '',
                    chapter_name: '',
                    order_num: ''
                },
                VideoForm: {
                    video_id: '',
                    title: '',
                    content: '',
                    order_num: '',
                    url: '',
                    ppt_url: '',
                },
                dialogCourseFormVisible: false,
                dialogChapterFormVisible: false,
                dialogVideoFormVisible: false,
                formLabelWidth: '80px',
                labelPosition: 'right',
                multipleSelection: []
            }
        },
        methods: {
            async LoadCourseList() {
                this.loading = true
                try {
                    let result = await Course.AdminCourseList();
                    if(result.data.data.length > 0){
                        this.result = result.data.data;
                        this.chapter = result.data.data[0].course[0].chapter
                        //alert(JSON.stringify(this.result))
                        this.activeTab = this.result[0].category_name;
                        this.loading = false
                    }else{
                        this.loading = false
                    }
                } catch (error) {
                    this.$handleError(error);
                }
            },
            reload() {
                this.$router.go(0)
            },
            handleClick(tab, event) {
                console.log(tab, event);
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            /*
             * 提交修改
             */
            async UpdateCourse(id, rows) {
                try {
                    //alert(this.CourseForm.category_id)
                    let result = await Course.UpdateCourse(id, this.CourseForm.course_name, this.CourseForm
                        .category_id, this.CourseForm.url, this.CourseForm.Introduction)
                    this.$message.success("更改成功");
                    this.dialogCourseFormVisible = false;
                    //location.reload()
                } catch (error) {
                    this.$handleError(error)
                }
            },
            /*
             * 编辑课程
             */
            EditCourse(index, rows) {
                rows = rows[index]
                this.dialogCourseFormVisible = true;
                this.CourseForm.course_id = rows.course_id;
                this.CourseForm.url = rows.image_url;
                this.CourseForm.course_name = rows.course_name;
                this.CourseForm.Introduction = rows.Introduction;
                this.CourseForm.category_id = rows.course_category_id;
            },
            /*
             * 删除课程
             */
            async DelCourse(index, rows) {
                //console.log(JSON.stringify(rows))
                let course_id = rows[index].course_id;
                try {
                    let result = await Course.DeleteCourse(course_id)
                    this.$message.success("删除成功")
                    rows.splice(index, 1)
                } catch (error) {
                    this.$$handleError(error)
                }
            },
            /*
             * 编辑章节
             */
            EditChapter(index, rows) {
                this.dialogChapterFormVisible = true;
                this.ChapterForm.chapter_name = rows.chapter_name;
                this.ChapterForm.order_num = rows.order_num;
                this.ChapterForm.chapter_id = rows.chapter_id
            },
            /*
             * 提交修改
             */
            async UpdateChapter() {
                try {
                    let result = await Chapter.UpdateChapter(this.ChapterForm.chapter_id, this.ChapterForm
                        .chapter_name, this.ChapterForm.order_num)
                    this.$message.success("修改成功");
                    this.LoadCourseList();
                    this.dialogChapterFormVisible = false;
                } catch (error) {
                    this.$handleError(error)
                }
            },
            /*
             * 删除章节
             */
            async DelChapter(index, rows) {
                let chapter_id = rows.chapter_id;
                try {
                    let result = await Chapter.DelChapter(chapter_id)
                    this.LoadCourseList();  //更新表里数据
                    this.$message.success("删除成功");
                } catch (error) {
                    this.$handleError(error)
                }
            },
            EditVideo(index, row) {
                //alert(row.content)
                this.dialogVideoFormVisible = true;
                this.VideoForm.video_id = row.video_id;
                this.VideoForm.title = row.title;
                this.VideoForm.content = row.content;
                this.VideoForm.order_num = row.order_num;
                this.VideoForm.url = row.url;
                this.VideoForm.ppt_url = row.ppt_url;
            },
            async UpdateVideo(id) {
                try {
                    let result = await Video.EditVideo(id, this.VideoForm.title, this.VideoForm.content, this
                        .VideoForm.url, this.VideoForm.order_num, this.VideoForm.ppt_url)
                    this.LoadCourseList(); 
                    this.$message.success("编辑成功");
                    this.dialogVideoFormVisible = false;

                } catch (error) {
                    this.$handleError(error)
                }
            },
            /*
             * 删除视频
             */
            async DelVideo(index, rows) {
                let video_id = rows.video_id;
                try {
                    let result = await Video.DeleteVideo(video_id);
                    this.LoadCourseList(); 
                    this.$message.success("删除成功");
                } catch (error) {
                    this.$handleError(error)
                }
            }
        },
        mounted() {
            this.LoadCourseList();
        }
    }
</script>