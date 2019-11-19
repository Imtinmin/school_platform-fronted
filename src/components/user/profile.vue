<template>

    <div>
        <div style="height: 70px;"></div>
        <el-card v-loading="loading" class="box-card">
            
            <div slot="header" class="clearfix">
                <span>个人信息</span>
            </div>

                <el-avatar icon="el-icon-user-solid"></el-avatar>
            <div style="height:10px;"></div>
            <div class="text item">用户名： {{ username }}</div>
            <div class="text item">邮箱: {{ email }}</div>
            <div class="text item">ctf分数：{{ score }}</div>
            <div class="text item">观看过的课程：</div>
            <div class="text item">上次登录时间： {{ lastLoginTime }}</div>
            <div class="text item">token： {{ token }}</div>
            <div></div>

            
        </el-card>
    </div>
</template>


<style>
    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }

    .box-card {
        margin-top: 2%
    }
</style>

<script>
import User from '@/api/User'
export default {
    data(){
        return{
            username: '',
            email: '',
            lastLoginTime: '',
            score: '',
            token: '',
            userinfo: {},
            loading: false
            
        }
    },
    async mounted(){
        this.loading = true
        try {
            this.userinfo = await User.getUserInfo();
            if(this.userinfo.data.code === 200) {
                this.username = this.userinfo.data.data.name;
                this.email = this.userinfo.data.data.email;
                this.score = this.userinfo.data.data.score;
                this.$store.commit('setUserScore',this.userinfo.data.data.score);
                this.lastLoginTime = this.userinfo.data.data.lastLoginTime;
                this.token = this.userinfo.data.data.token;
                this.loading = false
            }else{
                this.$handleError(this.userinfo);
                this.loading = false
            }
        } catch (error) {
            if(error.redirect){
                this.$router.push({'name':error.redirect})
            }
            this.$handleError(error);
        }
        
    },
    computed:{
        UserScore(){
                return this.$store.state.UserScore
            }
        },
}
/*
tinmin{"code":200,"data":{"user_id":2,"name":"tinmin","email":"954093370@qq.com","signUpTime":"2019-09-25 23:56:07","lastLoginTime":"2019-09-26 01:17:34","score":"0.00","token":"5R1vtP9ZGecT9wnDvzz62UYhzMUyXthS","banned":false,"admin":false},"msg":"success"}
*/
</script>