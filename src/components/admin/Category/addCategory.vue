<template>
    <div>
        <el-card>
            <div slot="header" class="clearfix">
                <span>添加题目类型</span>
            </div>
            <el-form inline :label-position="labelPosition" label-width="80px" :model="CategoryForm">
                <el-form-item label="名称">
                    <el-input v-model="CategoryForm.category"></el-input>
                </el-form-item>
                  <el-form-item>
                <el-button @click="SubmitForm()">确认</el-button>
                  </el-form-item>
            </el-form>
        </el-card>
        <el-card v-loading="loading">
            <div slot="header" class="clearfix">
                <span>题目类型列表</span>
            </div>
            <el-table :data="tableData" border >
                    <el-table-column prop="category_id" label="类型编号" width="120">
                    </el-table-column>
                    <el-table-column prop="category_name" label="类型名称" >
                    </el-table-column>
                    <el-table-column prop="created_at" label="创建时间" >
                    </el-table-column>
                    <el-table-column prop="updated_at" label="上次更新时间" >
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
    </div>
</template>

<script>
import Category from '@/api/Category'
export default {
    data(){
        return {
            CategoryForm: {
                category: ''
            },
            tableData: [],
            labelPosition: 'right',
            loading: false,
        }
    },
    methods:{
        async SubmitForm(){
            try {
                let result = await Category.addCategory(this.CategoryForm.category)
                this.CategoryForm.category = null;
                this.tableData.push({"category_id":result.data.data.category_id,"category_name":result.data.data.category_name,"updated_at":result.data.data.updated_at,"created_at":result.data.data.created_at})
                this.$message.success('添加成功');
            } catch (error) {
                this.$handleError(error);
            }
        },
        async LoadCategoryList(){
            this.loading = true
            try {
                let result = await Category.CategoryList()
                this.tableData = result.data.data
                this.loading = false
            } catch (error) {
                this.$handleError(error)
            }
        },
        confirm(index,rows){
            this.$confirm(`确认删除 ${rows[index].category_name} ?`)
                    .then(_ => {
                        this.deleteRow(index, rows)
                    })
                    .catch(_ => {});
        },
        async deleteRow(index,rows){
            try {
                let result = await Category.delCategory(rows[index].category_id)
                rows.splice(index, 1);
                this.$message.success("删除成功")
            } catch (error) {
                this.$handleError(error)
            }
            
        }
    },
    mounted(){
        this.LoadCategoryList()
    }
}
</script>