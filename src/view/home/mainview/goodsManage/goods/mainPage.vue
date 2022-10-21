<template>
    <div>
      <!-- 头部面包屑 -->
      <div class="goodsTitle">
        <MyHeaderBreadrumb/>
      </div>
      <!-- 身体 el-card -->
      <div class="goodsBody">
        <!-- 其中有表格,以及底部的分页器 -->
        <GoodsBody  @goTop='goTop'/>
      </div>
    </div>
  </template>
  <script>
  import {goTop} from '@/plugins/tool';
  import MyHeaderBreadrumb from '@/components/myHeaderBreadrumb/index.vue';
  import GoodsBody from './goodsBody/index.vue';
  export default {
      name: "goodsmainPage",
      components: { MyHeaderBreadrumb, GoodsBody },
      methods:{
        goTop(){
          //回到顶部
          goTop(8);
          // chrome
          // document.body.scrollTop = 0
          // safari
          // document.documentElement.scrollTop = 0
          // firefox
          // window.pageYOffset = 0
        },
      }
  }
  </script>
  
  <style>
  .goodsBody{
    margin-top: 20px;
  }
  </style>