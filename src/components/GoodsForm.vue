<template>
   <el-form :model="goodsForm" ref="goodsForm" label-width="auto">
       <el-form-item label="商品名称" prop="title">
           <el-input v-model="goodsForm.title" placeholder="请输入商品名称" />
       </el-form-item>
       <el-form-item label="商品详情" prop="detail">
           <el-input v-model="goodsForm.detail" placeholder="请填写商品详情" type="textarea" :autosize="{ minRows: 2, maxRows: 6}"/>
       </el-form-item>
       <el-form-item label="商品价格" prop="price">
           <el-input-number v-model="goodsForm.price" :precision="2" :step="0.01" :min="0" :max="10000000" />
       </el-form-item>
       <el-form-item label="商品数量" prop="amount">
           <el-input-number v-model="goodsForm.amount" :step="1" :min="1" :max="100000000" />
       </el-form-item>
   </el-form>
</template>

<script>
    export default {
        name: "GoodsForm",
        props:{
            goodsForm: Object
        }
    }
</script>

<style scoped>

</style>