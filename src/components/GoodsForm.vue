<template>
   <el-form :model="goodsForm" :rules="rules" ref="goodsForm" label-width="auto">
       <el-form-item label="商品名称" prop="title">
           <el-input v-model="goodsForm.title" placeholder="请输入商品名称" maxlength="20" show-word-limit/>
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
       <el-form-item>
           <el-button type="primary" @click="onButtonClicked('goodsForm')">{{submitButtonMsg}}</el-button>
       </el-form-item>
   </el-form>
</template>

<script>
    export default {
        name: "GoodsForm",
        props:{
            goodsForm: Object,
            submitButtonMsg: String,
            submit: Function
        },
        data: function () {
            return{
                rules:{
                    title:[
                        { required: true, message: '请输入商品名称', trigger: 'blur' },
                        { max: 20, message: '商品名称不能超过20个字符', trigger: 'blur' }
                    ],
                    detail:[
                        { required: true, message: '请填写商品详情', trigger: 'blur' }
                    ],
                    price:[
                        { required: true, message: '请设置商品价格', trigger: 'blur' }
                    ],
                    amount:[
                        { required: true, message: '请填写商品数量', trigger: 'blur' }
                    ]
                }
            }
        },
        methods:{
            onButtonClicked: function (formName) {
                let that = this
                that.$refs[formName].validate((valid) => {
                    if (valid) {
                        that.submit()
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>