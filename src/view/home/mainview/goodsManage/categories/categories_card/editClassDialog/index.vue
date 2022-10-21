<template>
  <el-dialog
    title="编辑商品分类"
    :visible.sync="editClassData.isShow"
    width="30%"
    @close="closeDialog('close')">
    <el-form :model="dataForIdObj" ref="form"  label-width="80px" :inline="false" size="normal">
        <el-form-item label="分类名称:">
            <el-input v-model="dataForIdObj.cat_name"></el-input>
        </el-form-item>
    </el-form>
    <span slot="footer">
        <el-button @click="closeDialog('close')">取消</el-button>
        <el-button type="primary" @click="onSubmit">确认</el-button>
    </span>
  </el-dialog>
  
</template>

<script>
export default {
    name:'editClassDialog',
    props:{
        editClassData:Object
    },
    mounted() {
        this.getData(this.editClassData.id)
    },
    data() {
        return {
            dataForIdObj:{}
        }
    },
    methods:{
        closeDialog(action){
            this.$emit('closeOropen',action,'editClassData')
        },
        async onSubmit(){
            let {cat_name,cat_id} = this.dataForIdObj
            let {data:res} = await this.$API.goods.submitEditInfo(cat_id,'PUT',{cat_name})
            if(res.meta.status==200){
                this.myalert('编辑分类信息提交成功','success');
                this.closeDialog('success');
            }else{
                this.myalert('网络异常,请稍后重试','danger');
                this.closeDialog('close');
            }

        },
        async getData(id){
            let {data:res} = await this.$API.goods.getClassForId(id,'get');
            if(res.meta.status==200){
                this.dataForIdObj = res.data;
            }else{
                this.myalert('网络异常,请稍后重试','danger');
            }
        }
    }
}
</script>

<style>

</style>