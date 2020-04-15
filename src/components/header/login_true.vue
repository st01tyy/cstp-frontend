<template>
    <div id="root">
        <el-button type="success" class="el-icon-user" @click="jumpToUserCenter">{{username}}</el-button>
        <el-button type="danger" @click="logout">登出</el-button>
    </div>
</template>

<script>
    export default {
        name: "login_true",
        props:{
            username: String,
            logout: Function
        },
        methods:{
            jumpToUserCenter: function () {
                this.$router.push('/user_center')
            }
        }

    }
</script>

<style scoped>

</style>