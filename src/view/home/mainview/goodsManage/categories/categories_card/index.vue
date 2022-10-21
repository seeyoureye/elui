<template>
  <div>
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <!-- card 的顶部,一个添加按钮 待会要加上一个 click 回调 -->
      <div slot="header">
        <MyButton :buttonData="buttonData" @click.native="onclickAddClass" />
      </div>
      <!-- card body 主要显示区域-->
      <div class="body">
        <Categories_table
          v-if="categoriesList.length > 0" :categoriesList="categoriesList" @closeOropen="closeOropen" @responseInfo="responseInfo" />
      </div>
      <!-- 底部 分页器 -->
      <div class="footer">
        <MyPagination :paginationData="paginationData" @changeCurrent="changeCurrent"/>
      </div>
    </el-card>
    <!-- 添加的 dialog -->
    <AddClass v-if="addClass.dataList.length" :addClassData="addClass" @closeOropen="closeOropen" />
    <!-- 编辑的 dialog -->
    <EditClassDialog v-if="editClassData.isShow" :editClassData="editClassData" @closeOropen="closeOropen"/>
  </div>
</template>

<script>
import MyButton from "@/components/myButton/index.vue";
import MyPagination from "@/components/myPagination/index.vue";
import Categories_table from "./categories_table/index.vue";
import AddClass from "./addClass/index.vue";
import EditClassDialog from "./editClassDialog/index.vue";
export default {
  name: "categoriesCard",
  data() {
    return {
      //按钮的数据
      buttonData: {
        type: "primary",
        icon: "",
        text: "添加分类",
      },
      //分页器的数据
      paginationData: {
        current: 1,
        size: 5,
        layout: "total, prev, pager, next, jumper",
        total: 30, //总数
      },
      //商品分类的数据列表
      categoriesList: [],
      //添加分类
      addClass:{
        isShow:false,
        dataList:[]
      },
      //编辑分类
      editClassData:{
        isShow:false,
        id:''
      }
    };
  },
  mounted() {
    this.getData('getdata',this.paginationData.current,this.paginationData.size);
  },
  methods: {
    //获取列表
    async getData(type,pagenum,pagesize) {
      let { data: res } = await this.$API.goods.getCategoriesList(
        pagenum,
        pagesize,
        Array.isArray(type)? type : ''
      );
      if (res.meta.status == 200) {
        //写了个类型作为判断,如果是添加分类的话 把数据获取之后给另一个地方
        if(Array.isArray(type)){
          this.addClass.dataList = res.data;
        }else{
          //正常获取数据
        this.categoriesList = res.data.result;
        this.paginationData.current = res.data.pagenum + 1;
        this.paginationData.size = res.data.pagesize;
        this.paginationData.total = res.data.total;
        }
      }
    },
    //点击分页器时,触发的函数
    changeCurrent(pagenum) {
      this.paginationData.current = pagenum;
      this.getData('getdata',this.paginationData.current,this.paginationData.size);
    },
    //点击添加按钮打开一个弹出层
    onclickAddClass() {
      this.getData([2])
      this.closeOropen('open','addClass')
    },
    //关闭 打开 dialgo 以及拿来更新数据
    closeOropen(action,dataName){
      if(action == 'delete'){
          this.getData('getdata',this.paginationData.current,this.paginationData.size);
          return
        }
      if(action == 'open'){
        this[dataName].isShow = true
      }else{
        this[dataName].isShow = false
        if(action == 'success'){
          this.getData('getdata',this.paginationData.current,this.paginationData.size);
        }
      }
    },
    // 响应子组件传递过来的 id 并且把 id 给另一个组件
    responseInfo(id){
      this.editClassData.id = id
      this.closeOropen('open','editClassData');
    }
  },
  components: { MyButton, MyPagination, Categories_table, AddClass, EditClassDialog },
};
</script>

<style>
.footer {
  margin-top: 20px;
}
</style>