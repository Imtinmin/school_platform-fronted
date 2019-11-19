<template>
    <div>
        <el-card>
            <div slot="header" class="clearfix">
                <span>题目类型列表</span>
            </div>
            
        </el-card>
    </div>
</template>

<script>
import Category from '@/api/Category'
    export default {
        data(){
            return {
                tableData: []
            }
        },
        methods:{
            async LoadCategoryList(){
                try {
                    let result  = await Category.getCategoryList();
                    
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