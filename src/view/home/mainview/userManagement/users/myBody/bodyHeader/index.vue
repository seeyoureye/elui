<template>
  <div>
    <el-input style="width:300px ;" placeholder="请输入搜索内容" size="normal" clearable @clear="getData" v-model="keyword">
        </el-input>
        <el-button type="info" plain size="default" @click="goSearch" icon="el-icon-search"></el-button>
        <el-button type="primary" size="default" @click="$emit('openOrCloseDialog','open','addUserData')">添加用户</el-button>
  </div>
</template>

<script>
export default {
    name:'bodyHeader',
    data() {
        return {
            keyword:''
        }
    },
    methods:{
        //搜索用户
        goSearch() {
            if(!this.keyword){
                this.myalert('请输入搜索内容后重试','warning')
            }
            this.$emit('toQuery',this.keyword)
        },
        //input 的 clear 回调 清空搜索内容,并且重新发送请求 拉取数据
        getData(){
            this.$emit('toQuery')
            //console.log('123');
        },
    }
}
</script>

<style>

</style>