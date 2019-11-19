<template>
    <div>
        <div style="height: 60px"></div>
        <el-container>
            <el-header style="margin-left: 20%">
                <el-tabs v-model="activeTab" type="border-card" @tab-click="handleClick" stretch>
                    <template v-for="category in categorylist">
                        <el-tab-pane :label="category" :name="category" :key="category"></el-tab-pane>
                    </template>
                </el-tabs>
            </el-header>
            <el-container>
                <el-aside width="20%">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>排行榜(前20)</span>
                        </div>
                        <el-table :data="tableData" style="width: 100%">
                            <el-table-column prop="rank" label="名次">
                            </el-table-column>
                            <el-table-column prop="name" label="昵称">
                            </el-table-column>
                            <el-table-column prop="score" label="分数">
                            </el-table-column>
                        </el-table>
                    </el-card>
                </el-aside>
                <el-container>
                    <el-main>
                        <el-card class="challenge">
                            <challenge-card v-for="(question,i) in questions" :challengeBaseInfo="question" :key="i">
                            </challenge-card>
                        </el-card>
                    </el-main>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>

<style>
    .el-header,
    .el-footer {
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-aside {
        color: #333;
        text-align: center;
    }

    .el-main {

        color: #333;

    }

    body>.el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
</style>

<script>
    import Challenge from '@/api/Challenge';
    import Rank from '@/api/Rank';
    import challengeCard from './challengeCard.vue'
    export default {
        data() {
            return {
                activeNames: ['1'],
                activeTab: '',
                categorylist :[],
                category: '',
                questions: ['web1', 'web2', 'web3', 'web4', 'web5'],
                dialogVisible: false,
                tableData: [{
                    rank: 1,
                    name: '王小虎',
                    score: 100,
                }]
            };
        },
        methods: {
            handleChange(val) {
                console.log(val);
            },
            handleClick(tab, event) {
                console.log(tab, event);
            },
            async LoadCategory() {
                try {
                    this.result = await Challenge.getCategoryList();
                    if (this.result.data.code === 200) {
                        this.categories = this.result.data.data; //result.data   {"code":200,"data":[],"msg":"success"}
                        for (let index = 0; index < this.result.data.data.length; index++) {
                            //alert(this.result.data.data[index].category_name);
                            this.categorylist.push(this.result.data.data[index].category_name);
                        }
                        this.activeTab = this.categorylist[0] //web
                    } else {
                        this.$message.error(this.result.data.msg);
                    }

                } catch (error) {
                    this.$message.error(error);
                }

            },
            async LoadRanking(){
                try {
                    this.rank = await Rank.getRankList();
                    if (this.rank.data.code === 200) {
                        for (let index = 0; index < this.rank.data.data.length; index++) {
                            this.tableData.push({"rank":1,"name":this.rank.data.data[index].name,"score":this.rank.data.data[index].score})
                        }
                    }else{
                        this.$message.error(error);
                    }
                } catch (error) {
                    this.$message.error(error);
                }
            },
            async LoadChallengeList() {

            }
        },
        mounted() {
            this.LoadRanking();
            this.LoadCategory();
            
        },
        components: {
            challengeCard,
        }
    }
</script>