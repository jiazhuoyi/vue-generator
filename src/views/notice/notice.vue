<template>
  <div class="notice-container">
    <el-table
      :data="notices" border style="width: 90%">
      <el-table-column
        type="index"
        label="序号"
        width="80"
        align="center">
      </el-table-column>
      <el-table-column
        prop="date"
        label="日期"
        width="280"
        align="center">
      </el-table-column>
      <el-table-column
        prop="from"
        label="来自"
        width="200"
        align="center">
      </el-table-column>
      <el-table-column
        prop="content"
        align="center"
        label="消息内容">
      </el-table-column>
      <el-table-column
        label="操作"
        width="180"
        align="center">
        <template slot-scope="scope">
        <el-button type="primary" size="small">确定</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getNotices } from '@/api/notice';

export default {
  name: 'Notice',
  data() {
    return {
      notices: []
    };
  },
  async created() {
    const result = await getNotices();
    this.notices = result.notices;
  }
};
</script>

<style lang="stylus">
@import "~@/styles/index"
.notice-container
  padding: $main-padding
</style>
