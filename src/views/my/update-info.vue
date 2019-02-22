<template>
  <div class="update-info">
    <el-card class="box-card" shadow="always">
      <div slot="header" class="header">
        <span>个人信息</span>
      </div>
      <el-row>
        <el-col :span="8">
          <div class="img">
            <img class="avatar" src="../../../static/icons/avatar.png">
          </div>
          <el-button icon="el-icon-edit">修改头像</el-button>
        </el-col>
        <el-col :span="16" style="text-align: left">
          <el-form
          class="info-form"
          :model="infoForm"
          status-icon
          ref="infoForm"
          label-width="60px"
          :rules="infoRules">
            <el-form-item label="账号">
              <span>{{infoForm.account}}</span>
            </el-form-item>
            <el-form-item label="昵称" prop="name" :error="nameError">
              <el-input v-model="infoForm.name">
              </el-input>
            </el-form-item>
            <el-form-item label="手机" prop="tel" :error="telError">
              <el-input v-model="infoForm.tel">
              </el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email" :error="emailError">
              <el-input v-model="infoForm.email">
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-row>
                <el-button
                  type="primary"
                  @click="submitForm('infoForm')">
                  保存
                </el-button>
                <router-link to="/my/info">
                  <el-button>
                    取消
                  </el-button>
                </router-link>
              </el-row>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import { updateUserInfo } from '@/api/user';

export default {
  data() {
    const validateTel = (rule, value, callback) => {
      if (!(/^1[34578]\d{9}$/.test(value))) {
        callback(new Error('请输入正确的电话号码'));
      }
      callback();
    };
    return {
      infoForm: {},
      telError: '',
      emailError: '',
      nameError: '',
      infoRules: {
        tel: [
          { required: true, message: '请输入手机', trigger: 'blur' },
          { validator: validateTel, trigger: ['blur', 'change'] }
        ],
        email: [
          { required: true, message: '请输入email', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        name: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 2, max: 10, message: '请输入2~10字之内的昵称', trigger: ['blur', 'change'] }
        ]
      }
    };
  },
  async created() {
    const result = await this.$store.dispatch('getUserInfo', this.$store.state.user.state);
    this.infoForm = result.userInfo;
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const result = await updateUserInfo(this.infoForm);
          if (result) {
            this.$message({
              message: '保存成功',
              type: 'success'
            });
            this.$router.push({ path: '/my/info' });
          }
        }
        return false;
      });
    }
  }
};
</script>

<style lang="stylus">
.update-info
  .box-card
    width: 50%
    margin: auto
    .header
      text-align: left
    .img
      .avatar
        width: 50%
    .info-form
      width: 70%
</style>

