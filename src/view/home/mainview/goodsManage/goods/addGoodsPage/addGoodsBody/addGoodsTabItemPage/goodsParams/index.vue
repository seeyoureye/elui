<template>
  <div>
    <!-- 后续编辑 :
        底下的注释没有阅读的必要,当时图一乐,想到了曾经想过没试过的方法
        已经弃用
    -->
    <!-- 模拟钩子,其他组件不是这样获取 id 只是试试一直想过没实现过的写法
     <span v-show="false">{{getId}}</span>
   这里的这个 class 至少要设置一个样式,就是 margin-bottom 有多个时,得给点间距
    <div class="goodsParamsList" v-for="item in paramsList" :key="item.index">
      <el-row :gutter="20">
        <el-col :span="4"><span>{{item.attr_name}}</span></el-col>
      </el-row>
      简单的测试了一下通过了,然后换成 tag+checked? 来 v-for 
      <span v-for="(attrvals,k) in item.attr_vals.split(',')" :key="k">{{attrvals}}</span>
    </div> 
   还是不手写了,有个自带的有勾选框 这是 el 的项目-->
    <el-form  ref="form" label-width="80px" size="normal" label-position="top">
      <!-- 套了一层表单 为什么? 因为我想整一个 label-position="top" 其实套一个 div,宽度 100%也是可以做到相同效果的-->
      <el-form-item  :label="item.attr_name"  v-for="(item,k) in paramsList" :key="k" >
        <!-- 内部是 el-checked 多选框 因为不止一个,所以放在一个组里面 -->
        <el-checkbox-group v-model="item.attr_vals"  ><!-- @change="" -->
          <el-checkbox v-for="(child,i) in item.attr_vals" :key="i" :label="child" :border="true">
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
      <!-- 
          <el-checkbox v-for="(item,k) in item.attr_vals.split(',')" :key="k" :label="item">
        </el-checkbox>
       </el-checkbox-group>
       -->
  </div>
</template>

<script>
export default {
  name: "goodsParams",
  props:{
    addId:String
  },
  data() {
    return {
      id: "",
      paramsData:{},
      paramsList: [],
      rules:{},
      checkValue:[],
    };
  },
  methods: {
    // 获取数据列表
    async getDataList(id) {
      let { data: res } = await this.$API.goods.onlyOrManyforTpye(id, "many");
      if (res.meta.status == 200) {
        res.data.map(item=>{
            item.attr_vals =  item.attr_vals.split(',');
        })
        this.paramsList = res.data;
      } else {
        this.myalert();
      }
    },
    forEachList(){
      let newArr = this.paramsList.reduce((p1,p2)=>{
        let info = {attr_id:p2.attr_id,attr_value:p2.attr_vals.join(',')}
        p1.push(info)
        return p1
      },[])
      this.$store.dispatch('getGoodsAttrList',newArr)
    }
  },
 /*  //这几个组件都是用 v-for 出来的,所以没有什么 show -if ... 所以使用的是 computed 计算属性 ,而不是 mounted 钩子
  // 然后再使用 watch 监听属性的变化,每一次,获取新的 id 时 发送一次请求 渲染页面
  computed: {
    // 获取 id
    getId() {
      let {goods_cat} = this.$store.state.addGoods.dataObj

      if(goods_cat){
        this.id = goods_cat.split(",")[2];
        return this.id
      }
    },
  }, */
  watch: {
    // 监视 id 如果发生变化,重新获取数据
    addId: function (nowV, oldV) {
      //有值再采取行动
      if (nowV) {
        //console.log(nowV);//这里 3 个数只需要最后一位
        //let id = nowV.split(",")[2]; //类型转换一下,然后取最后一位,或者是 length-1 也是,但是这里是明确知道只有 3 级的
        //console.log(id);//所以就直接取 2 即可,并不是什么长度不确定,或者什么以后会变成四级或者跟多层级那确实是 length-1 更好
        // 但是这只是一个死的小项目
        //console.log(nowV);
        let id = nowV.split(",")[2];
        this.getDataList(id);
      }
    },
  },
};
</script>

<style>
  .goodsParamsList{
    margin-bottom: 20px;
  }
</style>