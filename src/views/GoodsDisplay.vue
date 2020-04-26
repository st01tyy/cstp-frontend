<template>
    <div>
        <Header v-bind:username="username" />
        <el-row>
            <el-col :span="7"><p/></el-col>
            <el-col :span="10">
                <el-row>
                    <el-col :span="4"><p/></el-col>
                    <el-col :span="20">
                        <h3>{{goodsInfo.title}}</h3>
                        <p><span>售价</span> ¥{{goodsInfo.price}}</p>
                        <p><span>卖家：</span>{{goodsInfo.owner}}</p>
                        <el-form>
                            <el-form-item>
                                <el-input-number v-model="amount" v-bind:max="goodsInfo.amount" :min="1"/>
                            </el-form-item>
                            <el-form-item>
                                <el-button v-show="goodsInfo.amount > 0" type="success" @click="onButtonClicked" v-loading.fullscreen.lock="fullscreenLoading">购买</el-button>
                                <el-alert v-show="goodsInfo.amount == 0" title="已售罄" type="error" :closable="false" />
                            </el-form-item>
                        </el-form>
                        <el-alert v-show="showAlert" title="创建订单时发生错误，请重试" type="error" effect="dark" @close="showAlert = false"/>
                    </el-col>
                </el-row>
                <el-tabs type="border-card">
                    <el-tab-pane label="商品详情">
                        <div class="detail">
                            {{goodsInfo.detail}}
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
            <el-col :span="7"><p/></el-col>
        </el-row>
    </div>
</template>

<script>
    import Header from "../components/Header";

    export default {
        name: "GoodsDisplay",
        components: {
            Header
        },
        data: function () {
            return{
                username: '',
                goodsInfo:{
                    gid: null,
                    title: null,
                    detail: null,
                    price: 100.00,
                    amount: 1,
                    owner: null
                },
                amount: 1,
                fullscreenLoading: false,
                showAlert: false
            }
        },
        mounted() {
            this.initialize()
        },
        methods:{
            initialize: function () {
                this.goodsInfo.gid = this.$route.params.id
                this.checkIdentity()
                this.fetchData()
            },
            checkIdentity: function () {
                let that = this
                that.$axios.get('http://localhost:8088/data/identity').then(function(response){
                    let username = response.data
                    if(username.length == 0)
                        console.log('陌生人')
                    else
                        console.log(username + '已登录')
                    that.username = username
                }).catch(function(response){
                    console.log(response)
                })
            },
            fetchData: function () {
                let that = this
                let url = 'http://localhost:8088/data/get_goods?gid=' + that.goodsInfo.gid
                that.$axios.get(url).then(function(response){
                    let goodsInfo = response.data
                    that.goodsInfo = goodsInfo
                    that.amount = that.goodsInfo.amount
                }).catch(function(response){
                    console.log(response)
                })
            },
            onButtonClicked: function () {
                if(this.username.length == 0){
                    /*未登录*/
                    this.$router.push('/login')
                }
                else{
                    /*已登录*/
                    this.openFullScreen()
                    let that = this
                    that.$axios.post('http://localhost:8088/data/new_order', {
                        gid: that.goodsInfo.gid,
                        amount: that.amount,
                        buyer: that.username
                    }).then(function (response) {
                        console.log(response)
                        that.fullscreenLoading = false
                        let res = response.data
                        if(res.oid == 0){
                            /*创建成功*/
                            that.$router.push('/user_center')
                        }else{
                            /*创建失败*/
                            that.showAlert = true
                        }
                    }).catch(function (response) {
                        console.log(response)
                        that.fullscreenLoading = false
                    })
                }
            },
            openFullScreen() {
                this.fullscreenLoading = true;
            }
        }
    }
</script>

<style scoped>
    .detail{
        white-space: pre-line;
    }
</style>