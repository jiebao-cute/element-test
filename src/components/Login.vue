<template>
  <div id="login">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="main">
          </div>
          <div class="form">
            <h3 @click="ShowRegister">创建账户</h3>
            <transition name="fade">
            <div class="register" :class ="{show: isShowRegister}">
              <form>
              <input type="text" placeholder="用户名" v-model="register.username" ></input>
              <input type="password" placeholder="密码" autocomplete=“off” v-model="register.password" ></input>
              </form>
              <p v-bind:class="{error: register.isError}">{{ register.notice }}</p>
              <div class="button" @click="onRegister">创建账号</div>
            </div>
            </transition>
            <h3 @click="ShowLogin">登录</h3>
            <transition name="fade">
            <div class="login" :class ="{show: isShowLogin}">
              <form>
              <input type="text" placeholder="用户名" v-model="login.username"></input>
              <input type="password" placeholder="密码" autocomplete=“off” v-model="login.password" ></input>
              </form>
              <p v-bind:class="{error: login.isError}">{{ login.notice }}</p>
              <div class="button" @click="onLogin" >登录</div>
            </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      isShowLogin: false,
      isShowRegister: true,
      register: {
        username: '',
        password: '',
        notice: '创建账号后，请记住用户名和密码',
        isError: false
      },
      login: {
        username: '',
        password: '',
        notice: '输入用户名和密码',
        isError: false
      },
    }
  },
  methods: {
    ShowRegister() {
      this.isShowLogin = false;
      this.isShowRegister = true;
    },
    ShowLogin() {
      this.isShowLogin = true;
      this.isShowRegister = false;
    },
    onRegister() {
      if (!/^[\w\u4e00-\u9fa5]{3,15}$/.test(this.register.username)) {
        this.register.isError = true;
        this.register.notice = "用户名3~15个字符，仅限于字母数字下划线中文"
        return
      }
      if (!/^.{6,16}$/.test(this.register.password)) {
        this.register.isError = true
        this.register.notice = '密码长度为6~16个字符'
        return
      }
      this.register.isError = false;
      this.register.notice = '';
      alert(`"用户名："${this.register.username} + "密码：" ${this.register.password}`)
    },
    onLogin() {
      if (!/^[\w\u4e00-\u9fa5]{3,15}$/.test(this.login.username)) {
        this.login.isError = true;
        this.login.notice = "用户名3~15个字符，仅限于字母数字下划线中文"
        return
      }
      if (!/^.{6,16}$/.test(this.login.password)) {
        this.login.isError = true
        this.login.notice = '密码长度为6~16个字符'
        return
      }
      this.login.isError = false;
      this.login.notice = '';
      alert(`"用户名："${this.login.username} + "密码：" ${this.login.password}`)
    }
  }
}
</script>

<style lang="less" scoped>
.modal-mask {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .7);
  display: table;
  transition: opacity .3s ease;

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;

    .modal-container {
      width: 800px;
      height: 500px;
      margin: 0 auto;
      background-color: #fff;
      border-radius: 2px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
      transition: all .3s ease;
      font-family: Helvetica, Arial, sans-serif;
      display: flex;

      .main {
        flex: 1;
        background: #f7f7f7 url(../assets/icons/kanshu3.svg) center center no-repeat;
        background-size: contain;
      }

      .form {
        width: 270px;
        border-left: 1px solid #ccc;
        overflow: hidden;
        h3 {
          padding: 10px 20px;
          border-top: 1px solid #eee;
          font-size: 16px;
          font-weight: normal;
          text-align: center;
          cursor: pointer;
          margin-top: -1px;
          &:nth-of-type(2) {
            border-bottom: 1px solid #eee;
          }
        }

        .login, .register {
          padding: 0 20px;
          border-top: 1px solid #eee;
          height: 0;
          overflow: hidden;
          transition: height .4s;
          &.show {
            height: 193px;
          }
          input {
            display: block;
            width: 100%;
            height: 35px;
            line-height: 35px;
            padding: 0 6px;
            margin-top: 10px;
            border-radius: 4px;
            border: 1px solid #ccc;
            outline: none;
            font-size: 14px;
          }

          input:focus {
            border: 3px solid #AAE6D0;
          }

          p {
            font-size: 12px;
            margin-top: 10px;
            color: #444;
          }

          .error {
            color: red;
          }
        }

        .login {
          border-top: 0;
        }

        .button {
          background-color: #2bb964;
          height: 36px;
          line-height: 36px;
          text-align: center;
          font-weight: bold;
          color: #ffffff;
          border-radius: 4px;
          margin-top: 18px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
