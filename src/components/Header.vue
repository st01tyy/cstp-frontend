<template>
    <!-- 页面顶部的标题和用户的登录状态 -->
    <el-container>
        <el-header class="Header">
            <el-row>
                <el-col :span="1">
                    <el-avatar shape="square" :size="50" :fit="logoInfo.fit" style="margin-top: 5px;" :src="logoInfo.url"/>
                </el-col>
                <el-col :span="6">
                    <p class="title" style="display: inline">校园二手交易平台</p>
                </el-col>
                <el-col :span="4">
                    <el-input clearable="true" v-model="query" />
                </el-col>
                <el-col :span="1">
                    <el-button icon="el-icon-search" type="info">搜索商品</el-button>
                </el-col>
                <el-col :span="9"><p/></el-col>
                <el-col :span="3">
                    <!-- 登录状态 -->
                    <login_false v-show="username.length == 0" />
                    <login_true v-show="username.length > 0" v-bind:username="username" v-bind:logout="logout"/>
                </el-col>
            </el-row>
        </el-header>
    </el-container>
</template>

<script>
    import logo from "../assets/logo.png"
    import login_false from "./header/login_false";
    import login_true from "./header/login_true";
    export default {
        name: "Header",
        components:{
            login_false, login_true
        },
        data: function () {
            return {
                logoInfo: {
                    fit: 'fill',
                    url: logo
                }
            }
        },
        props:{
            username: String,
            query: String
        },
        methods:{
            logout: function(){
                let that = this
                that.username = ''
                location.reload()
                that.$axios.post('http://localhost:8088/data/logout').then(function(){
                    /*nothing*/
                }).catch(function (response) {
                    console.log(response)
                })
            }
        }
    }
</script>

<style scoped>
    .Header{
        background-color: #409EFF;
        border-radius: 4px;
        line-height: 60px;
    }
    .title{
        font-color: #303133;
        font-size: 20px;
        font-weight: bold;
    }
</style>