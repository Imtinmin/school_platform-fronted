<template>
    <div style="margin-bottom:10%;">
    <div style="height: 70px;"></div>
    
    <el-card v-loading="loading" shadow="hover">
    <div slot="header" class="clearfix">
    <span>登录</span>
    </div>
    <el-form  status-icon  label-width="80px" >
        
        <el-form-item label="邮箱">
            <el-input type="email" v-model="LoginForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input type="password" v-model="LoginForm.password" autocomplete="off" show-password></el-input>
        </el-form-item>

        <el-form-item>
        <el-button @click="SubmitForm()"  style="margin-left:2%;margin-top:1%" type="primary" >登录</el-button>
        </el-form-item>
    </el-form>
        </el-card>
    </div>
</template>

<script>
import User from '@/api/User'
export default {
    data(){
        return {
            LoginForm:{
                email: '',
                password: ''
            },
            loading: false,
        }
    },
    methods:{
        async SubmitForm(){
            this.loading = true
            try {
                let result = await User.login(this.LoginForm.email,this.LoginForm.password);
                //if(result.code === 200){
                    this.$router.push({'name':'UserInfo'})
                    localStorage.setItem("jwt", result.data['access_token']);
                    this.$store.commit('login')
                    try {
                        let res = await User.getUserInfo();
                        this.$store.commit('setUserName',res.data.data.name)
                        if(res.data.data.admin){
                            this.$store.commit('enterAdminMode')
                        }
                    } catch (error) {
                        alert(error)
                        this.$handleError(error);
                        
                        this.loading = false;
                    }

                /*}else{ //500
                    this.$handleError(error);
                }*/
            }catch (error) {
                this.$handleError(error);
                this.loading = false
            }

        }
    }
}
</script>


