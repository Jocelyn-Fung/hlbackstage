<template>
  <div class="login">
    <div class="container">
    <el-form
      :model="loginForm"
      :rules="rules"
      ref="loginForm"
      label-width="100px"
    >
    <img src="../assets/avatar.png" alt="" class="avatar">
      <el-form-item prop="username" >
        <el-input v-model="loginForm.username" placeholder="请输入用户名" prefix-icon="icon-user" clearable></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" placeholder="请输入3-12位数的密码" prefix-icon="icon-key" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="login-btn" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
    </div>
  </div>
</template>

<script>
// 引入用户登录api方法
import { userLogin } from '@/apis/user.js'
export default {
  data () {
    return {
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, min: 3, max: 12, message: '请输入3-12位数的密码', trigger: 'blur' }
        ]
      },
      loginForm: {
        username: '10086',
        password: '123456'
      }
    }
  },
  methods: {
    login () {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          let res = await userLogin(this.loginForm)
          // console.log(res)
          if (res.data.message === '登录成功') {
            localStorage.setItem('hl_back_token', res.data.data.token)
            this.$router.push({ path: '/' })
          }
        } else {
          this.$message.error('数据输入不合法，请重新输入')
        }
      })
    }
  }
}

</script>

<style lang='less' scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;
  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
    /deep/.el-form-item__content{
      margin-left:0px !important;
    }
  }
}
</style>
