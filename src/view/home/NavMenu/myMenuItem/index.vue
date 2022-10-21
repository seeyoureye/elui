<template>
  <div>
    <!-- 1 级菜单 -->
    <el-submenu :index="item.path" v-for="item in menuList" :key="item.id">
        <template slot="title">
          <!-- icon图标和间距 -->
          <i :class="iconObj[item.path]" style="margin-right: 12px"></i>
          <!-- 名称 -->
          <span>{{ item.authName }}</span>
        </template>
        <!-- 二级菜单  添加一个点击事件,获取被点击时的父级 name 和子级 name 跳转页面时面包屑需要-->
        <el-menu-item
          @click="getPathName(child.path,item.authName,child.authName)"
          :index="child.path"
          v-for="child in item.children"
          :key="child.id">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <!-- 名称 -->
            <span>{{ child.authName }}</span>
          </template>
        </el-menu-item>
      </el-submenu>
  </div>
</template>

<script>
export default {
    name:'myMenuItem',
    props:{
      menuList:Array,
    },
    data() {
      return {
        iconObj: {
                //返回的数据 有 path 这个信息 可以根据不同的内容来决定不同的 logo,我觉得地址,应该是不会变的
                users: "iconfont icon-user",
                rights: "iconfont icon-tijikongjian",
                goods: "iconfont icon-shangpin",
                orders: "iconfont icon-danju",
                reports: "iconfont icon-baobiao",
            },
      }
    },
    methods:{
      //获取名称用于面包屑 然后请求的时候携带即可
      getPathName(path,fatherName,childName){
        //console.log(path,fatherName,childName);
        sessionStorage.setItem('moon',path)
        sessionStorage.setItem('fatherName',fatherName)
        sessionStorage.setItem('childName',childName);
        //this.myRouter(path,{fatherName,childName})
        this.$router.push({path:`/home/${path}`})
      }
    }
}
</script>

<style>

</style>