<template>
  <div>
    <span>商品属性</span>
    <!-- 这个页面和上一个相同,都是一个 form 表单 然后数据 是名称在 label 内容再 input 里面 改不改取决于自己 -->
    <el-form :model="form" ref="form" label-position="top" label-width="80px" :inline="false" size="normal">
      <!-- 后续编辑 : 
          这里的数据呈现方式依旧是 v-for,因为当时我即便整体不该v-for整活 但是少部分的地方确实是这样更加合适
          以前有多少input就得写多少行,每一行不同的配置,现在我只需要写一个就够了
      -->
      <el-form-item :label="formItem.attr_name" v-for="(formItem,k) in dataList" :key="k">
        <el-input v-model="formItem.attr_vals"></el-input><!--  v-model="" -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
    name:'goodsAttr',
    props:{
      addId:String
    },
    data() {
      return {
        id:'',
        dataList:[],
        form:{}
      }
    },
    methods:{
      // 获取数据
      async getDataList(id){
        // 这一次我是把 axios 封装到了原型,但是反而写的更长了 还是觉得之前那种分类的比较好
        // 只引入了需要的,而不是一整个都在原型上,这样确实是方便l了调用,不需要引入但是,半斤八两吧
        let {data:res} = await this.$API.goods.onlyOrManyforTpye(id,'only');
        if(res.meta.status==200){
          this.dataList = res.data;
        }else{
          this.myalert();//用处在于,发送一个封装的提示消息,默认为 网络异常..
        }
      },
      setInfo(){
        //这两,居然是放在一个地方的
        let newArr = this.dataList.reduce((p1,p2)=>{
        let info = {attr_id:p2.attr_id,attr_value:p2.attr_vals}
        p1.push(info)
        return p1
      },[])
      this.$store.dispatch('getGoodsAttrList',newArr);
      }
    },
    watch: {
      // 和第二个页面的区别是,同样是获取 id 这个更加正式 合规? 监听 prop 传来的数据,然后再本地处理获取第三位的 id
      // 随后发送请求获取相关数据列表展示
      addId: function (nowV, oldV) {
      //有值再采取行动
      if (nowV) {
        // 结构为 1,2,3 取第三位(三个层级的最后一层的 id) id
        let id = nowV.split(",")[2];
        this.getDataList(id);
      }
    },
  },
}
</script>

<style>

</style>