<template>
  <div class="login">
    <div class="login-form">
      <div class="title-container">
        <p>Vue-generator</p>
      </div>
      <el-card>
        <div slot="header">
          <span>欢迎登录</span>
        </div>
        <el-form
          :model="loginForm"
          status-icon
          ref="loginForm"
          :rules="loginRules">
          <el-form-item prop="account">
            <el-input v-model="loginForm.account" placeholder="请输入用户名">
              <template slot="prepend">
                <i class="fa fa-user-circle-o"></i>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" type="password" placeholder="请输入密码">
              <template slot="prepend">
                <i class="fa fa-key"></i>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              style="width:100%;"
              @click="submitForm('loginForm')">
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    const validateAccount = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      }
      callback();
    };
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      }
      callback();
    };
    return {
      loginForm: {
        account: '',
        password: ''
      },
      loginRules: {
        account: [
          { validator: validateAccount, trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch('login', this.loginForm).then(() => {
            this.$message({
              message: '登录成功',
              type: 'success'
            });
            const ref = this.$route.query.redirect;
            const jumpPage = ref || '/';
            this.$router.replace({ path: jumpPage });
          });
        }
        return false;
      });
    }
  }
};
</script>

<style lang="stylus">
.login
  width: 100%
  height: 100%
  background: url('../../static/img/bg.jpg')
  background-size: cover
  background-position: center
  position: relative
  &-form
    position: absolute
    right: 160px
    top: 50%
    transform: translateY(-70%)
    width: 350px
    .title-container
      font-size: 50px
      color: #eee
</style>

