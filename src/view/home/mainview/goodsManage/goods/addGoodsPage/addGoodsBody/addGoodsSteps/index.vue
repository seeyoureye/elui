<template>
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