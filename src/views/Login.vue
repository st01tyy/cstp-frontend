<template>
    <div class="root">
        <p>登录</p>
        <el-row>
            <el-col :span="10"><p></p></el-col>
            <el-col :span="4">
                <el-form size="medium" :model="loginForm" :rules="rules">
                    <el-form-item prop="username">
                        <el-input maxlength="10" placeholder="请输入用户名" v-model="loginForm.username"/>
                    </el-form-item>
                    <el-form-item prop="pw">
                        <el-input maxlength="16" show-password placeholder="请输入密码" v-model="loginForm.pw"/>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="login">登录</el-button>
                    </el-form-item>
                </el-form>
                <el-alert v-show="!loginResult" title="用户名或密码错误" type="error" @close="loginResult = true"/>
            </el-col>
            <el-col :span="10"><p></p></el-col>
        </el-row>
    </div>
</template>

<script>

    export default {
        name: "Login",
        data: function () {
            return{
                loginForm: {
                    username: '',
                    pw: ''
                },
                loginResult: true,
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'}
                    ],
                    pw: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ]
                }
            }
        },
        mounted() {
            this.checkIdentity()
        },
        methods:{
            checkIdentity: function(){
                let that = this
                that.$axios.get('http://localhost:8088/data/identity').then(function(response){
                    console.log(response)
                    if(response.data.length > 0){
                        /*用户已登录*/
                        that.$router.push('/')
                    }
                }).catch(function(response){
                    console.log(response)
                })
            },
            login: function () {
                let that = this
                that.$axios.post("http://localhost:8088/data/login", {
                    username: that.loginForm.username,
                    pw: that.loginForm.pw
                }).then(function (response) {
                    let res = response.data
                    console.log(res)
                    if(res){
                        that.$router.push('/')
                    }else{
                        /*登录失败*/
                        that.loginResult = false
                    }
                }).catch(function (response) {
                    console.log(response)
                })
            }
        }
    }
</script>

<style scoped>
    .root{
        text-align: center;
    }
    p{
        font-color: #303133;
        font-size: 20px;
        font-weight: bold;
    }

</style>