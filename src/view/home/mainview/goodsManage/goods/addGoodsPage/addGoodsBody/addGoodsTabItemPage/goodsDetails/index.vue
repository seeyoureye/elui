<template>
  <div>
    <span>
        商品内容
    </span>
    <!-- 一个富文本编辑器 -->
    <!-- 后续编辑 :
        没接触过这个东西,这里真的是偷懒了,我只是做了一件事情 npm i 然后是v-model
        任何东西都没配置,完全的不合格,但是不会啊,对着其他人的配置项 c + v 也不是自己的,以后是需要补补这方面的内容的
    -->
    <quill-editor v-model="goods_introduce"> 

    </quill-editor>
    <el-button type="primary" size="default" @click="onSubmit" style="margin-top:20px">添加商品</el-button>
  </div>
</template>

<script>
export default {
    name:'goodsDetails',
    props:{
      addObj:Object
    },
    data() {
      return {
        goods_introduce:'',
        type:'1'
      }
    },
    methods:{
      onSubmit(){
        this.$store.dispatch('getTextBox',this.goods_introduce);
        let obj
        let {goods_name,guuds_cat,goods_price,goods_number,goods_weight,goods_introduce,pics,attrs} = this.$store.state.addGoods.dataObj
        obj = {
        goods_name,
        guuds_cat,
        goods_price,
        goods_number,
        goods_weight,
        goods_introduce,
        pics,
        attrs}
        // 添加
        if(this.type){
          this.sendData(obj)
        }else{
          //编辑
          this.editItem(obj)
        }
      },
      // 添加的请求
      async sendData(dataObj){
        let {data:res} = await this.$API.goods.getAddGoods(dataObj);
        if(res.meta.status==201){
          this.myalert('添加商品成功','success');
          this.$router.push('/home/goods');
          sessionStorage.setItem('childName','商品列表')
        }else{
          this.myalert('内容不能为空,请重试')
        }
      } ,
      // 编辑的请求
      async editItem(){
        let {data:res} = await this.$API.goods.editItemGoods(dataObj);
        if(res.meta.status==201){
          this.myalert('添加商品成功','success');
          this.$router.push('/home/goods');
          sessionStorage.setItem('childName','商品列表')
        }else{
          this.myalert('内容不能为空,请重试')
        }
      }
    },
    watch: {
      addObj:function(nowV,oldV){
        let {goods_introduce} = nowV
        if(goods_introduce){
          this.type = '0'
        }
        this.goods_introduce = goods_introduce
      }
    },
}
</script>

<style>
.ql-editor{
  min-height: 300px;
}
</style>