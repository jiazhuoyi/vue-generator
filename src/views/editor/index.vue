<template>
  <div class="editor">
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

export default {
  name: 'Editor',
  components: {
    quillEditor
  },
  data() {
    return {
      editorOption: {},
      editorForm: {},
      article: {},
      articleRules: {
        title: { required: true, message: '请输入标题', trigger: 'blur' }
      }
    };
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

