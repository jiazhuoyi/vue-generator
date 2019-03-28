<template>
  <div class="bread-crumb">
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item
        v-for="item in breadlist"
        :key="item.path">
        {{item.meta.title}}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data() {
    return {
      breadlist: []
    };
  },
  watch: {
    $route() {
      this.getBreadCrumb();
    }
  },
  mounted() {
    this.getBreadCrumb();
  },
  methods: {
    getBreadCrumb() {
      this.breadlist = this.$route.matched
       .filter(item => (item.path != '/dashboard') && item.meta.title);
      console.log('route:', this.$route.matched);
    }
  }
}
</script>

<style lang="stylus" scoped>
.bread-crumb >>> .is-link
  font-weight: unset
.bread-crumb
  border-bottom: 1px solid #e8e8e8
  padding-bottom: 10px
  margin-bottom: 20px
</style>

