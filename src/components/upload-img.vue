<template>
  <div class="photo">
    <el-upload class="avatar-uploader"
      :action="domain"
      :show-file-list = "false"
      :data= "postData"
      :on-success="handleSuccess"
      :on-error="handleError">
      <div v-if="isImage" class="uploader-img">
        <img v-if="imgUrl" :src="imgUrl" alt="" class="avatar-img">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </div>
      <el-button v-else size="small" type="primary">点击上传</el-button>
    </el-upload>
  </div>
</template>

<script>
import { getQiniuToken } from '@/api/user';

export default {
  props: {
    isImage: {
      type: Boolean,
      default: true
    },
    onSuccess: Function
  },
  data() {
    return {
      imgUrl: '',
      domain: 'https://upload.qiniup.com',
      postData: {}
    };
  },
  methods: {
    handleSuccess(req) {
      this.imgUrl = `https://cdn.jiazhuoyi.cn/${req.key}`;
      this.onSuccess(req);
    },
    handleError() {
      this.$message({
        message: '上传失败',
        type: 'error'
      });
    }
  },
  async created() {
    try {
      const result = await getQiniuToken();
      this.postData.token = result.token;
    } catch (error) {
      this.$message({
        message: error.msg,
        type: 'error'
      });
    }
  }
};
</script>


<style lang="stylus">
.avatar-uploader
  .el-upload
    border-radius: 6px;
    cursor: pointer;
    position: relative;
  .uploader-img
    position: relative
    width: 178px;
    height: 178px;
    line-height: 178px;
    .avatar-uploader-icon
      border: 1px dashed #d9d9d9;
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    .avatar-uploader-icon:hover
      border-color: #409EFF;
    .avatar-img
      width: 178px;
      height: 178px;
      display: block;
</style>

