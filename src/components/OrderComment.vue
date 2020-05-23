<template>
    <div>
        <el-row>
            <el-col :span="7"><p /></el-col>
            <el-col :span="10">
                <p>买家评论</p>
                <p id="buyerComment" v-show="!isBuyer">{{orderComment.buyerComment}}</p>
                <el-input type="textarea" v-show="isBuyer" v-model="orderComment.buyerComment" :autosize="{ minRows: 2, maxRows: 6}"/>
                <p>卖家评论</p>
                <p id="ownerComment" v-show="isBuyer">{{orderComment.ownerComment}}</p>
                <el-input type="textarea" v-show="!isBuyer" v-model="orderComment.ownerComment" :autosize="{ minRows: 2, maxRows: 6}"/>
                <div class="buttonArea"><el-button type="primary" @click="updateComment">更新评论</el-button></div>
            </el-col>
            <el-col :span="7"><p /></el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "OrderComment",
        props: {
            oid: String,
            isBuyer: Boolean    //不是买家就是卖家
        },
        data: function () {
            return {
                orderComment: {
                    oid: 0,
                    buyerComment: '',
                    ownerComment: ''
                }
            }
        },
        mounted() {
            this.initialize()
            console.log(this.isBuyer)
        },
        methods: {
            initialize: function () {
                let that = this
                let url = 'http://localhost:8088/data/get_comment?oid=' + that.oid
                console.log(url)
                that.$axios.get(url).then(function (response) {
                    that.orderComment = response.data
                }).catch(function (response) {
                    console.log(response)
                })
            },
            updateComment: function () {
                let that = this
                that.$axios.post('http://localhost:8088/data/update_comment', {
                    oid: that.orderComment.oid,
                    buyerComment: that.orderComment.buyerComment,
                    ownerComment: that.orderComment.ownerComment
                }).then(function () {
                    location.reload()
                }).catch(function (response) {
                    console.log(response)
                })
            }
        }
    }
</script>

<style scoped>
    .buttonArea {
        text-align: center;
        margin-top: 20px;
    }
</style>