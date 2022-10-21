<template>
  <el-tabs
    v-model="page"
    tab-position="left"
    @tab-click="tabClick"
    :before-leave="leaveTab"
    ><!-- @tab-click="tabClick" :before-leave="leaveTab" -->
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
    //离开之前的回调,这个东西有点麻烦,离开之前做验证 因为我写的是子组件 nav 有 5 个,每个里面套了一个子组件
    // 并且,页面内没有按钮,我用什么监听呢 watch ? 我点击任何一个不属于它的按钮 然后检测到数据变化
    // 之后执行验证,验证通过就跳转,否则就停在这里 怎么做呢,传个 prop? 本来是 0 ,然后改为 1?
    // 但是,这个东西会作用于 5 个同时,还是说不同 page 传入不同的值 免得不同值相互冲突?
    async leaveTab(now, old) {
        // a 是前往的页面 , b 是上一页
        //this.isChecked = [now, old];
        //console.log(now,old,this.state,'我是离开之前的方法');
        // 不管是 return true 还是 resolve() 都不晕会出现点击无效的情况,点击多次时才跳转
        // 切换标签之前的钩子，若返回 false 或者返回 Promise 且被 reject，则阻止切换。
        //有一个很大的问题,就是同步代码比传给子组件的早执行,但是又不能使用什么 promise.then 的方式
        // 只要不是第一时间返回 false 就默认放行了
        // 除非写在一个页面里面,或者干脆别写这个逻辑判断 最后提交的时候在决定是否没有填写
        //console.log(this.$refs['EssentialInformation'].examineForm());
        //let res = this.$refs['EssentialInformation'].examineForm()
        //console.log(this.$refs['EssentialInformation'][0].$refs.Basicsform.validate());
        let res;// 返回值为布尔值 true/false
        if(old=='1'){//离开 tab 基本信息
             // 通过 ref 调用子组件内部的表单验证,如果条件满足则放行
            res = await this.$refs['EssentialInformation'][0].$refs.Basicsform.validate();
            this.$refs['EssentialInformation'][0].setData();
            let {goods_cat} = this.$store.state.addGoods.dataObj;
            //单独存一份 id,这样传给其他兄弟组件,单独的 id 
            this.addId = goods_cat;
        // 用 old 是因为我只在离开页面的时候做判断
        }else if(old == '2'){//离开 tab 商品参数
            res = true; //这个页面无意义,就是打不打勾,但是那些都是默认勾选的也不能修改
            //离开页面的时候,把收集的数据转交给需要的发送请求的对象
            this.$refs['GoodsParams'][0].forEachList();
            //统统交给 vuex 然后最后获取一次完整的数据对象
        }else if(old == '3'){//离开 tab 商品属性
            res = true;
            this.$refs['GoodsAttr'][0].setInfo()
        }else if(old == '4'){//离开 tab 商品图片
            res = true;
            //图片当时就已经做了给 vuex 的操作
        }else if(old == '5'){//离开 tab 商品内容
            res = true;
            //没有这个了,在这里面有一个点击按钮点击后整合所有 vuex 里面的内容发送请求跳转页面
        }
        // 到时候每一个页面都用 res 来接收,并且返回值 统一为 true 目前先在每一个里面写切换时的代码
        if(res==true){//写个这个是因为返回值可能是 promise 但是在符合条件的时候,一定是 true
            this.$emit("tabClick", parseInt(now - 1));
        }
        
        return res 

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