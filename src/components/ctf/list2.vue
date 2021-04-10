<template>
    <div>
        <el-container>
            <el-main>
                <el-card v-loading="loading">
                    <div slot="header" class="clearfix">
                        <span>CTF练习</span>
                        <el-button @click="toRank()" style="float: right; padding: 3px 0" type="text">排行榜</el-button>
                    </div>
                    <el-tabs v-model="activeTab" @tab-click="handleClick">
                        <!--stretch-->
                        <template v-for="(category,j) in result">
                            <el-tab-pane :label="category.category_name" :name="category.category_name"
                                :key="category.category_id">
                                <template>
                                    <el-alert title="当前得分" type="success" :description="UserScore" show-icon>
                                    </el-alert>
                                </template>
                                <div style="margin-top:3%">
                                    <el-collapse v-for="(challenge,i) in category.challenges" :key="i"
                                        v-model="activeNames" @change="handleChange" accordion>
                                        <el-collapse-item class="challenge-item"
                                            :class="{'challenge-solved': SolvedList.indexOf(challenge.qid) !== -1}"
                                            :name="challenge.qid">
                                            <template slot="title">
                                                <div class="challenge-item-title"> {{challenge.title }}
                                                </div>
                                                <div style="position: absolute;right:5%;color:red">
                                                    Point:{{ challenge.score}}</div>
                                                <div style="color:#909399;position: absolute;left:20%;">
                                                    Solves:{{ challenge.solvecount }}</div>
                                                <!--<div v-if="SolvedList.indexOf(challenge.qid) !== -1"
                                                    style="position: absolute;right:5%;;color:green">已解决</div>-->
                                            </template>

                                            <div style="color:red" v-if="SolvedList.indexOf(challenge.qid) !== -1">已解答
                                            </div>
                                            <!-- 排行榜-->
                                            <ChallengeInfo :challenge="challenge" @show="showSolver"></ChallengeInfo>
                                            <!---->

                                            <el-row>
                                                <el-col :span="12">
                                                    <div>
                                                        <el-input size="big" placeholder="flag{}" v-model="flag">
                                                        </el-input>
                                                    </div>
                                                </el-col>
                                                <el-col :span="12">
                                                    <div>
                                                        <el-button type="primary"
                                                            @click="submitform(challenge.qid,i,j)">提交
                                                        </el-button>
                                                    </div>
                                                </el-col>
                                            </el-row>
                                        </el-collapse-item>
                                    </el-collapse>
                                </div>
                            </el-tab-pane>
                        </template>
                    </el-tabs>
                    <!---->
                    <el-dialog title="解题排行" :visible.sync="dialogTableVisible" center width="30%">
                        <el-table :data="SolvedTable">
                            <el-table-column property="rank" label="排名" width="100"></el-table-column>
                            <el-table-column property="name" label="昵称" width="150">
                            </el-table-column>
                            <el-table-column property="solvedAt" label="提交时间"></el-table-column>
                        </el-table>
                    </el-dialog>
                </el-card>
            </el-main>
        </el-container>
    </div>
</template>


<style>
    .el-header,
    .el-footer {
        background-color: #B3C0D1;
        color: #333;
    }


    .el-container {
        margin-top: 1%;
    }

    body>.el-container {
        margin-bottom: 30px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }

    .challenge-solved .challenge-item-title {
        color: #19806a;
        font-size: larger;
    }

    .challenge-solved>[role=tab] {
        border: 1px green solid;
    }

    .challenge-item-title {
        padding-left: 1rem;
        font-size: larger;
    }
</style>

<script>
    import Rank from '@/api/Rank';
    import Challenge from '@/api/Challenge';
    import ChallengeInfo from '@/components/ctf/ChallengeInfo.vue'
    export default {
        data() {
            return {
                loading: false,
                activeTab: '',
                flag: '',
                activeNames: ['1'],
                result: [],
                SolvedList: [],
                dialogTableVisible: false,
                SolvedTable: [],
            }
        },
        methods: {
            handleChange(val) {
                console.log(val);
            },
            handleClick(tab, event) {
                console.log(tab, event);
            },
            toRank() {
                this.$router.push({
                    'name': 'Rank'
                });
            },
            one(a) {
                alert(a)
            },
            select(user_id) {
                this.$router.push({path:'/user/ctf/' + user_id});
            },
            async submitform(id, i, j) {
                try {
                    let result = await Challenge.SubmitFlag(id, this.flag);
                    this.$store.commit('addUserScore', result.data.data.score);
                    this.$message.success(result.data.msg + " +" + result.data.data.score)
                    this.SolvedList.push(id)
                    this.flag = null;
                    this.result[j].challenges[i].solvecount += 1
                } catch (error) {
                    this.$handleError(error)
                    this.flag = null;
                }

            },
            async showSolver(qid) {
                try {
                    this.SolvedTable = []
                    let result = await Challenge.getSolvedUsers(qid);
                    //alert(JSON.stringify(result.data.data))
                    for (let index = 0; index < result.data.data.length; index++) {
                        this.SolvedTable.push({
                            'rank': index + 1,
                            'name': result.data.data[index].name,
                            'solvedAt': result.data.data[index].solvedAt
                        })
                    }
                    this.dialogTableVisible = true
                } catch (error) {
                    this.$handleError(error);
                }
            },
            async LoadChallengeView() {
                this.loading = true;
                try {
                    //加载题目类型
                    let result = await Challenge.getChallengeView();
                    this.result = result.data.data
                    this.activeTab = this.result[0].category_name; //默认跳到web
                    this.loading = false;
                } catch (error) {
                    return false
                    this.$handleError(error);
                    this.loading = false;
                }

            },
            async LoadSolvedChall() {
                try {
                    let result = await Challenge.getSolvedChallenges();
                    for (let index = 0; index < result.data.data.length; index++) {
                        this.SolvedList.push(result.data.data[index].qid)
                    }
                    
                    //console.log(this.SolvedList)
                } catch (error) {
                    this.$handleError(error);
                    
                }
            }
        },
        computed: {
            UserScore() {
                return " " + this.$store.state.UserScore
            }
        },
        mounted() {
            this.LoadChallengeView()
            this.LoadSolvedChall();
        },
        components: {
            ChallengeInfo,
        }
    }
</script>