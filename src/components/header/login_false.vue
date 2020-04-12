<template>
    <div>
        <el-button type="success" @click="jumpToLogin">登录</el-button>
        <el-button type="warning">注册</el-button>
    </div>
</template>

<script>
    export default {
        name: "login_false",
        methods:{
            jumpToLogin: function () {
                this.$router.push('/login')
            }
        }
    }
</script>

<style scoped>

</style>