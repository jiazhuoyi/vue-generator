<template>
  <div class="notice-container">
    <el-tabs v-model="activeTab" type="card">
      <el-tab-pane label="全部消息" name="-1">
      </el-tab-pane>
      <el-tab-pane label="未读消息" name="0"></el-tab-pane>
      <el-tab-pane label="已读消息" name="1"></el-tab-pane>
    </el-tabs>
    <el-table
      @selection-change="changeSelected"
      :data="notices">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        width="20">
        <template slot-scope="scope">
          <i class="icon" :class="{ unread: scope.row.status == 0 }"></i>
        </template>
      </el-table-column>
      <el-table-column
        label="消息内容">
        <template slot-scope="scope">
          <div class="content">
            <span class="title">{{scope.row.title}}</span>
            <span> - {{scope.row.content}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="日期"
        width="280"
        align="left">
        <template slot-scope="scope">
          <span>{{ scope.row.createAt | date }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="from"
        label="来自"
        width="200"
        align="left">
      </el-table-column>
    </el-table>
    <div class="bar">
      <div class="left">
        <el-button
        size="mini" v-if="activeTab != 1" @click="updateNotices">标记为已读</el-button>
        <el-button
          size="mini"
          type="danger" @click="deleteNotices">删除</el-button>
      </div>
      <div class="right">
        <el-pagination
          background
          :page-size="10"
          :current-page.sync="currentPage"
          @current-change="handlePaginationClick"
          layout="total, prev, pager, next"
          :total="this.totalCount">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getNotices, updateNotices, deleteNotices, getNoticeCount } from '@/api/notice';

export default {
  name: 'Notice',
  data() {
    return {
      activeTab: '0',
      notices: [],
      totalCount: 0,
      limit: 10,
      selected: [],
      currentPage: 1
    };
  },
  watch: {
    activeTab(newValue) {
      this.currentPage = 1;
      this.getNoticeList(newValue, 0, this.limit);
    }
  },
  mounted() {
    this.getNoticeList(this.activeTab, this.pageNumber - 1, this.limit);
  },
  methods: {
    changeSelected(val) {
      this.selected = val;
    },
    async updateNotices() {
      const notices = [];
      for (const selectItem of this.selected) {
        if (selectItem.status === 0) {
          notices.push(selectItem._id);
        }
      }
      if (notices.length === 0) {
        this.$message.error('未选中未读消息');
        return;
      }
      const result = await updateNotices({ notices });
      if (result.status === 200) {
        this.$message({
          message: '标记成功',
          type: 'success'
        });
        this.getNoticeList(this.activeTab, this.currentPage - 1, this.limit);
      }
    },
    async deleteNotices() {
      const notices = [];
      for (const selectItem of this.selected) {
        notices.push(selectItem._id);
      }
      if (notices.length === 0) {
        this.$message.error('未选中未读消息');
        return;
      }
      const result = await deleteNotices({ notices });
      if (result.status === 200) {
        this.$message({
          message: '删除成功',
          type: 'success'
        });
        this.getNoticeList(this.activeTab, this.currentPage - 1, this.limit);
      }
    },
    handlePaginationClick(val) {
      this.getNoticeList(this.activeTab, val - 1, this.limit);
    },
    async getNoticeList(status, pageNumber, limit) {
      const result = await getNotices({ status, pageNumber, limit });
      this.notices = result.notices;
      if (status != 0) {
        const result = await getNoticeCount();
        this.$store.commit('setTotalCount', result.totalCount);
      }
      this.totalCount = result.totalCount;
    }
  }
};
</script>

<style lang="stylus" scoped>
@import "~@/styles/index"

.unread
  background-color: #409EFF
.notice-container
  .icon
    display: inline-block
    width: 8px
    height: 8px
    border-radius: 50%
    vertical-align: center
  .content
    width: 100%
    overflow: hidden
    white-space: nowrap
    text-overflow: ellipsis
    .title
      font-weight: bold
  .bar
    display: flex
    margin-top: 20px
    padding-left: 67px
    justify-content: space-between
</style>
