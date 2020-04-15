<template>
    <el-row>
        <el-col :span="4"><p/></el-col>
        <el-col :span="16">
            <el-row>
                <el-col :span="6" >
                    <p>{{username}}</p>
                    <el-button>编辑账户信息</el-button>
                </el-col>
                <el-col :span="18">
                    <br>
                    <el-tabs value="my_goods">
                        <el-tab-pane label="我的订单" name="my_orders">
                            <MyOrder />
                        </el-tab-pane>
                        <el-tab-pane label="我的商品" name="my_goods">
                            <MyGoods v-bind:username="username" />
                        </el-tab-pane>
                    </el-tabs>
                </el-col>
            </el-row>
        </el-col>
        <el-col :span="4"><p/></el-col>
    </el-row>
</template>

<script>
    import MyGoods from "./MyGoods";
    import MyOrder from "./MyOrder";
    export default {
        name: "UserInformation",
        props:{
            username: String
        },
        components:{
            MyOrder,
            MyGoods
        }
    }
</script>

<style scoped>

</style>