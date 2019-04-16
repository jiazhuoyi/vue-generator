<template>
  <div class="head-info">
    <el-card class="box-card">
      <div class="info">
        <div class="user item">
          <div class="photo">
            <thumb :url="$store.state.user.avatar" width="80" height="80"></thumb>
          </div>
          <div class="content">
            <div class="welcome">中午好, {{$store.state.user.name}}</div>
            <div class="role">root用户 | 所有权限</div>
            <div class="last-login">上次登录时间：{{$store.state.user.last_login | date}}</div>
          </div>
        </div>
        <div class="system item">
          <div class="ip test">
            <span class="title">你的IP</span>
            <p class="content">{{$store.state.user.ip || '未知'}}</p>
          </div>
          <div class="count test">
            <span class="title">总登录次数</span>
            <p class="content">
              <countTo :startVal='0' :endVal='$store.state.user.visit_count'></countTo></p>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import Thumb from '@/components/thumb';
import countTo from 'vue-count-to';

export default {
  components: {
    Thumb,
    countTo
  }
};
</script>

<style lang="stylus" scoped>
.head-info
  .info
    display: flex
    .item
      flex: 1
    .user
      text-align: left
      display: flex
      align-items: flex-start
      .photo
        margin-right: 15px
      .content
        margin-right: 15px
        .welcome
          font-size: 20px
          line-height: 30px
        .role
          color: rgba(0,0,0,.45)
          line-height: 25px
        .last-login
          color: rgba(0,0,0,.45)
          line-height: 25px
    .system
      text-align: right
      .test
        .title
          display: inline-block
          color: rgba(0,0,0,.45)
          font-size: 18px
          margin-bottom: 10px
        .content
          font-size: 15px
          color: #41B883
          font-weight: 600
      .ip
        display: inline-block
        width: 25%
        text-align: center
      .count
        width: 25%
        display: inline-block
        text-align: center
</style>

