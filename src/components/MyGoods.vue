<template>
    <div class="root">
        <el-button type="success" @click="jumpToNewGoods">添加商品</el-button>
        <el-table />
    </div>
</template>

<script>
    export default {
        name: "MyGoods",
        props:{
            username: String
        },
        methods:{
            jumpToNewGoods: function () {
                this.$router.push('/new_goods')
            }
        }
    }
</script>

<style scoped>

</style>