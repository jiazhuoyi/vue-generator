<template>
  <div class="head-info">
    <el-card class="box-card">
      <div class="info">
        <div class="user item">
          <div class="photo">
            <avatar :url="$store.state.user.avatar" width="80" height="80"></avatar>
          </div>
          <div class="welcome">
            <div>中午好, {{$store.state.user.name}}</div>
            <div>root用户</div>
            <div>上次登录时间：{{$store.state.user.last_login | date}}</div>
          </div>
        </div>
        <div class="system item">
          统计
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import Avatar from '@/components/avatar';

export default {
  components: {
    Avatar
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
      vertical-align: baseline
      .photo
        display: inline-block
      .welcome
        display: inline-block
    .system
      text-align: right
</style>

