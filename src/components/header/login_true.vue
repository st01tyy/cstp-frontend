<template>
    <div id="root">
        <el-button type="success" class="el-icon-user">{{username}}</el-button>
        <el-button type="danger" @click="logout">登出</el-button>
    </div>
</template>

<script>
    export default {
        name: "login_true",
        props:{
            username: String,
            logout: Function
        }

    }
</script>

<style scoped>

</style>