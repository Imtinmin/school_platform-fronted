<template>
    <div style="margin-left:15%;margin-right:15%;margin-top:2%;">
        <el-card v-loading="loading" class="box-card">
            <div slot="header" class="clearfix">
                <span style="font-size:20px">排行榜</span>
                <el-button @click="toChallenges()" style="float: right; padding: 3px 0" type="text">返回题目</el-button>
            </div>
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="rank" label="排名">
                </el-table-column>
                <el-table-column label="昵称">
                    <template slot-scope="scope">
                        <div slot="reference" class="name-wrapper">
                            <el-button type="text"  @click="select(scope.row.user_id)" size="medium">{{ scope.row.name }}
                            </el-button>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column  prop="score" label="分数">
                </el-table-column>
            </el-table>
            <div style="height:20px"></div>
            
            <div class="block">
                <el-pagination @current-change="currentChange(currentPage)" :current-page.sync="currentPage" background layout="prev, pager, next,total,jumper" :total="total">
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>
    import Rank from '@/api/Rank';
    export default {
        data() {
            return {
                tableData: [],
                base: '/user/',
                currentPage: 1,
                total: 0,
                loading: false
            }
        },
        methods: {
            select(user_id) {
                this.$router.push({path:'/user/ctf/' + user_id});
            },
            currentChange(page){
                //alert(page)
                this.LoadRanking(page)
            },
            async LoadRanking(page=1) {
                this.loading = true
                this.tableData = [];
                try {
                    let result  = await Rank.getRankList(page);
                    let data = result.data.data.ranking;
                    this.total = result.data.data.total;
                    for (let index = 0; index < data.length; index++) {
                        this.tableData.push({'user_id':data[index].user_id,'rank':(page-1)*10+index+1,'name':data[index].name,'score':data[index].score})
                    }
                    this.loading = false
                } catch (error) {
                    this.$handleError(error);
                    this.loading = false
                }
            },
            toChallenges(){
                this.$router.push({'name':'ChallengeList'});
            }
        },
        mounted() {
            this.LoadRanking();
        },
    }
</script>

<style scoped>
.block {
    text-align: center;
}
</style>