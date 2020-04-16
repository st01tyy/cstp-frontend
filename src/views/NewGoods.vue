<template>
    <div class="root">
        <Header v-bind:username="username"/>
        <div style="text-align: center"><h3>添加新商品</h3></div>
        <el-row>
            <el-col :span="8"><p/></el-col>
            <el-col :span="8">
                <GoodsForm v-bind:goodsForm="goodsForm" v-bind:submit-button-msg="msg" v-bind:submit="submit"/>
                <div style="text-align: center"><el-alert v-show="showAlert" title="添加失败，请重试" type="error" @close="onAlertClosed"/></div>
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
                    gid: null,
                    title: '',
                    detail: '',
                    price: 100.00,
                    amount: 1
                },
                msg: '添加新商品',
                showAlert: false
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
                    that.$router.push('/')
                })
            },
            submit: function () {
                let that = this
                that.$axios.post('http://localhost:8088/data/new_goods', {
                    gid: that.goodsForm.gid,
                    title: that.goodsForm.title,
                    detail: that.goodsForm.detail,
                    price: that.goodsForm.price,
                    amount: that.goodsForm.amount
                }).then(function (response) {
                    let res = response.data.gid
                    if(res == null){
                        that.showAlert = true
                    }else{
                        that.$router.push('/user_center')
                    }
                })
            },
            onAlertClosed: function () {
                this.showAlert = false
            }
        }
    }
</script>

<style scoped>

</style>