<template>
    <el-tag 
      :type="myTagData.type" 
      :closable="myTagData.close" 
      @close="remove(myTagData.index)" 
      :size="myTagData.size">{{myTagData.text}}</el-tag>
</template>
<script>
export default {
    props:{
        myTagData:Object
    },
    methods:{
      remove(tag){
        this.$emit('removeItemTag',tag)
      }
    }
}
</script>

<style>

</style>