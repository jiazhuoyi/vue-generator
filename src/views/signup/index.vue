<template>
  <div class="signup">
    <div class="signup-form">
      <el-card>
        <div slot="header">
          <span>注册账户</span>
        </div>
        <el-form
          :model="signupForm"
          status-icon
          ref="signupForm"
          :rules="signupRules">
          <el-form-item prop="account" :error="accountError">
            <el-input v-model="signupForm.account" placeholder="请输入用户名">
              <template slot="prepend">
                <i class="iconfont icon-icon-test"></i>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="firstPassword" :error="passwordError">
            <el-input v-model="signupForm.firstPassword" type="password" placeholder="请输入密码">
              <template slot="prepend">
                <i class="iconfont icon-Password"></i>
              </template>
            </el-input>
          </el-form-item>  
          <el-form-item prop="secondPassword" :error="passwordError">
            <el-input v-model="signupForm.secondPassword" type="password" placeholder="请确认密码">
              <template slot="prepend">
                <i class="iconfont icon-Password"></i>
              </template>
            </el-input>
          </el-form-item>         
          <el-form-item>
            <el-row>
              <el-col :span="14">
                <el-button
                  type="primary"
                  style="width:100%;"
                  @click="submitForm('signupForm')">
                  注册
                </el-button>
              </el-col>
              <el-col :span="10" class="back">
                <router-link to="/login">使用已有账户登录</router-link>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script>
import { signup } from '@/api/user';

export default {
  data() {
    const validateAccount = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      }
      callback();
    };
    const validateFirstPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      }
      callback();
    };
    const validateSecondPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请确认密码'));
      }
      if(value !== this.signupForm.firstPassword) {
        callback(new Error('两次密码不一致'));
      }
      callback();
    };
    return {
      signupForm: {
        account: '',
        firstPassword: '',
        secondPassword: ''
      },
      accountError: '',
      passwordError: '',
      signupRules: {
        account: [
          { validator: validateAccount, trigger: 'blur' }
        ],
        firstPassword: [
          { validator: validateFirstPassword, trigger: 'blur' }
        ],
        secondPassword: [
          { validator: validateSecondPassword, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        try {
          if (valid) {
            const result = await signup(this.signupForm);
            if (result) {
              this.$message({
                message: '注册成功',
                type: 'success'
              });
              this.$router.push({ path: '/login' });
            }
          }
        } catch (error) {
          if (error.status === 41001) {
            this.accountError = error.msg;
          }
          if (error.status === 41002) {
            this.passwordError = error.msg;
          }
        }
        return false;
      });
    }
  }
};
</script>

<style lang="stylus">
.signup
  width: 100%
  height: 100%
  position: relative
  background-color: #f0f2f5
  &-form
    position: absolute
    left: 50%
    top: 50%
    transform: translate(-50%, -50%)
    width: 20%
    .title-container
      font-size: 50px
      color: #eeeeee
    .tabs
      text-align: center
      color: rgba(0,0,0,.45)
      font-size: 20px
      .line
        width: 1px
        height: 24px
        margin: 0 35px 0 42px
        border: 1px solid #e0e0e0
    .back
      text-align: right
      a
        font-size: 10px
        color: rgba(0,0,0,.45)
</style>

