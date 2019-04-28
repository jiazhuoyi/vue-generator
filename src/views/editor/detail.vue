<template>
  <div class="article-detail">
    <!-- <div class="ql-container ql-snow">
      <div class="ql-editor" v-html="article.content"></div>
    </div> -->
    <div class="bar">
      <div class="title">{{article.title}}</div>
      <div class="info">
        <span class="author">作者：{{article.account}}</span>
        <span class="date">发表时间：{{article.createAt | date}}</span>
      </div>
    </div>
    <div class="ql-container ql-snow">
      <div class="ql-editor" v-html="article.content"></div>
    </div>
  </div>
</template>

<script>
import { getArticleDetail } from '@/api/article';
export default {
  data() {
    return {
      article: {}
    };
  },
  async mounted() {
    const result = await getArticleDetail(this.$route.params.id);
    this.article = result.article;
    console.log('009090:', result);
    console.log('article:', this.article);
  }
};
</script>

<style lang="stylus" scoped>
.article-detail >>> .ql-snow
  border: 0
.article-detail >>> .ql-editor
  padding: 0
.article-detail
  width: 80%
  margin: 0 auto
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1)
  border: 1px solid #ebeef5
  padding: 20px
  .bar
    width: 100%
    border-bottom: 1px solid #e8e8e8
    margin-bottom: 20px
    .title
      line-height: 30px
      font-size: 30px
      margin-bottom: 30px
    .info
      text-align: right
      color: #C1C1C1
      font-size: 18px
      line-height: 30px
      .date
        float: left
</style>


