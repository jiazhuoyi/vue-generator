<template>
  <div class="update-password">
    <el-card class="box-card" shadow="always">
      <div slot="header" class="header">
        <span>修改密码</span>
      </div>
      <el-form
          class="password-form"
          :model="passwordForm"
          status-icon
          label-width="80px"
          ref="passwordForm"
          :rules="passwordRules">
          <el-form-item prop="oldPassword" label="原密码">
            <el-input v-model="passwordForm.oldPassword" type="password" placeholder="请输入原密码">
            </el-input>
          </el-form-item>
          <el-form-item prop="newPassword" label="新密码">
            <el-input v-model="passwordForm.newPassword" type="password" placeholder="请输入密码">
            </el-input>
          </el-form-item>
          <el-form-item prop="checkPassword" label="再次确认">
            <el-input v-model="passwordForm.checkPassword" type="password" placeholder="请确认密码">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              style="width:50%;"
              @click="submitPassForm('passwordForm')">
              保存
            </el-button>
          </el-form-item>
        </el-form>
    </el-card>
  </div>
</template>

<script>
import { updatePassword } from '@/api/user';

export default {
  data() {
    const validateCheckPassword = (rule, value, callback) => {
      if (value !== this.passwordForm.newPassword) {
        callback(new Error('两次输入的密码不一致'));
      }
      callback();
    };
    return {
      passwordForm: {
        oldPassword: '',
        newPassword: '',
        checkPassword: ''
      },
      passwordRules: {
        oldPassword: [
          { required: true, message: '请输入原密码', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        checkPassword: [
          { required: true, message: '请再次确认', trigger: 'blur' },
          { validator: validateCheckPassword, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitPassForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        try {
          if (valid) {
            const result = await updatePassword(this.passwordForm);
            if (result) {
              this.$message({
                message: '修改成功',
                type: 'success'
              });
              this.$router.push({ path: '/my/info' });
            }
          }
          return false;
        } catch (error) {
          this.$message({
            message: error.msg,
            type: 'error'
          });
          return false;
        }
      });
    }
  }
};
</script>


<style lang="stylus">
.update-password
  .box-card
    width: 50%
    margin: auto
    .header
      text-align: left
    .password-form
      width: 50%
      margin: auto
</style>
