<template>
  <div class="info">
    <el-card class="box-card" shadow="always">
      <div slot="header" class="header">
        <span>个人信息</span>
        <router-link to="/my/update-info">
          <el-button style="float: right; padding: 3px 0" type="text">
            编辑资料
          </el-button>
        </router-link>
      </div>
      <el-row>
        <el-col :span="8">
          <div class="img">
            <!-- <img class="avatar" :src="user.avatar"> -->
            <avatar :url="user.avatar" width="160" height="160"></avatar>
          </div>
        </el-col>
        <el-col :span="16" style="text-align: left">
          <p>账号：{{user.account}}</p>
          <p>昵称：{{user.name}}</p>
          <p>手机：{{user.tel}}</p>
          <p>邮箱：{{user.email}}</p>
          <p>角色：root用户</p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import Avatar from '@/components/avatar';

export default {
  data() {
    return {
      tel: '17628283184',
      user: {
      }
    };
  },
  components: {
    Avatar
  },
  async created() {
    try {
      const result = await this.$store.dispatch('getUserInfo', this.$store.state.user.state);
      this.user = result.userInfo;
    } catch (error) {
      this.$message({
        message: error.msg,
        type: 'error'
      });
    }
  }
};
</script>


<style lang="stylus">
.info
  .box-card
    width: 50%
    margin: auto
    .header
      text-align: left
    .img
      .avatar
        width: 50%
    .info-item
      line-height: 30px
</style>

