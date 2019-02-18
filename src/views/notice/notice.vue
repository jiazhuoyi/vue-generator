<template>
  <div class="notice">
    <el-table
      :data="notices" style="width: 80%">
      <el-table-column
        type="index"
        label="序号"
        width="80">
      </el-table-column>
      <el-table-column
        prop="date"
        label="日期"
        width="280">
      </el-table-column>
      <el-table-column
        prop="from"
        label="来自"
        width="200">
      </el-table-column>
      <el-table-column
        prop="content"
        label="消息内容">
      </el-table-column>
      <el-table-column
        label="操作"
        width="180">
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
.article
  font-size: 100px
</style>
