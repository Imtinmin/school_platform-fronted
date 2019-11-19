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
    </div>
</template>

<script>
import Category from '@/api/Category'
export default {
    data(){
        return {
            CategoryForm: {
                category: ''
            }
        }
    },
    methods:{
        async SubmitForm(){
            try {
                let result = await Category.addCategory()
                this.$message.success('添加成功');
            } catch (error) {
                this.$handleError(error);
            }
        }
    }
}
</script>