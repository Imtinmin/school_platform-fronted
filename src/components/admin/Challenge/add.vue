<template>
    <div>
        <el-card>
            <div slot="header" class="clearfix">
                <span>添加题目</span>
            </div>
            <el-form ref="form" :model="ChallengeForm" label-width="80px">
                <el-form-item label="题目名称">
                    <el-input v-model="ChallengeForm.title"></el-input>
                </el-form-item>
                <el-form-item label="题目链接">
                    <el-input v-model="ChallengeForm.url"></el-input>
                </el-form-item>
                <el-form-item label="题目类型">
                    <el-select 
                    v-model="ChallengeForm.category_id" 
                    placeholder="请选择题目类型">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="题目分数">
                    <el-input v-model="ChallengeForm.score"></el-input>
                </el-form-item>
                <el-form-item label="题目flag">
                    <el-input v-model="ChallengeForm.flag"></el-input>
                </el-form-item>
                <el-form-item label="题目说明">
                    <el-input type="textarea" v-model="ChallengeForm.description"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit()">创建题目</el-button>
                </el-form-item>
            </el-form>

        </el-card>
    </div>
</template>

<script>
import Category from '@/api/Category'
import Challenge from '@/api/Challenge'
    export default {
        data() {
            return {
                ChallengeForm: {
                    title: '',
                    url: '',
                    description: '',
                    score: '',
                    flag: '',
                    category_id: '',
                },
                options: [
                ],
            }
        },
        methods:{
            async LoadCategory(){
                try {
                    let result = await Category.getCategoryList();
                    //alert(JSON.stringify(result.data.data))
                    for (let index = 0; index < result.data.data.length; index++) {
                        this.options.push({'value':result.data.data[index].category_id,'label':result.data.data[index].category_name})
                        
                    }
                    
                } catch (error) {
                    this.$handleError(error)
                }
            },
            async onSubmit(){
                try {
                    let result = await Challenge.CreateChallenge(this.ChallengeForm.title,this.ChallengeForm.description,this.ChallengeForm.url,this.ChallengeForm.category_id,this.ChallengeForm.flag,this.ChallengeForm.score);
                    this.$message.success('创建题目成功');
                } catch (error) {
                    this.$handleError(error)
                }
            }
        },
        mounted() {
            this.LoadCategory();
        }
    }
</script>