<template>
    <!--<div class="jumbotron">
            <div class="name">用户名</div>
            <div class="score">分数</div>
        </div>-->
    <div>
        <div style="height: 70px;"></div>
        <el-card v-loading="loading">
            <div slot="header" class="clearfix">
                <span>用户信息</span>
            </div>
            <div style="height:10px;"></div>
            <div>用户名： {{ username }}</div>
            <div style="margin-top:1%"></div>
            <div>得分： {{ score }}</div>
            <div style="margin-top:1%"></div>
            <div>邮箱： {{ email }}</div>
            <div style="margin-top:1%"></div>
            <div>上次登录时间： {{ lastLoginTime }}</div>
            <div style="margin-top:1%"></div>
            <div>解出题目：</div>
            <div style="margin-top:1%"></div>
            <!--<div style="display:inline;flex-wrap: wrap;"  v-for="i in 20" :key="i">
            <el-button style="margin-right:2%;" size="small">12123</el-button>
            </div>-->
            <div v-if="SolvedChallenges.length == 0">
                <el-tag type="info">未解出题目</el-tag>
            </div>
            <div v-else style="display: inline;flex-wrap: wrap;" v-for="(challenge,i) in SolvedChallenges" :key="i">
                <el-badge style="margin-right:5%;margin-top: 1%;" :value="challenge.category_name" class="item" :type="type[challenge.category_name]">
                    <el-tooltip class="item" effect="dark" :content="challenge.created_at" placement="top-start">
                        <el-button size="small">{{ challenge.title }}</el-button>
                    </el-tooltip>
                </el-badge>
            </div>
        </el-card>
    </div>
</template>

<script>
    import User from '@/api/User'
    export default {
        data() {
            return {
                username: '',
                email: '',
                score: '',
                SolvedChallenges: [],
                lastLoginTime: '',
                type: {
                    'web': 'primary',
                    'crypto': 'warning',
                    'misc': 'danger',
                    'reverse': 'info',
                    'pwn': 'success',
                },
                loading: false
            }
        },
        methods: {
            async LoadSelectUser() {
                this.loading = true;
                try {
                    let result = await User.select(this.$route.params.id);
                    this.username = result.data.data.name;
                    this.email = result.data.data.email;
                    this.score = result.data.data.score;
                    this.SolvedChallenges = result.data.data.SolvedChallenges;
                    this.lastLoginTime = result.data.data.lastLoginTime;
                    this.loading = false;
                } catch (error) {
                    //alert(JSON.stringify(error))
                    this.$handleError(error);
                    this.loading = false;
                }
            }
        },
        mounted() {
            this.LoadSelectUser();
        }
    }
</script>

<style>
    .text {
        font-size: 16px;
    }



    .box-card {
        margin-top: 5%;
    }

    .jumbotron {
        margin-bottom: 2rem;
        height: 200%;
        text-align: center;
        color: #fff;
        background-color: #409EFF
    }

    .name {
        font-size: 200%;
    }
    .el-badge__content--info {
        background-color: darkviolet;
    }
</style>