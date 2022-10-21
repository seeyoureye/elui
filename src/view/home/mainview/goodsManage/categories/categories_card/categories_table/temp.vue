<template>
    <div>
        <el-table :data="categoriesList" border stripe>
        <el-table-column 
            type="index"
            label="#"
            align="center"
            width="100px">
        </el-table-column>
        <el-table-column 
            label="分类名称"
            prop="cat_name"
            :width="tableWidth">
            <!-- 这里要能展开 1 级 => 2 级 => 3 级-->
          
            
        </el-table-column>
        <el-table-column 
            label="是否有效"
            :width="tableWidth">
            <!-- 一个 icon 图标 估计是 通过 t/f 来显示 不同状态 -->
            <i class="el-icon-success i_success" ></i>
        </el-table-column>
        <el-table-column 
            label="排序"
            :width="tableWidth">
            <!-- tag 不同 level 不同颜色不同文字 这里权限是数字 而且是从 0 开始的 那我就整个数组吧  -->
            <template slot-scope="{row}"> 
                <MyTag :myTagData='tagArr[row.cat_level]' />
            </template>
        </el-table-column>
        <el-table-column 
            label="操作"
            width="col.width">
            <!-- 两个按钮 编辑 删除 -->
            <template slot-scope="{row}">
                <div>
                    <MyButton style="margin-left:15px" :buttonData="buttonData[0]" @click.native='editItem(row)'/>
                    <MyButton :buttonData="buttonData[1]" @click.native='deleteItem(row)'/>
                </div>
            </template>
        </el-table-column>
    </el-table>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>