<template>
    <div>
        <el-table :data="orderInfo" border style="width: 100%">
            <el-table-column prop="oid" label="订单号" />
            <el-table-column prop="goods.title" label="商品名称" />
            <el-table-column prop="totalPrice" label="总金额" />
            <el-table-column prop="orderStatus" label="订单状态" />
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" size="medium">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "MyGoodsOrder",
        data: function(){
            return{
                orderInfo: []
            }
        },
        mounted() {
            this.fetchData()
        },
        methods:{
            fetchData: function() {
                let that = this
                that.$axios.get('http://localhost:8088/data/owner_order').then(function (response) {
                    let res = response.data
                    if(res != null){
                        that.orderInfo = res
                    }
                })
            },
            handleClick: function (row) {
                console.log(row)
                this.$router.push({name: 'OrderDisplay', params: {id: row.oid}})
            }
        }
    }
</script>

<style scoped>

</style>