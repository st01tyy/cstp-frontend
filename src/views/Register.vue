<template>
    <div class="root">
        <p>注册</p>
        <el-row>
            <el-col :span="10"><p/></el-col>
            <el-col :span="4">
                <el-form size="medium" :model="registerForm" :rules="rules" ref="registerForm">
                    <el-form-item prop="username">
                        <el-input maxlength="10" placeholder="请输入用户名" v-model="registerForm.username"/>
                    </el-form-item>
                    <el-form-item prop="pw1">
                        <el-input maxlength="16" show-password placeholder="请输入密码" v-model="registerForm.pw1"/>
                    </el-form-item>
                    <el-form-item prop="pw2">
                        <el-input maxlength="16" show-password placeholder="请再次输入密码" v-model="registerForm.pw2"/>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="register('registerForm')">登录</el-button>
                    </el-form-item>
                </el-form>
                <el-alert v-show="registerResult.length > 0" v-bind:title="registerResult" type="error" @close="registerResult = ''"/>
            </el-col>
            <el-col :span="10"><p/></el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "Register",
        data: function () {
            let validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.registerForm.pw1) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return{
                registerForm:{
                    username: '',
                    pw1: '',
                    pw2: ''
                },
                registerResult: '',
                rules:{
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'}
                    ],
                    pw1: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min:4, message: '密码至少含有4个字符', trigger: 'blur'}
                    ],
                    pw2:[
                        {validator: validatePass2, trigger: 'blur'}
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
                    if(response.data.length > 0){
                        /*用户已登录*/
                        that.$router.push('/')
                    }
                }).catch(function(response){
                    console.log(response)
                })
            },
            register: function (formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let that = this
                        that.$axios.post('http://localhost:8088/data/register', {
                            username: that.registerForm.username,
                            pw: that.registerForm.pw1
                        }).then(function(response){
                            console.log(response)
                            let result = response.data.result
                            if(result){
                                that.$router.push('/')
                            }else{
                                that.registerResult = response.data.msg
                                console.log(that.registerResult)
                            }
                        }).catch(function(error){
                            console.log(error)
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
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