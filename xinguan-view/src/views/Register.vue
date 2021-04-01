<template>
    <div class="register">
      <!--注册页面-->
      <div class="register">
        <!--注册容器-->
        <div class="register-container">
          <h1>防疫物资管理系统</h1>
          <!--注册表单-->
          <el-form class="register-form" :model="registerData" :rules="registerRules" ref="registerForm" label-width="0">
            <el-form-item label="" prop="username">
              <el-input v-model="registerData.username" placeholder="请输入用户名" prefix-icon="el-icon-user-solid"></el-input>
            </el-form-item>
            <el-form-item label="" prop="password">
              <el-input type="password" v-model="registerData.password" placeholder="请输入注册密码"  prefix-icon="el-icon-lock"></el-input>
            </el-form-item>
            <el-form-item label="" prop="captcha">
              <el-row>
                <el-col :span="18">
                  <el-input v-model="registerData.captcha" placeholder="请输入验证码" prefix-icon="el-icon-mobile"></el-input>
                </el-col>
                <el-col :span="6" style="height: 40px;">
                  <img src="http://127.0.0.1:7001/captcha" ref="captchaImage" @click="updateCaptcha">
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item class="register-btn">
              <el-button class="register-zc" type="primary" @click="submitForm('registerForm')">注册</el-button>
              <el-button @click="resetForm('registerForm')">重置</el-button>
            </el-form-item>
            <el-form-item prop="checked" class="form-check">
              <el-checkbox v-model="registerData.checked">
                <p>
                  阅读并接受
                  <a href="javascript:;">《系统用户协议》</a>
                  及
                  <a href="javascript:;">《系统隐私权保护声明》</a>
                </p>
              </el-checkbox>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
</template>

<script>
import { registerUser } from './../api/index';
export default {
  name: 'Register',
  data() {
    return {
      registerData: {
        username: '',
        password: '',
        captcha: '',
        checked: true
      },
      registerRules: {
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
        ],
        checked: [
          { required: true, message: '请阅读并同意协议', trigger: 'change' }
        ]
      }
    };
  },
  mounted() {
    this.updateCaptcha();
  },
  methods: {
    // 点击更新验证码
    updateCaptcha() {
      this.$refs.captchaImage.src = `http://127.0.0.1:7001/captcha?r=${Math.random()}`;
    },
    // 表单校验并提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          registerUser(this.registerData)
            .then(res => {
              if (res.status === 200) {
                this.$message.success(res.msg);
                this.$router.push('/login');
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
          // return false;
        }
      });
    },
    // 表单重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped lang="scss">
  @import "./../assets/css/mixin";

  .register {
    width: 100%;
    height: 100%;
    background: url('./../assets/images/login-bg.png') 0 0 no-repeat;
    background-size: cover;
    position: relative;
    .register-container {
      width: 560px;
      height: 400px;
      background-color: #FFFFFF;
      @include PosXYCenter;
      border-radius: 3px;
      h1{
        text-align: center;
        padding-top: 30px;
        padding-bottom: 30px;
        font-size: 36px;
        font-weight: 400;
        color: #787B3F;
      }
      .register-avatar {
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
      .register-form{
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
        .form-check{
          margin-bottom: 5px !important;
        }
        .register-btn{
          display: flex;
          justify-content: flex-end;
          .register-zc{
            background: $common-color;
            border: none;
            outline: none;
          }
        }
      }
    }
  }
</style>
