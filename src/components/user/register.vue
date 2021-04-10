<template>
    <div style="margin-bottom:10%;">
    <div style="height: 70px"></div>
    <el-card shadow="hover" >
    <div slot="header" class="clearfix">
    <span>注册</span>
    </div>
    <el-form  status-icon  label-width="80px" class="demo-ruleForm">
        <el-form-item label="邮箱">
            <el-input type="email" v-model="RegisterForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户名">
            <el-input type="text" v-model="RegisterForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input type="password" v-model="RegisterForm.password" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
            <el-input type="password" v-model="RegisterForm.repassword" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="验证码">
            <el-input type="text" v-model="RegisterForm.captcha" maxlength="5" autocomplete="off" ></el-input>   
        </el-form-item>
        <el-form-item>
            <img @click="loadcaptcha()" :src=captchaimg>
        </el-form-item>
        <el-form-item>
            <el-button @click="SubmitForm" type="primary" >提交</el-button>
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
            RegisterForm:{
                email: '',
                username: '',
                password: '',
                repassword: '',
                captcha: '',
            },
            captchaimg: '',
            key: '',
        }
    },
    methods:{
        async SubmitForm(){
            if(this.RegisterForm.password !== this.RegisterForm.repassword){
                    this.$message.error('两次输入密码不一致');
                    return false;
            }
            try {
                let result = await User.register(this.RegisterForm.email,this.RegisterForm.username,this.RegisterForm.password,this.RegisterForm.captcha,btoa(this.key));
                if(result.data.code === 200){
                    this.$message.success('注册成功');
                    this.$router.push({'name':'UserLogin'})
                }
            } catch (error) {
                this.$handleError(error);
            }
        },
        async loadcaptcha(){
            try {
                let result = await User.captcha();
                this.captchaimg = result.data.data.img
                this.key = result.data.data.key
            } catch (error) {
                this.$handleError(error);
            }
        }
    },
    mounted(){
        this.loadcaptcha()
    }

}
</script>

<style scoped>
.el-card {
    color: #303133;
}
</style>
