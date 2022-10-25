<template>
  <div>
    <!-- 后续编辑 :
        其实图片方面,还是有点没想通的 居然是在点击上传的时候就已经上传了
        我还以为是什么自己上传的,不过也一样了,上传东西也有请求头什么的设置,可以供你使用 能做到一样的事就行
    -->
    <span>商品图片</span>
    <!-- 终于出现了按钮 点击上传 -->
    <!-- 点击之后弹出一个页面,选中自己要上传的图片 -->
    <div class="imgPageBody">
      <!-- 在底部展示一个缩略图,然后点击放大 再来一个删除的按钮 -->
      <el-upload
        action="http://127.0.0.1:8888/api/private/v1/upload"
        :headers="headersObj"
        ref="upload"
        :on-remove="remove"
        :on-preview="onClickItemImg"
        :on-success="imgUploadSuccess"
        :auto-upload="true"
        multiple
        :limit="5"
        list-type="picture-card"
        :file-list="uploadImgList">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog
          title="图片详情"
          :visible="visible"
          width="30%"
          @close="visible=false"
          >
          <img width="100%" :src="dialogImg" alt="">
        </el-dialog>
    </div>
  </div>
</template>

<script>
import MyButton from '@/components/myButton/index.vue';
export default {
    name: "goodsImage",
    data() {
        return {
          // 图片收集的容器
          uploadImgList:[],
          //默认隐藏,点击图片时,显示放大的效果
          visible:false,
          dialogImg:'',
          // 请求头的信息  这些都是上传图片组件所需的数据
          headersObj:{
            Authorization:window.sessionStorage.getItem('token')
          }
        };
    },
    methods: {
      onClickUploadImg(){
      
      },
      // 删除回调
      remove(item,list){
      
      },
      //点击放大 
      onClickItemImg(item){
        this.dialogImg = item.url;
        this.visible = true;
      
      },
      // 上传后的回调
      imgUploadSuccess(response){
        if(response.meta.status==200){
          this.$store.dispatch('getImgUrl',response.data);
          //图片给 vuex 中
        }
      
      }
    },
    props:{
      addObj:Object
    },
    watch: {
      addObj:function(nowV,oldV){
        let {pics} = nowV;
        pics.forEach(img=>{
          let num = 0;
          this.uploadImgList.push({name:`img${num++}`,url:img.pics_min_url})
        })
      }
    },
    components: { MyButton }
}
</script>

<style>
.imgPageBody{
  margin-top: 20px;
}
</style>