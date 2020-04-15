<template>
    <div class="root">
        <Header v-bind:username="username"/>
        <div style="text-align: center"><h3>添加新商品</h3></div>
        <el-row>
            <el-col :span="8"><p/></el-col>
            <el-col :span="8">
                <GoodsForm v-bind:goodsForm="goodsForm"/>
                <div style="text-align: center"><el-button type="primary">添加新商品</el-button></div>
            </el-col>
            <el-col :span="8"><p/></el-col>
        </el-row>
    </div>
</template>

<script>
    import Header from "../components/Header";
    import GoodsForm from "../components/GoodsForm";
    export default {
        name: "NewGoods",
        components: {GoodsForm, Header},
        data: function () {
            return{
                username: '',
                goodsForm: {
                    title: '',
                    detail: '',
                    price: 100.00,
                    amount: 1,
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
                    let username = response.data
                    if(username.length == 0) {
                        console.log('陌生人')
                        that.$router.push('/')
                    }
                    else {
                        console.log(username + '已登录')
                        that.username = username
                    }
                }).catch(function(response){
                    console.log(response)
                })
            }
        }
    }
</script>

<style scoped>

</style>