import Vue from 'vue';//引入
import Router from 'vue-router';//引入
import home from '@/view/home';
import login from '@/view/login';
Vue.use(Router);//调用
//创建
const router = new Router({
    routes:[
        {   //重定向
            path:'/',
            redirect:'/login',//打开默认显示登陆页面
        },
        {   //登陆
            name:'login',
            path:'/login',
            component:login,
        },
        {
            path:'/home',
            redirect:'/home/Welcome'
        },
        {   //主页
            name:'home',
            path:'/home',
            component:home,
            children:[
                {   //登录后重定向到这个页面
                    path:'welcome',
                    component:()=>import('@/view/home/mainview/Welcome')
                },
                {   //用户管理
                    path:'users',
                    component:()=>import('@/view/home/mainview/userManagement/users')
                },
                {   //角色管理
                    path:'roles',
                    component:()=>import('@/view/home/mainview/permissionManagement/roles')
                },
                {   //权限管理
                    path:'rights',
                    component:()=>import('@/view/home/mainview/permissionManagement/rights')
                },
                {   //商品列表
                    path:'goods',
                    component:()=>import('@/view/home/mainview/goodsManage/goods'),
                    children:[
                        //有两个页面,第一个是基本页面默认显示,第二个点击添加商品的时候跳转,
                        {
                            path:'',
                            component:()=>import('@/view/home/mainview/goodsManage/goods/mainPage')
                        },
                        //然后是第二个页面 添加商品的页面
                        {
                            path:'addGoods',
                            component:()=>import('@/view/home/mainview/goodsManage/goods/addGoodsPage')
                        }
                    ]
                },
                {   //分类参数
                    path:'params',
                    component:()=>import('@/view/home/mainview/goodsManage/params')
                },
                {   //商品分类
                    path:'categories',
                    component:()=>import('@/view/home/mainview/goodsManage/categories')
                },
                {   //订单管理
                    path:'orders',
                    component:()=>import('@/view/home/mainview/orderManage/orders')
                },
                {   //数据统计
                    path:'reports',
                    component:()=>import('@/view/home/mainview/dataReports/reports')
                }
            ]
        },

    ]
})
// 跳转的时候要做判断,如果没有 token 就只能呆在登陆页面 有了 token 就放行
router.beforeEach((to,from,next)=>{
    //去登录页面,放行
    if(to.path=='/login')next()

    //获取 token 如果有的话

    let token = sessionStorage.getItem('token')
    //有 token 放行
    if(token){
        return next()
    }
    //没有 token 只准去登陆页面
    if(!token){
        //跳到登陆页面
       next('/login')
    }
})

//暴露

export default router