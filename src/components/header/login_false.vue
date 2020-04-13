<template>
    <div>
        <el-button type="success" @click="jumpToLogin">登录</el-button>
        <el-button type="warning" @click="jumpToRegister">注册</el-button>
    </div>
</template>

<script>
    export default {
        name: "login_false",
        methods:{
            jumpToLogin: function () {
                this.$router.push('/login')
            },
            jumpToRegister: function () {
                this.$router.push('/register')
            }
        }
    }
</script>

<style scoped>

</style>