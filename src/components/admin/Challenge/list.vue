<template>
    <div>
        <el-card v-loading="loading">
            <div slot="header" class="clearfix">
                <span>题目列表</span>
            </div>
    
    <el-alert title="修改后题目列表需要刷新" type="warning" show-icon>
    </el-alert>
    <el-tabs v-model="activeTab" @tab-click="handleClick" stretch>
        <template v-for="(category,i) in result">
            <el-tab-pane :label="category.category_name" :name="category.category_name" :key="category.category_id">
                <el-table :data="category.challenges" border style="width: 100%">
                    <el-table-column prop="qid" label="题目编号" width="120">
                    </el-table-column>
                    <el-table-column prop="title" label="题目名称" width="120">
                    </el-table-column>
                    <el-table-column prop="url" label="url" width="200">
                    </el-table-column>
                    <el-table-column prop="description" label="说明" width="300">
                    </el-table-column>
                    <el-table-column prop="flag" label="flag" width="250">
                    </el-table-column>
                    <el-table-column prop="score" label="分数" width="80">
                    </el-table-column>
                    <el-table-column prop="created_at" label="创建时间" width="180">
                    </el-table-column>
                    <el-table-column prop="updated_at" label="更新时间" width="180">
                    </el-table-column>
                    <el-table-column label="操作" width="100" fixed="right">
                        <!-- fixed="right" -->
                        <template slot-scope="scope">
                            <el-button @click="confirm(scope.$index, result[i].challenges)" type="text" size="small">删除
                            </el-button>
                            <el-button @click="edit(scope.$index, result[i].challenges)" type="text" size="small">编辑
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </template>
    </el-tabs>
    <el-dialog title="编辑题目" :visible.sync="ChallengeFormVisible">
        <el-form :label-position="labelPosition" :model="challengeform">
            <el-form-item label="题目名称" :label-width="formLabelWidth">
                <el-input v-model="challengeform.title" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="题目描述" :label-width="formLabelWidth">
                <el-input type="textarea" v-model="challengeform.description" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="题目链接" :label-width="formLabelWidth">
                <el-input v-model="challengeform.url" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="flag" :label-width="formLabelWidth">
                <el-input v-model="challengeform.flag" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="分数" :label-width="formLabelWidth">
                <el-input v-model="challengeform.score" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="ChallengeFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="updatechallenge(challenge_id,challengeform.index)">确 定</el-button>
        </div>
    </el-dialog>
    </el-card>
    </div>
</template>

<script>
    import Challenge from '@/api/Challenge';
    export default {
        data() {
            return {
                category: '',
                result: '',
                activeTab: '',
                tableData: [],
                ChallengeFormVisible: false,
                challengeform: {
                    title: '',
                    flag: '',
                    description: '',
                    url: '',
                    index: ''
                },
                formLabelWidth: '80px',
                labelPosition: 'right',
                challenge_id: '',
                loading: false,
            }
        },
        methods: {
            async LoadChallengeView() {
                this.loading = true;
                try {
                    //加载题目类型
                    let result = await Challenge.getChallengeView();
                    this.result = result.data.data
                    this.activeTab = this.result[0].category_name; //默认跳到web
                    this.loading = false
                    //alert(JSON.stringify(this.result))
                } catch (error) {
                    return false
                    this.$handleError(error);
                }

            },
            handleClick(tab, event) {
                console.log(tab, event);
            },
            async deleteRow(index, rows) {
                try {
                    let result = await Challenge.delChallenge(rows[index].qid)
                    this.$message.success(result.data.msg)
                    rows.splice(index, 1);
                } catch (error) {
                    this.$handleError(error)
                }
            },
            confirm(index, rows) {
                this.$confirm(`确认删除 ${rows[index].title} ?`)
                    .then(_ => {
                        this.deleteRow(index, rows)
                    })
                    .catch(_ => {});
            },
            edit(index, rows) {
                this.ChallengeFormVisible = true
                this.challengeform.title = rows[index].title
                this.challengeform.url = rows[index].url
                this.challengeform.flag = rows[index].flag
                this.challengeform.description = rows[index].description
                this.challengeform.score = rows[index].score
                this.challenge_id = rows[index].qid
                this.challengeform.index = index
            },
            async updatechallenge(challenge_id, index) {
                try {
                    let result = await Challenge.UpdateChallenge(challenge_id, this.challengeform.title, this
                        .challengeform.description, this.challengeform.url, this.challengeform.flag, this
                        .challengeform.score);
                    this.$message.success("更改题目成功");
                    /*this.tableData[index].title = this.challengeform.title
                    this.tableData[index].description = this.challengeform.description
                    this.tableData[index].score = this.challengeform.score
                    this.tableData[index].flag = this.challengeform.flag*/
                    this.ChallengeFormVisible = false
                } catch (error) {
                    this.$handleError(error)
                }
            }
        },
        mounted() {
            this.LoadChallengeView();
        }
    }
</script>