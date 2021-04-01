<template>
  <!--登录页面-->
  <div class="login">
    <!--登录容器-->
    <div class="login-container">
      <h1 @click="isLogin">防疫物资管理系统</h1>
      <!--登录表单-->
      <el-form class="login-form" :model="loginData" :rules="loginRules" ref="loginForm" label-width="0">
        <el-form-item label="" prop="username">
          <el-input v-model="loginData.username" placeholder="请输入用户名" prefix-icon="el-icon-user-solid"></el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input type="password" v-model="loginData.password" placeholder="请输入登录密码"  prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <el-form-item label="" prop="captcha" class="captcha">
          <el-row>
            <el-col :span="18">
              <el-input v-model="loginData.captcha" placeholder="请输入验证码" prefix-icon="el-icon-mobile"></el-input>
            </el-col>
            <el-col :span="6" style="height: 40px;">
              <img src="http://127.0.0.1:7001/captcha" ref="captchaImage" @click="updateCaptcha">
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item class="tips">
          <a href="javascript:;" @click="navigateToRegister">没有账号？点击注册</a>
        </el-form-item>
        <el-form-item class="login-btn">
          <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { loginUser, isLogin } from './../api/index';
export default {
  name: 'Login',
  data() {
    return {
      loginData: {
        username: '',
        password: '',
        captcha: ''
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        captcha: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 4, max: 4, message: '长度为 4 个字符', trigger: 'blur' }
        ]
      }
    };
  },
  mounted() {
    this.updateCaptcha();
  },
  methods: {
    isLogin() {
      isLogin()
        .then(res => {
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    // 点击更新验证码
    updateCaptcha() {
      this.$refs.captchaImage.src = `http://127.0.0.1:7001/captcha?r=${Math.random()}`;
    },
    // 跳转到注册界面
    navigateToRegister() {
      this.$router.push('/register');
    },
    // 表单校验并提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          loginUser(this.loginData)
            .then(res => {
              console.log(res);
              if (res.status === 200) {
                sessionStorage.setItem('userInfo', JSON.stringify(res.data));
                sessionStorage.setItem('token', res.data.token);
                this.$message.success(res.msg);
                this.$router.push('/admin');
              } else {
                this.updateCaptcha();
                this.$message.error(res.msg);
              }
            })
            .catch((e) => {
              this.updateCaptcha();
              this.$message.error(e.message);
            });
        } else {
          this.$message({
            type: 'error',
            message: '数据格式不对'
          });
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
  @import "./../assets/css/mixin";

  .login {
    width: 100%;
    height: 100%;
    background: url('./../assets/images/login-bg.png') 0 0 no-repeat;
    background-size: cover;
    position: relative;
    .login-container {
      width: 560px;
      height: 400px;
      background-color: #FFFFFF;
      @include PosXYCenter;
      border-radius: 3px;
      h1{
        text-align: center;
        padding-top: 30px;
        font-size: 36px;
        font-weight: 400;
        color: #787B3F;
      }
      .login-avatar {
        width: 130px;
        height: 130px;
        border: 1px solid #EEEEEE;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        margin: -65px auto;
        background-color: #FFFFFF;

        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-color: #EEEEEE;
        }
      }
      .login-form{
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
        .captcha {
          margin-bottom: 5px;
          img{
            width: 130px;
            height: 40px;
          }
          ::v-deep .el-form-item__content {
            line-height: 0;
          }
        }
        .tips{
          a{
            color: #007FE1;
          }
        }
        .login-btn{
          width: 100%;
          .el-button{
            width: 100%;
            background: $common-color;
            border: none;
            outline: none;
            font-size: 16px;
          }
        }
      }
    }
  }
</style>
