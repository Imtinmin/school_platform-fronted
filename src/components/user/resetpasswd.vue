<template>
<div>
    <div style="height: 70px;"></div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>修改密码</span>
            </div>
            <el-form status-icon label-width="80px" class="demo-ruleForm">
                <el-form-item label="密码">
                    <el-input type="password" v-model="ResetpasswdForm.password" autocomplete="off" show-password></el-input>
                </el-form-item>
                <el-form-item label="确认密码">
                    <el-input type="password" v-model="ResetpasswdForm.repassword" autocomplete="off" show-password></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button @click="SubmitForm()" style="margin-left:2%;margin-top:1%" type="primary">确认修改
                    </el-button>
                </el-form-item>
            </el-form>
        </el-card>
</div>
</template>

<script>
import User from '@/api/User'
    export default {
        data() {
            return {
                ResetpasswdForm: {
                    password: '',
                    repassword: ''
                }
            }
        },
        methods: {
            SubmitForm() {
                if(this.ResetpasswdForm.password !== this.ResetpasswdForm.repassword){
                    this.$handleError({'message':'两次输入密码不一致'});
                    return false
                }
                return new Promise(async (resolve,reject) => {
                    try {
                        let result = await User.resetpassword(this.ResetpasswdForm.password)
                        if(result.data.code === 200){
                            this.$message.success('修改成功');
                            this.$router.push({'name':'UserInfo'});
                        }
                    } catch (error) {
                        this.$handleError(error)
                    }

                })
            }
        }
    }
</script>