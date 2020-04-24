<template>
    <div>
        <Header v-bind:username="username" />
        <div style="margin-top: 10px; margin-bottom: 10px;">
            <el-alert v-show="showAlert" title="查询时发生错误，请刷新重试" type="error" :closable="false"/>
        </div>
        <el-row>
            <el-col :span="6"><p/></el-col>
            <el-col :span="12">
                <div style="text-align: center"><p>全部商品</p></div>
                <el-table :data="goodsInfo" border style="width: 100%">
                    <el-table-column prop="title" label="商品名称" />
                    <el-table-column prop="price" label="商品价格（元）" />
                    <el-table-column prop="amount" label="商品数量" />
                    <el-table-column prop="owner" label="卖家" />
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" size="medium">查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col :span="6"><p/></el-col>
        </el-row>
    </div>
</template>

<script>
    import Header from "../components/Header";
    export default {
        name: "HomePage",
        components:{
            Header
        },
        data: function () {
            return{
                username: '',
                goodsInfo: [],
                showAlert: false
            }
        },
        mounted() {
            this.initialize()
        },
        methods:{
            initialize: function(){
                let that = this
                that.$axios.get('http://localhost:8088/data/identity').then(function(response){
                    let username = response.data
                    if(username.length == 0)
                        console.log('陌生人')
                    else
                        console.log(username + '已登录')
                    that.username = username
                    that.fetchData()
                }).catch(function(response){
                    console.log(response)
                })
            },
            fetchData: function () {
                let that = this
                that.$axios.get('http://localhost:8088/data/all_goods').then(function (response) {
                    let res = response.data
                    if(res == null){
                        that.showAlert = true
                    }else{
                        that.goodsInfo = res
                        console.log(res)
                    }
                }).catch(function (response) {
                    console.log(response)
                })
            },
            handleClick: function(row){
                this.$router.push({name: 'GoodsDisplay', params: {id: row.gid}})
            }
        }
    }
</script>

<style scoped>
    p{
        font-size: 14pt;
        font-weight: bold;
    }
</style>