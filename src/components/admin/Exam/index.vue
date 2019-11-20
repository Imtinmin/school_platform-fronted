<template>
    <div>

        <el-card v-loading="loading">
            <div slot="header" class="clearfix">
                <span>测验列表</span>
                <el-button type="primary" size="small" @click="reload()">刷新</el-button>
            </div>
            <el-table :data="tableData" border>
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-table :data="props.row.choice_question">
                            <el-table-column label="题目" prop="title" width="120"></el-table-column>
                            <el-table-column label="选项1" prop="option1"></el-table-column>
                            <el-table-column label="选项2" prop="option2"></el-table-column>
                            <el-table-column label="选项3" prop="option3"></el-table-column>
                            <el-table-column label="选项4" prop="option4"></el-table-column>
                            <el-table-column label="答案" prop="answer"></el-table-column>
                            <el-table-column label="是否为多选" prop="is_multiple"></el-table-column>
                            <el-table-column label="操作" width="100" fixed="right">
                                <template slot-scope="scope">
                                    <el-button @click="confirmDelchall(scope.$index, props.row.choice_question)" type="text" size="small">删除
                                    </el-button>
                                    <el-button @click="editchall(scope.$index, props.row.choice_question)" type="text" size="small">编辑
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </el-table-column>
                <el-table-column width="80" label="测验ID" prop="exam_id"></el-table-column>
                <el-table-column width="150" label="测验名" prop="exam_name"></el-table-column>
                <el-table-column width="80" label="分数" prop="score"></el-table-column>
                <el-table-column width="80" label="章节ID" prop="chapter_id"></el-table-column>
                <el-table-column width="80" label="课程ID" prop="course_id"></el-table-column>
                <el-table-column label="创建时间" prop="created_at"></el-table-column>
                <el-table-column label="更新时间" prop="updated_at"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="EditExam(scope.$index, tableData)">编辑
                        </el-button>
                        <el-button size="mini" type="danger" @click="confirmDelExam(scope.$index, tableData)">
                            删除</el-button>
                        <el-button size="mini" type="primary" icon="el-icon-circle-plus"
                            @click="PreAddchall(scope.$index, tableData)">添加题目</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-card v-loading="loading2">
            <div slot="header" class="clearfix">
                <span>添加测验</span>
            </div>
            <el-form :label-position="labelPosition" label-width="80px" :model="AdddExamForm">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="测验名">
                            <el-input v-model="AdddExamForm.examName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="每题分数">
                            <el-input v-model="AdddExamForm.score"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="4">
                        <el-form-item label="属于章节">
                            <el-cascader v-model="AdddExamForm.chapter_id" :options="parsedChapter"
                                :show-all-levels="false" clearable placeholder="请选择属于章节"></el-cascader>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3">
                        <el-form-item>
                            <el-tag type="danger">OR</el-tag>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="属于课程">
                            <el-select v-model="AdddExamForm.course_id" clearable placeholder="请选择属于课程">
                                <el-option v-for="item in course" :key="item.course_id" :label="item.course_name"
                                    :value="item.course_id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-form-item>
                    <el-button type="primary" @click="AddExam()">确认添加</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-dialog title="编辑题目" width="40%" :visible.sync="dialogUpdateChallFromVisible">
            <el-form :model="updatechallenge">
                    <el-row>
                        <el-col :span="18">
                            <el-form-item label="题目" label-width="60px">
                                <el-input v-model="updatechallenge.title"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <div style="height:10px"></div>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="选项一" :label-width="minformLabelWidth">
                                <el-input v-model="updatechallenge.option1"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="选项二" :label-width="minformLabelWidth">
                                <el-input v-model="updatechallenge.option2"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="选项三" :label-width="minformLabelWidth">
                                <el-input v-model="updatechallenge.option3"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="选项四" :label-width="minformLabelWidth">
                                <el-input v-model="updatechallenge.option4"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <div style="height:10px"></div>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="答案" :label-width="minformLabelWidth">
                                <el-input v-model="updatechallenge.answer"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogUpdateChallFromVisible = false">取 消</el-button>
                <el-button type="primary" @click="UpdateExamChall()">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="编辑测验" width="30%" :visible.sync="dialogUpdateExamFromVisible">
            <el-form :label-position="labelPosition" :model="UpdateExamFrom">
                <el-form-item label="测验名" :label-width="formLabelWidth">
                    <el-input v-model="UpdateExamFrom.examName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="每题分数" :label-width="formLabelWidth">
                    <el-input v-model="UpdateExamFrom.score"></el-input>
                </el-form-item>
                <el-form-item label="属于章节" :label-width="formLabelWidth">
                    <el-cascader v-model="UpdateExamFrom.chapter_id" :options="parsedChapter" :show-all-levels="false"
                        clearable placeholder="请选择属于章节"></el-cascader>
                </el-form-item>
                <el-form-item label="或者" :label-width="formLabelWidth">
                </el-form-item>
                <el-form-item label="属于课程" :label-width="formLabelWidth">
                    <el-select v-model="UpdateExamFrom.course_id" clearable placeholder="请选择属于章节">
                        <el-option v-for="item in course" :key="item.course_id" :label="item.course_name"
                            :value="item.course_id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogUpdateExamFromVisible = false">取 消</el-button>
                <el-button type="primary" @click="UpdateExam()">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="添加题目" width="40%" :visible.sync="dialogAddchoiceQuestionFromVisible">
            <el-form :label-position="labelPosition" :model="UpdateExamFrom">
                <el-form-item label="测验名" :label-width="formLabelWidth">
                    <el-select v-model="AddchoiceQuestionFrom.exam_id" clearable placeholder="属于测验">
                        <el-option v-for="item in tableData" :key="item.exam_id" :label="item.exam_name"
                            :value="item.exam_id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-divider></el-divider>
                <el-form-item v-for="(challenge, index) in AddchoiceQuestionFrom.challenge" :label="challenge[index]"
                    :key="challenge.key">
                    <el-row>
                        <el-col :span="18">
                            <el-form-item label="题目" label-width="60px">
                                <el-input v-model="challenge.title"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <div style="height:10px"></div>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="选项一" :label-width="minformLabelWidth">
                                <el-input v-model="challenge.option1"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="选项二" :label-width="minformLabelWidth">
                                <el-input v-model="challenge.option2"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="选项三" :label-width="minformLabelWidth">
                                <el-input v-model="challenge.option3"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="选项四" :label-width="minformLabelWidth">
                                <el-input v-model="challenge.option4"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <div style="height:10px"></div>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="答案" :label-width="minformLabelWidth">
                                <el-input v-model="challenge.answer"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <div style="height:20px"></div>
                    <el-form-item label-width="60px">
                        <el-button type="danger" @click="delChoicequestionitem(challenge)">删除</el-button>
                    </el-form-item>
                    <el-divider></el-divider>
                </el-form-item>
                <el-form-item label-width="60px">
                    <el-button @click="addChoicequestionitem">增加题目</el-button>
                    <el-button type="primary" @click="addChoicequestion">确认添加</el-button>
                </el-form-item>
                <div style="height:30px"></div>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import Exam from '@/api/Exam'
    import Course from '@/api/Course'
    import Chapter from '@/api/Chapter'
    import SelectChallenge from '@/api/SelectChallenge'
    export default {
        data() {
            return {
                activeNames: ['1'],
                AdddExamForm: {
                    'examName': '',
                    'score': '',
                    'chapter_id': '',
                    'course_id': '',
                },
                UpdateExamFrom: {
                    'examName': '',
                    'score': '',
                    'chapter_id': '',
                    'course_id': '',
                },
                AddchoiceQuestionFrom: {
                    exam_id: '',
                    challenge: [{
                        title: '',
                        option1: '',
                        option2: '',
                        option3: '',
                        option4: '',
                        answer: ''
                    }]
                },
                updatechallenge: {
                    title: '',
                    option1: '',
                    option2: '',
                    option3: '',
                    option4: '',
                    answer: ''
                },
                tableData: [],
                loading: false,
                loading2: false,
                chapter: [],
                course: [],
                formLabelWidth: '80px',
                minformLabelWidth: '60px',
                labelPosition: 'right',
                dialogUpdateExamFromVisible: false,
                dialogAddchoiceQuestionFromVisible: false,
                dialogUpdateChallFromVisible: false,
                options: [{
                    value: 'zhinan',
                    label: '指南',
                    children: [{
                        value: '123',
                        label: '123'
                    }]
                }]

            }
        },
        methods: {
            async LoadCourseList() {
                this.loading2 = true
                try {
                    let result = await Course.AdminCourseList();
                    this.result = result.data.data;
                    for (let index = 0; index < this.result.length; index++) {
                        this.course = this.course.concat(this.result[index].course)
                    }
                    for (let j = 0; j < this.course.length; j++) {
                        this.chapter = this.chapter.concat(this.course[j].chapter)
                    }
                    this.loading2 = false
                } catch (error) {
                    this.$handleError(error);
                }
            },
            async DelExam(index, rows) {
                try {
                    let result = await Exam.DelExam(this.tableData[index].exam_id)
                    this.$message.success("删除成功")
                    rows.splice(index, 1)
                } catch (error) {
                    this.$handleError(error)
                }
            },
            confirmDelExam(index,rows){
                this.$confirm(`确认删除 ${rows[index].exam_name} ?`)
                    .then(_ => {
                        this.DelExam(index, rows)
                    })
                    .catch(_ => {});
            },
            confirmDelchall(index,rows){
                this.$confirm(`确认删除 ${rows[index].title} ?`)
                    .then(_ => {
                        this.DelExamchall(rows[index].id)
                    })
                    .catch(_ => {});
            },
            async DelExamchall(id){
                try {
                    let result = await SelectChallenge.delChoiceQuestionToExam(id)
                    this.$message.success("删除成功")
                    this.ExamList();
                } catch (error) {
                    this.$handleError(error)
                }
            },
            async AddExam() {
                if (this.AdddExamForm.chapter_id && this.AdddExamForm.course_id) {
                    alert("属于课程或者属于章节二选一")
                    return false
                }
                try {
                    let result = await Exam.AddExam(this.AdddExamForm.examName, this.AdddExamForm.score, this
                        .AdddExamForm.chapter_id[1], this.AdddExamForm.course_id)
                    let res = result.data.data
                    this.AdddExamForm.examName = null;
                    this.AdddExamForm.score = null;
                    this.AdddExamForm.chapter_id = null;
                    this.AdddExamForm.course_id = null;
                    this.tableData.push({
                        "exam_name": res.exam_name,
                        "score": res.score,
                        "chapter_id": res.chapter_id,
                        "course_id": res.course_id,
                        "updated_at": res.updated_at,
                        "created_at": res.created_at
                    })
                    this.$message.success("添加成功");
                } catch (error) {
                    this.$handleError(error)
                }
            },
            async UpdateExam() {
                try {
                    let result = await Exam.UpdateExam(this.UpdateExamFrom.exam_id, this.UpdateExamFrom.examName,
                        this.UpdateExamFrom.score, this.UpdateExamFrom.chapter_id[1], this.UpdateExamFrom
                        .course_id)
                    this.dialogUpdateExamFromVisible = false
                    this.$message.success("更新成功")
                } catch (error) {
                    this.$handleError(error)
                }
            },
            async EditExam(scope, rows) {
                this.dialogUpdateExamFromVisible = true;
                this.UpdateExamFrom.examName = rows[scope].exam_name;
                this.UpdateExamFrom.score = rows[scope].score;
                this.UpdateExamFrom.chapter_id = rows[scope].chapter_id;
                this.UpdateExamFrom.course_id = rows[scope].course_id;
                this.UpdateExamFrom.exam_id = rows[scope].exam_id;
            },
            async ExamList() {
                this.loading = true;
                try {
                    let result = await Exam.ExamList();
                    this.tableData = result.data.data;
                    this.loading = false;
                } catch (error) {
                    this.$handleError(error)
                }
            },
            addChoicequestionitem() {
                this.AddchoiceQuestionFrom.challenge.push({
                    title: '',
                    option1: '',
                    option2: '',
                    option3: '',
                    option4: '',
                    answer: ''
                })
            },
            delChoicequestionitem(item) {
                var index = this.AddchoiceQuestionFrom.challenge.indexOf(item)
                if (index !== -1) {
                    this.AddchoiceQuestionFrom.challenge.splice(index, 1)
                }
            },
            async addChoicequestion() {
                try {
                    let result = await SelectChallenge.addChoiceQuestionToExam(this.AddchoiceQuestionFrom.exam_id,
                        this.AddchoiceQuestionFrom.challenge)
                    this.dialogAddchoiceQuestionFromVisible = false
                    this.$message.success(result.data.msg)
                } catch (error) {
                    this.$handleError(error)
                }
            },
            reload() {
                location.reload()
            },
            //打开对话框
            PreAddchall(scope, rows) {
                this.dialogAddchoiceQuestionFromVisible = true;
                this.AddchoiceQuestionFrom.exam_id = rows[scope].exam_id;
            },
            editchall(index,rows){
                //alert(JSON.stringify(rows[index]))
                this.dialogUpdateChallFromVisible = true;
                this.updatechallenge.id = rows[index].id;
                this.updatechallenge.title = rows[index].title;
                this.updatechallenge.option1 = rows[index].option1;
                this.updatechallenge.option2 = rows[index].option2;
                this.updatechallenge.option3 = rows[index].option3;
                this.updatechallenge.option4 = rows[index].option4;
                this.updatechallenge.answer = rows[index].answer;
            },
            async UpdateExamChall(){
                try {
                    let result = await SelectChallenge.updateChoiceQuestion(this.updatechallenge.id,this.updatechallenge.title,this.updatechallenge.option1,this.updatechallenge.option2,this.updatechallenge.option3,this.updatechallenge.option4,this.updatechallenge.answer)
                    this.ExamList();
                    this.$message.success("更新成功")
                    this.dialogUpdateChallFromVisible = false
                } catch (error) {
                    this.$handleError(error)
                }
            }
        },
        mounted() {
            this.ExamList()
            this.LoadCourseList()
        },
        computed: {
            parsedChapter() {
                let parsedChapters = [];
                for (let course of this.course) {
                    let parsedChapter = {
                        label: course.course_name,
                        value: course.course_id,
                        children: []
                    };
                    if (course.chapter.length === 0) {
                        parsedChapter.disabled = true;
                    } else {
                        for (let chapter of course.chapter) {
                            parsedChapter.children.push({
                                value: chapter.chapter_id,
                                label: chapter.chapter_name,
                            });
                        }
                    }
                    parsedChapters.push(parsedChapter)
                }
                return parsedChapters
            }
        }
    }
</script>