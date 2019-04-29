<template>
  <div class="editor">
    <!-- <div class="upload"></div> -->
    <el-upload
      :action="domain"
      :show-file-list="false"
      :data="postData"
      :on-success="handleSuccess"
      :before-upload="beforeUpload"
      :on-error="handleError">
    </el-upload>
    <el-form
     :model="article"
     :rules="articleRules"
     ref="editorForm"
     label-width="80px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="article.title">
      </el-input>
      </el-form-item>
      <el-form-item prop="content" label="内容">
        <quill-editor
          v-model="article.content"
          ref="editor"
          :options="editorOption">
        </quill-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
        @click="submitEditorForm('editorForm')">立即发布</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor';
import { sumbitArticle } from '@/api/article';
import { getQiniuToken } from '@/api/user';

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  [{ header: 1 }, { header: 2 }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }],
  [{ indent: '-1' }, { indent: '+1' }],
  [{ direction: 'rtl' }],
  [{ size: ['small', false, 'large', 'huge'] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],
  ['link', 'image', 'video'],
  ['clean']
];
export default {
  name: 'Editor',
  components: {
    quillEditor
  },
  data() {
    return {
      loading: null,
      editorOption: {
        placeholder: '请输入文章内容',
        theme: 'snow',
        modules: {
          toolbar: {
            container: toolbarOptions,
            handlers: {
              image: (value) => {
                if (value) {
                  document.querySelector('.el-upload__input').click();
                } else {
                  this.quill.format('image', false);
                }
              }
            }
          }
        }
      },
      editorForm: {},
      article: {},
      articleRules: {
        title: { required: true, message: '请输入标题', trigger: 'blur' }
      },
      domain: 'https://upload.qiniup.com',
      postData: {}
    };
  },
  async mounted() {
    const result = await getQiniuToken();
    this.postData.token = result.token;
  },
  methods: {
    submitEditorForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // XXXXX 提交请求
          const result = await sumbitArticle({ article: this.article });
          if (result) {
            this.$message({
              message: '发布成功',
              type: 'success'
            });
            this.$router.push({ path: '/articles' });
          }
        }
      });
    },
    beforeUpload() {
      this.loading = this.$loading({
        text: '图片上传中',
        spinner: 'el-icon-loading'
      });
    },
    handleSuccess(res) {
      console.log('----res:', res);
      const quill = this.$refs.editor.quill;
      if (res.key) {
        const length = quill.getSelection().index;
        quill.insertEmbed(length,
          'image',
          `https://cdn.jiazhuoyi.cn/${res.key}`);
        quill.setSelection(length + 1);
      } else {
        this.$message.error('图片插入失败');
      }
      this.loading.close();
      console.log('quill:', quill);
    },
    handleError() {
      this.loading.close();
      this.$message.error('图片插入失败');
    }
  }
};
</script>

<style lang="stylus" scoped>
.editor >>> .ql-container
  min-height: 400px
.editor >>> .ql-toolbar
  line-height: 22px
.editor
  width: 80%
  text-align: left
  &-view
    width: 100%
    min-height: 100px
    border: 1px solid #ccc
    padding-top: 10px
</style>

