<template>
  <el-tabs
    v-model="page"
    tab-position="left"
    @tab-click="tabClick"
    :before-leave="leaveTab"
    ><!-- @tab-click="tabClick" :before-leave="leaveTab" -->
    <!-- 后续编辑 :
        第一眼我还有种 我操兄弟挺nb的
          写的时候才知道我到底做了些什么...
    -->
    <el-tab-pane
      v-for="item in stepsAndTabs.slice(0, 5)"
      :key="item.key"
      :label="item.title"
      :name="item.key"
    >
      <!-- 子页面显示的地方 -->
      <component
        :is="item.page"
        :isChecked="isChecked"
        :ref="item.page"
        :addId="addId"
        :addObj="addObj"
      ></component>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import EssentialInformation from "../addGoodsTabItemPage/essentialInformation"; // 基本信息页面
import GoodsParams from "../addGoodsTabItemPage/goodsParams/index.vue"; // 商品参数页面
import GoodsAttr from "../addGoodsTabItemPage/goodsAttr/index.vue"; // 商品属性页面
import GoodsImage from "../addGoodsTabItemPage/goodsImage/index.vue"; // 商品图片页面
import GoodsDetails from "../addGoodsTabItemPage/goodsDetails/index.vue"; // 商品内容页面
export default {
  name: "addGoodsLeftNav",
  props: {
    stepsAndTabs: Array,
  },
  data() {
    return {
      page: "1", // tabs需要的是字符串 步骤条需要的却是数值类型 得类型转换,
      state: false, //判断是否跳转 默认值为 false
      isChecked: [],
      addId:'',//id
      addObj:{
        goods_name:'',//名称
        guuds_cat:'',//3级分类
        goods_price:'',//价格
        goods_number:'',//数量
        goods_weight:'',//重量
        goods_introduce:'',//描述
        pics:[],//图片
        attrs:[],//属性
    },
    };
  },
  mounted() {
    let {goods_cat} = this.$store.state.addGoods.dataObj;
    //如果是编辑属性
    //并且有 id 
    if(goods_cat){
      this.addObj = this.$store.state.addGoods.dataObj;
      this.addId = goods_cat;
    }
    },
  methods: {
    //tabitem点击的回调,先写着,如果没用后面再删掉
    tabClick() {
      // 类型转换的值传过去,然后重新赋值 响应点击是的哪一页
      //console.log(this.page);
      //this.$emit('tabClick',parseInt(this.page));
    },
    // 后续编辑 : 可以看出当时我写的是5个页面,独立判断如果成功就正常跳转
    // 后续编辑 : 结果写到后面,只有第一个有表单验证可以供我这么使用,后面并没有
    // 后续编辑 : 除非我强行在每一个页面都套一层 form? 这也太奇怪了吧,又或者是我一开始就不应该拆分?然后共用一个地方的表单验证,每一次单独验证?
    // 后续编辑 : 总之这里其实算是我整个项目遇到的最大的坑
    // 后续编辑 : 首先我根据上一个页面的v-for的成功,在这里进行了延伸...写的是你吗! 我v-for出来了5个tabs子页面的按钮
    // 后续编辑 : 然后我又v-for在每一个子tab中生成一个子页面
    // 后续编辑 : 正是因为这个不同子页面通信 以及方法调用..等等一系列事情并发,让我意识到其实我根本驾驭不了v-for 子组件
    // 后续编辑 : 这种事情对我来说太早了...
    // 后续编辑 : 就这个方法而言,我认为写的没有什么问题
    // 后续编辑 : 有个共同的父组件,然后类似switch那种的清晰明了的结构,每一个页面离开之前验证规则,通过规则返回true/false
    // 后续编辑 : 但是我没有实现我想要的效果,所以是有瑕疵的,我只有第一个页面是完整验证,后续都没有进行验证,所以是不成熟的构思
    async leaveTab(now, old) {
        // a 是前往的页面 , b 是上一页
        let res;// 返回值为布尔值 true/false
        if(old=='1'){//离开 tab 基本信息
             // 通过 ref 调用子组件内部的表单验证,如果条件满足则放行
            res = await this.$refs['EssentialInformation'][0].$refs.Basicsform.validate();
            this.$refs['EssentialInformation'][0].setData();
            let {goods_cat} = this.$store.state.addGoods.dataObj;
            this.addId = goods_cat;
        }else if(old == '2'){//离开 tab 商品参数
            res = true;
            this.$refs['GoodsParams'][0].forEachList();
        }else if(old == '3'){//离开 tab 商品属性
            res = true;
            this.$refs['GoodsAttr'][0].setInfo()
        }else if(old == '4'){//离开 tab 商品图片
            res = true;
        }else if(old == '5'){//离开 tab 商品内容
            res = true;
        }
        // 到时候每一个页面都用 res 来接收,并且返回值 统一为 true 目前先在每一个里面写切换时的代码
        if(res==true){//写个这个是因为返回值可能是 promise 但是在符合条件的时候,一定是 true
            this.$emit("tabClick", parseInt(now - 1));
        }
        return res 
        // 后续编辑 : 这里是当时的心路,是已经放弃/作废的代码 是的,当时的我并不会git 不然我可能不会写出v-for 这种蠢事了 因为我不想放弃自己的构思
      /* let p = new Promise((resolve,reject)=>{
        if (this.state) {
          this.$emit("tabClick", parseInt(now - 1));
          //this.state = false; 这行代码,我去掉了,它为 true 一次,我就让他一直是 true 了 否则每一次都得点击多次才行
          // 以后写这种需要验证表单规则的需要写在一个页面了
          return resolve(true);
        } else {
          //第一时间一定是要阻止的 否则直接就进入下一个页面了,下一次写这种就写在一个页面了 或者跨页面跨组件的 ref?
          // 果然啊,可以在父组件里面通过 refs 调用子组件里面的东西 这样就不会出现什么乱七八糟的顺序问题了
          // 我知道怎么解决前后顺序的问题, 也知道同步代码优先级最高,问题是你知道是一回事解决起来又是一回事
          // 它就是要你第一时间返回一个结果,你给不了它就不等了 所以才会出现 点击多次(第二次才有效果),
          // 因为点击时 this.state 还是 false ,点击之后代码执行 才变为 true 
          // 以后和onclick相关的方法需要注意,优先级得最高才行,否则会出现大问题
          this.state = false;
          return reject(false);
        }
        })
        let res = await p;
        console.log(res); */
    },
  },
  components: {
    EssentialInformation,
    GoodsParams,
    GoodsAttr,
    GoodsImage,
    GoodsDetails,
  },
};
</script>

<style>
</style>