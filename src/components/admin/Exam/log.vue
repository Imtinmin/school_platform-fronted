<template>
    <div>
        <el-card v-loading="loading">
            <div slot="header" class="clearfix">
                <span>测验记录</span> 
            </div>
            <el-table :data="tableData">
              <el-table-column width="80" prop="log_id" label="日志ID"></el-table-column>
              <el-table-column width="80" prop="exam_id" label="测验ID"></el-table-column>
              <el-table-column prop="userName" label="用户名"></el-table-column>    
              <el-table-column prop="correct_count" label="正确数"></el-table-column>
              <el-table-column prop="score" label="分数"></el-table-column>
              <el-table-column prop="created_at" label="测验时间"></el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
import Examlog from '@/api/Examlog'
export default {
    data(){
        return {
            tableData: [],
            loading: false
        }
    },
    methods: {
        async LoadTable(){
            this.loading = true
            try {
                let result = await Examlog.list();
                this.tableData = result.data.data
                this.loading = false
            } catch (error) {
                this.$handleError(error)
            }
        },
        async DelLog(){

        }
    },
    mounted(){
        this.LoadTable()
    }


}
</script>