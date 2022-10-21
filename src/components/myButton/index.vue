<template>
 <el-button 
    style="margin-right:15px" 
    :type="buttonData.type" 
    :size="buttonData.size ?buttonData.size:'default'" 
    :plain="buttonData.plain" 
    :icon="buttonData.icon"
    :title="buttonData.title"
    :disabled="buttonData.disabled ? buttonData.disabled : false"
    >{{buttonData.text}}</el-button>
</template>

<script>
export default {
    name:'myButton',
    props:{
        buttonData:Object,
        id:Number
    },
    data() {
        return {
            isDelete:false
        }
    },
    methods:{
        //确认按钮,响应父级
    },
    computed: {
        
    },
}
</script>

<style>

</style>