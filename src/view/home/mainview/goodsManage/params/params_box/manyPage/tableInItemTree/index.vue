<template>
<!-- 表格中的树形结构 -->
  <div class="treeClass">
   <div class="inCenter">
     <!-- 标签 v-for -->
     <MyTag v-for="(tag,k) in treeTagList" :key="k"
     class="myTag"
    @removeItemTag="removeItemTag"
    :myTagData="{
        type:'',
        close:true,
        size:'medium',
        text:tag,
        index:k
        }"/>
    <!-- input 和 button v-if/else 点击之后切换一下状态-->
    <el-input class="input-new-tag"  v-if="buttonOrInput" v-model="inputValue" ref="treeInput" @keyup.enter.native="inputMethod" @blur="inputMethod" size="small" placeholder="" ></el-input>
    <MyButton class="button-new-tag" v-else :buttonData="buttonData" @click.native="buttonMethod"/>
   </div>
  </div>
</template>
<script>
import MyTag from '@/components/myTag/index.vue';
import MyButton from '@/components/myButton/index.vue';
export default {
    // 表格中的一个树形结构
    name: "tableInItemtree",
    data() {
        return {
            //按钮要的属性
            buttonData:{
                type:'',
                size:'',
                plain:true,
                text:'+ 添加新的属性'
            },
            inputValue:'',//input 接收的值
            buttonOrInput:false,//为什么是 false ? 因为一开始显示的是按钮 点击后 才是 input
            treeTagList:[],//数组 用于 v-for
            // 额 watch 吧,如果 props 过来的数据发生了变化就给存一份数据
            // 之后操作这一份数据 props 的数据不能修改还是有点麻烦的
            // 每一次 props 出现变化时,清空现有的数组,然后重新赋值成新的数组
        }
    },
    methods: {
        //按钮的响应函数,只要不为空都往里面 push
        inputMethod(){
            let value = this.inputValue;
            //如果为空则不执行
            if(value){
                //让数组里面 push 用于显示
                this.treeTagList.push(value)
                let temp = JSON.stringify(this.treeTagList)
                let id = this.itemData.cat_id;
                let {attr_id,attr_name,attr_sel} = this.itemData;
                let attr_vals = JSON.parse(temp).join(',');
                //收集请求的所需的数据之后发送请求
                this.SharePageEdit(id,attr_id,{attr_name,attr_sel,attr_vals},'tag')
            }
            //不管是不是为空,都应该关闭,毕竟函数已经响应了 然后把本身的内容清空
            this.buttonOrInput = false;
            this.inputValue = '';
        },
        //首先 要展示 就是 false 变成 true 然后获取焦点 要用 nextTick 类似下一次轮训再执行
        buttonMethod(){
            this.buttonOrInput = true;
            //要用得先打个 ref 或者 class id 
            this.$nextTick(_=>this.$refs.treeInput.focus())
        },
        // tag删除的函数 获取那个 index 然后删除的时候删除它 (i,1)
        removeItemTag(itemTag){
            this.treeTagList.splice(itemTag,1);
            let temp = JSON.stringify(this.treeTagList)
            let id = this.itemData.cat_id;
            let {attr_id,attr_name,attr_sel} = this.itemData;
            let attr_vals = JSON.parse(temp).join(',');
            //收集请求的所需的数据之后发送请求
            this.SharePageEdit(id,attr_id,{attr_name,attr_sel,attr_vals},'tag')
        }
    },
    watch: {
        //新值 旧值
        DataList:{
            immediate:true,
            handler:function(nowV,oldV){
            //拥有 id 代表选中了 最后一级的属性 然后通过...语法获取数组
            this.treeTagList = [...nowV];
            }
        }
    },
    props: {
        DataList: Array,
        itemData:Object
    },
    components: { MyTag, MyButton }
}
</script>

<style lang="less" scoped>
    .treeClass{
        height: 70px;
        .inCenter{
            margin: 35px;
        }
    }
.el-tag {
    margin-left: 10px;
    margin-right: 10px;
  }
  .myTag{
    height: 32px;
    line-height: 32px;
}
  .button-new-tag {
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 142px;
    vertical-align: bottom ;
  }
 
</style>