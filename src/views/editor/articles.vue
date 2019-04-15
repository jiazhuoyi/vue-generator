<template>
  <div class="articles">
    <el-table
      :data="articles" border>
      <el-table-column
        type="index"
        label="序号"
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        align="center">
      </el-table-column>
      <el-table-column
        label="发布时间"
        width="200"
        align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createAt | date }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="200"
        align="center">
        <template slot-scope="scope">
          <el-button
            size="mini" @click="showDetail(scope.row.content)">查看</el-button>
          <el-button
            size="mini"
            type="danger" @click="deleteArticle(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getArticleList, deleteArticle } from '@/api/article';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

export default {
  data() {
    return {
      articles: [],
      data: {}
    };
  },
  async created() {
    const result = await getArticleList();
    this.articles = result.articles;
  },
  methods: {
    showDetail(content) {
      this.$alert(content, '预览文章', {
        dangerouslyUseHTMLString: true
      });
    },
    deleteArticle(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续？', '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        })
        .then(async () => {
          await deleteArticle(id);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          const result = await getArticleList();
          this.articles = result.articles;
        });
    }
  }
};
</script>

// <style lang="stylus" scoped>
// .articles
//    width: 90%
//    margin: 0 auto
// </style>
