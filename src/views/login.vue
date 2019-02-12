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
          <el-form-item prop="account" :error="accountError">
            <el-input v-model="loginForm.account" placeholder="请输入用户名">
              <template slot="prepend">
                <i class="fa fa-user-circle-o"></i>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password" :error="passwordError">
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
      accountError: '',
      passwordError: '',
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
      this.accountError = '';
      this.passwordError = '';
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const result = await this.$store.dispatch('login', this.loginForm);
          if (result.accessToken) {
            this.$message({
              message: '登录成功',
              type: 'success'
            });
            localStorage.setItem('token_exp', new Date().getTime());
            const user = await this.$store.dispatch('getUserInfo', result.account);
            const ref = this.$route.query.redirect;
            const jumpPage = ref || '/';
            const userInfo = user.userInfo;
            userInfo.token = result.accessToken;
            this.$store.commit('setUser', user.userInfo);
            this.$router.replace({ path: jumpPage });
          }
          if (result.status === 41001) {
            this.accountError = result.msg;
          }
          if (result.status === 41002) {
            this.passwordError = result.msg;
          }
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

