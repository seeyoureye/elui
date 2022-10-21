//这个文件是 element-ui 的按需引入 以及原型方法
//我其实想,直接使用整个完整引入的 不然真的事多
import Vue from 'vue';//首先引入 vue 毕竟要 use 否则怎么用呢
import {
    Button,
    Form,
    FormItem,
    Input,
    Message,
    Container,
    Header,
    Aside,
    Main,
    Menu,
    Submenu,
    MenuItemGroup,
    MenuItem,
    Breadcrumb,
    BreadcrumbItem,
    Card,
    Table,
    TableColumn,
    Pagination,
    Switch,
    Dialog,
    Select,
    Option,
    Tag,
    Row,
    Col,
    Tree,
    Popconfirm,
    Cascader,
    Alert,
    Tabs,
    TabPane,
    Steps,
    Step,
    Checkbox,
    CheckboxGroup,
    Upload,
    Timeline,
    TimelineItem

} from 'element-ui';
Vue.use(TimelineItem)
Vue.use(Timeline)
Vue.use(Upload)
Vue.use(CheckboxGroup)
Vue.use(Checkbox)
Vue.use(Step)
Vue.use(Steps)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Alert)
Vue.use(Cascader)
Vue.use(Popconfirm)
Vue.use(Tree)
Vue.use(Col)
Vue.use(Row)
Vue.use(Tag)
Vue.use(Option)
Vue.use(Select)
Vue.use(Dialog)
Vue.use(Switch)
Vue.use(Pagination)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Card)
Vue.use(BreadcrumbItem)
Vue.use(Breadcrumb);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Submenu);
Vue.use(Menu);
Vue.use(Button)
Vue.component(Form.name,Form)
Vue.component(FormItem.name,FormItem)
Vue.component(Input.name,Input)
Vue.use(Container);
Vue.use(Header)
Vue.use(Aside),
Vue.use(Main)
Vue.prototype.$message = Message;
//封装的 router,第一个参数是 path 第二个是携带的简单参数
Vue.prototype.myRouter = function(path,data){
    this.$router.push({path:`${path}`,query:data})
  }
   //封装的 el-ui消息提醒 出现了两次就尝试封装吧
Vue.prototype.myalert = function(text='网络异常,请稍后重试', type = "warning"){
    Message({
      message: text,
      type: type,
    });
  };

  //--------------------商品管理的分类参数  动态参数/静态属性共用的添加参数所使用
  //两个子页面共用一个函数发送 
  Vue.prototype.pageShareDialogAdd = async function(value){
    let id = this.id;
    let dataObj = {attr_name:value,attr_sel:this.type};
    let {data:res} = await this.$API.goods.addAttributeForType(id,dataObj);
    if(res.meta.status == 201){
      this.myalert('创建成功','success');
      //新获取的数据,直接 push 到页面?
      this.formData.push(res.data);
    }else{
      this.myalert('网络异常,请稍后重试',' danger');
    }
    //console.log(this.$parent.$parent.$parent.$parent.sendReq());
  }
  import * as goods from '@/api/goodsManage';
  //这也是上面所说两个子页面共用的东西 一个是添加 一个是删除 应该还有一个修改
  Vue.prototype.pageShareRemoveItem=async function(cat_id,attr_id){
    let {data:res} = await goods.removeParam(cat_id,attr_id);
    if(res.meta.status==200){
      Vue.prototype.myalert('删除成功','success');
      this.getDataList(this.id)
    }else{
      Vue.prototype.myalert()
    }
  }
  //修改
  Vue.prototype.SharePageEdit = async function(id,attr_id,{attr_name,attr_sel,attr_vals},type){
    let {data:res} = await this.$API.goods.editAttrParams(id,attr_id,{attr_name,attr_sel,attr_vals})
    if(res.meta.status==200){
        this.myalert('更新成功','success');
        if(type=='tag'){
          //console.log(res.data);
        }else{
        this.$emit('SharePageDialogMethod','edit','myEditDialog');
        }
    }else{
        this.myalert();
        if(type=='tag'){
        
        }else{
          this.closeDialog()

        }
    }
    //console.log(res);
  }
  //获取列表
  Vue.prototype.getDataList = async function(nowV){
    let {data:res} = await this.$API.goods.onlyOrManyforTpye(nowV,this.type);
    if(res.meta.status==200){
      this.formData = res.data;
      this.myHeaderButtonData.disabled = false
    }else{
      this.myalert('网络异常,请稍后重试','danger')
    }
  }
  //--------------------商品管理的分类参数  动态参数/静态属性共用的添加参数所使用
//js文件不需要暴露 直接引入就好