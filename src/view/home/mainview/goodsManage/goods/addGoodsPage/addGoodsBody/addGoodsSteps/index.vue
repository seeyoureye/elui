<template>
    <!-- 后续编辑 : 
        这里就是个步骤条而已,没有任何实际动作
        就连渲染也是根据prop的数据而变动
        所以当时没有打注释,因为正常显示效果没有打开的必要
    -->
  <el-steps :align-center="true" :active="active" direction="horizontal" process-status="process" finish-status="success">
                <el-step v-for="item in stepsAndTabs"
                    :key="item.key"
                    :title="item.title">
                </el-step>
    </el-steps>
</template>

<script>
export default {
    name:'addGoodsSteps',
    props:{
        stepsAndTabs:Array,
        active:Number,
    }
}
</script>

<style>

</style>