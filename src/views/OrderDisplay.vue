<template>
    <div>
        <Header v-bind:username="username" />
        <div class="root" v-show="showAlert"><p style="font-size: 15pt; font-weight: bold">出错啦！</p></div>
        <div class="root" v-show="showAlert == false">
            <h3>订单详情</h3>
            <el-row v-show="showAlert == false" type="flex" justify="center">
                <el-col :span="2">
                    <div style="font-weight: bold;">
                        <p>订单号：</p>
                        <p>商品名称：</p>
                        <p>商品数量：</p>
                        <p>订单总金额：</p>
                        <p>买家：</p>
                        <p>卖家：</p>
                        <p>订单创建时间：</p>
                        <p>订单状态：</p>
                    </div>
                </el-col>
                <el-col :span="3">
                    <div>
                        <p>{{orderInfo.oid}}</p>
                        <p>{{orderInfo.goods.title}}</p>
                        <p>{{orderInfo.amount}}</p>
                        <p>¥{{orderInfo.totalPrice}}</p>
                        <p>{{orderInfo.buyer}}</p>
                        <p>{{orderInfo.owner}}</p>
                        <p>{{orderInfo.createTime}}</p>
                        <p>{{orderInfo.orderStatus}}</p>
                    </div>
                </el-col>
            </el-row>
            <el-button v-show="isBuyer" v-bind:disabled="isDisabled" @click="onButtonClicked">{{buttonMsg}}</el-button>
            <el-button v-show="isOwner" v-bind:disabled="isDisabled" @click="onButtonClicked">{{buttonMsg}}</el-button>
            <el-alert type="error" title="出错啦！" v-show="showError" @close="showError = false" />
        </div>
    </div>
</template>

<script>
    import Header from "../components/Header";
    export default {
        name: "OrderDisplay",
        components:{
            Header
        },
        data: function () {
            return{
                orderInfo: {
                    oid: null,
                    amount: null,
                    totalPrice: null,
                    orderStatus: null,
                    createTime: null,
                    goods: {
                        gid: null,
                        title: null
                    },
                    owner: null,
                    buyer: null
                },
                showAlert: false,
                oid: null,
                username: '',
                showError: false
            }
        },
        computed:{
            isOrderCompleted: function() {
                if(this.orderInfo.orderStatus === 'COMPLETED')
                    return true
                else
                    return false
            },
            isBuyer: function () {
                if(this.isOrderCompleted)
                    return false
                if(this.username === this.orderInfo.buyer)
                    return true
                else
                    return false
            },
            isOwner: function () {
                if(this.isOrderCompleted)
                    return false
                if(this.username === this.orderInfo.owner)
                    return true
                else
                    return false
            },
            buttonMsg: function () {
                if(this.isBuyer){
                    if(this.orderInfo.orderStatus === 'PAYING')
                        return '付款'
                    else if(this.orderInfo.orderStatus === 'SENDING')
                        return '待卖家发货'
                    else if(this.orderInfo.orderStatus === 'RECEIVING')
                        return '确认收货'
                    else
                        return ''
                }else if(this.isOwner){
                    if(this.orderInfo.orderStatus === 'PAYING')
                        return '待买家付款'
                    else if(this.orderInfo.orderStatus === 'RECEIVING')
                        return '待买家确认收货'
                    if(this.orderInfo.orderStatus === 'SENDING'){
                        return '发货'
                    }else{
                        return ''
                    }
                }else
                    return ''
            },
            isDisabled: function () {
                if(this.isBuyer){
                    if(this.orderInfo.orderStatus === 'PAYING')
                        return false
                    else if(this.orderInfo.orderStatus === 'SENDING')
                        return true
                    else if(this.orderInfo.orderStatus === 'RECEIVING')
                        return false
                    else
                        return true
                }else if(this.isOwner){
                    if(this.orderInfo.orderStatus === 'PAYING')
                        return true
                    else if(this.orderInfo.orderStatus === 'RECEIVING')
                        return true
                    if(this.orderInfo.orderStatus === 'SENDING'){
                        return false
                    }else{
                        return true
                    }
                }else
                    return true
            },
            getUrl: function () {
                if(this.orderInfo.orderStatus === 'PAYING')
                    return 'pay_order'
                else if(this.orderInfo.orderStatus === 'SENDING')
                    return 'send_goods'
                else if(this.orderInfo.orderStatus === 'RECEIVING')
                    return 'receive_goods'
                else
                    return null
            }
        },
        mounted() {
            this.initialize()
        },
        methods:{
            initialize: function () {
                this.oid = this.$route.params.id
                this.checkIdentity()
                this.fetchData()
            },
            checkIdentity: function () {
                let that = this
                that.$axios.get('http://localhost:8088/data/identity').then(function(response){
                    let username = response.data
                    if(username.length == 0) {
                        console.log('陌生人')
                    }
                    else
                        console.log(username + '已登录')
                    that.username = username
                }).catch(function(response){
                    console.log(response)
                })
            },
            fetchData: function () {
                let that = this
                let url = 'http://localhost:8088/data/order_display?oid=' + this.oid
                that.$axios.get(url).then(function (response) {
                    console.log(response)
                    let res = response.data
                    if(res.length == 0){
                        that.showAlert = true
                    }else{
                        that.orderInfo = res
                    }
                }).catch(function (response) {
                    console.log(response)
                    that.showAlert = true
                })
            },
            onButtonClicked: function () {
                let that = this
                let url = 'http://localhost:8088/data/' + that.getUrl
                that.$axios.post(url, {
                    oid: that.orderInfo.oid,
                    amount: null,
                    totalPrice: null,
                    orderStatus: null,
                    createTime: null,
                    goods: null,
                    owner: that.orderInfo.owner,
                    buyer: that.orderInfo.buyer
                }).then(function (response) {
                    let res = response.data
                    if(res.oid == 0){
                        that.$router.push('/user_center')
                    }else{
                        that.showError = true
                    }
                }).catch(function (response) {
                    console.log(response)
                    that.showError = true
                })
            }
        }
    }
</script>

<style scoped>
    .root{
        text-align: center;
    }
</style>