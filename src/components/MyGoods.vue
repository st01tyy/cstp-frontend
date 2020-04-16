<template>
    <div class="root">
        <el-button type="success" @click="jumpToNewGoods">添加商品</el-button>
        <div style="margin-top: 10px; margin-bottom: 10px;">
            <el-alert v-show="showAlert" title="查询时发生错误，请刷新重试" type="error" :closable="false"/>
        </div>
        <el-table :data="goodsInfo" border style="width: 100%">
            <el-table-column prop="title" label="商品名称" />
            <el-table-column prop="price" label="商品价格（元）" />
            <el-table-column prop="amount" label="商品数量" />
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" size="medium">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "MyGoods",
        props:{
            username: String
        },
        data: function() {
            return{
                goodsInfo: [],
                showAlert: false
            }
        },
        mounted() {
            this.fetchData()
        },
        methods:{
            fetchData: function() {
                let that = this
                that.$axios.get('http://localhost:8088/data/goods').then(function (response) {
                    let res = response.data
                    console.log(res)
                    if(res == null){
                        that.showAlert = true
                    }else{
                        that.goodsInfo = res
                    }
                })
            },
            jumpToNewGoods: function () {
                this.$router.push('/new_goods')
            },
            handleClick: function(row){
                console.log(row)
            }
        }
    }
</script>

<style scoped>

</style>