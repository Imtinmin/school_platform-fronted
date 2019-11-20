<template>
    <div>
        <el-card>
            <div slot="header" class="clearfix">
                <span>添加课程类型</span>
            </div>
            <el-form inline :label-position="labelPosition" label-width="120px" :model="CourseCategoryForm">
                <el-form-item label="课程类型名称">
                    <el-input v-model="CourseCategoryForm.category_name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="SubmitForm()">确认</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card v-loading="loading">
            <div slot="header" class="clearfix">
                <span>课程类型列表</span>
            </div>
            <el-table :data="tableData">
                <el-table-column prop="course_category_id" label="类型ID" width="120">
                </el-table-column>
                <el-table-column prop="category_name" label="类型名">
                </el-table-column>
                <el-table-column prop="created_at" label="创建时间">
                </el-table-column>
                <el-table-column prop="updated_at" label="更新时间">
                </el-table-column>
                    <el-table-column label="操作" width="100" fixed="right">
                        <!-- fixed="right" -->
                        <template slot-scope="scope">
                            <el-button @click="confirm(scope.$index, tableData)" type="text" size="small">删除
                            </el-button>
                            <el-button @click="edit(scope.$index, tableData)" type="text" size="small">编辑
                            </el-button>
                        </template>
                    </el-table-column>
            </el-table>
        </el-card>
        <el-dialog title="编辑课程类型" :visible.sync="UpdateCourseCategoryFormVisible" width="30%">
        <el-form :label-position="labelPosition" :model="UpdateCourseCategoryForm">
            <el-form-item label="题目名称" :label-width="formLabelWidth">
                <el-input v-model="UpdateCourseCategoryForm.category_name" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="UpdateCourseCategoryFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="updatechallenge(UpdateCourseCategoryForm.course_category_id,index)">确 定</el-button>
        </div>
    </el-dialog>
    </div>
</template>


<script>
    import CourseCategory from '@/api/CourseCategory'
    export default {
        data() {
            return {
                CourseCategoryForm: {
                    category_name: ''
                },
                tableData: [],
                loading: false,
                UpdateCourseCategoryFormVisible: false,
                UpdateCourseCategoryForm: {
                    category_name: '',
                    course_category_id: ''
                },
                formLabelWidth: '80px',
                labelPosition: 'right',
                index: '',
            }
        },
        methods: {
            async SubmitForm() {
                try {
                    let result = await CourseCategory.addCourseCategory(this.CourseCategoryForm.category_name);
                    this.CourseCategoryForm.category_name = null;
                    this.$message.success("添加成功");
                    this.tableData.push({'course_category_id': result.data.data.course_category_id,'category_name':result.data.data.category_name,'updated_at':result.data.data.updated_at,'created_at':result.data.data.created_at})
                } catch (error) {
                    this.$handleError(error)
                }
            },
            async LoadingCategoryList() {
                this.loading = true
                try {
                    let result = await CourseCategory.CategoryList();
                    this.tableData = result.data.data
                    this.loading = false;
                } catch (error) {
                    this.$handleError(error)
                }
            },
            async deleteRow(index,rows){
                try {
                    let result = await CourseCategory.delCourseCategory(rows[index].course_category_id)
                    rows.splice(index,1)
                    this.$message.success("删除成功")
                } catch (error) {
                    this.$handleError(error)
                }
            },
            confirm(index, rows) {
                this.$confirm(`确认删除 ${rows[index].category_name} ?`)
                    .then(_ => {
                        this.deleteRow(index, rows)
                    })
                    .catch(_ => {});
            },
            edit(scope,rows){
                this.UpdateCourseCategoryFormVisible = true
                this.UpdateCourseCategoryForm.category_name = rows[scope].category_name
                this.UpdateCourseCategoryForm.course_category_id = rows[scope].course_category_id
                this.index = scope
            },
            async updatechallenge(id,index){
                try {
                    let result = await CourseCategory.UpdateCourseCategory(id,this.UpdateCourseCategoryForm.category_name);
                    this.tableData[index].category_name = this.UpdateCourseCategoryForm.category_name
                    this.$message.success("修改成功")
                    this.UpdateCourseCategoryFormVisible = false
                } catch (error) {
                    this.$handleError(error)
                }
                this.UpdateCourseCategoryFormVisible = false
            }
        },
        mounted() {
            this.LoadingCategoryList()
        }
    }
</script>