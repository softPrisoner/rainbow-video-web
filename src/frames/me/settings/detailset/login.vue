<template>
  <section class="child_page">
    <head-top>
    </head-top>
    <section class="login">
      微信号/QQ/邮箱登录
      <div class="useid" :class="{'useid_border' : borderColor}">
        <div class="mark">帐号</div>
        <div class="input_mark">
          <input type="text" placeholder="请填写微信号/QQ号/邮箱" v-model="username" @input="inpuMark"
                 @click="accountsMark"/></div>
      </div>
      <div class="useid" :class="{'useid_border' : borderColortwo}">
        <div class="mark">密码</div>
        <div class="input_mark"><input type="password" placeholder="请填写密码" maxlength="16" @input="inpuCode"
                                       v-model="password" @click="accountsCode"/></div>
      </div>
      <div class="login_botton" @click="loginSuccess">
        登 录
      </div>
    </section>
    <router-link to="/registry">
      <div class="register-link">
        <font style="font-size: 0.622rem;float: right;margin-right: 1rem"> 还没有账号>注册?</font>
      </div>
    </router-link>
  </section>
</template>

<script>
  import headTop from 'src/components/header/head'

  export default {
    data() {
      return {
        username: "",		//帐号
        password: "",			//密码
        accounts: false,		//清除帐号
        code: false,			//清除密码
        borderColor: true,		//下边框颜色
        borderColortwo: false
      }
    },
    created() {

    },
    mounted() {

    },
    components: {
      headTop
    },
    computed: {},
    methods: {
      inpuMark() {
        this.inputaccounts ? this.accounts = true : this.accounts = false;
      },
      inpuCode() {
        this.inputcode ? this.code = true : this.code = false;
      },
      accountsMark() {
        this.borderColor = true;
        this.borderColortwo = false;
      },
      accountsCode() {
        this.borderColor = false;
        this.borderColortwo = true;
      },
      clearMark() {
        this.inputaccounts = "";
        this.accounts = false;
      },
      clearCode() {
        this.username = "";
        this.code = false;
      },
      loginSuccess() {
        // 这边用axios进行消息转发
        if (this.username) {
          this.$axios.post(
            'http://192.168.43.52:8087/v1/user/login'
            , {
              'username': this.username,
              'password': this.password
            }
          ).then(response => {
              if (response.data.status == "200") {
                // this.GET_USERINFO(res.user_info)
                // this.LOGIN_COVER(false)
                window.localStorage.setItem("wx_id", response.data.data.wx_id)
                this.$router.push('/dialogue');
              } else {
                this.$toast("用户名或密码不正确");
              }
            }
          ).catch(error => {
            this.$toast({
              message: '网络异常',
              position: 'bottom',
              duration: 2000,
              className: 'toasts'
            });
          });
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../../../style/public";

  .mint-toast {
    width: 15rem;
    height: 15rem;
    background-color: red !important;
  }

  .toasts {
    width: 15rem;
    height: 15rem;
  }

  .child_page {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 203;
    background-color: #fff;
  }

  .login {
    padding-top: 2.6rem;
    width: 14.3786666667rem;
    margin: 0 auto;

    .useid {
      width: 100%;
      border-bottom: 1px solid #d4d4d4;
      @include justify(flex-start);
      align-items: center;

      .mark {
        @include sizeColor(0.64rem, #333);
        letter-spacing: 0.5546666667rem;
        line-height: 2.0266666667rem;
        padding-left: 0.4266666667rem;
      }

      .input_mark {
        margin-right: 0.34rem;
        margin-left: 1rem;
        @include widthHeight(9.1rem, 2.0266666667rem);

        input {
          display: inline-block;
          width: 9.1rem;
          line-height: 2rem;
          @include sizeColor(0.64rem, #333);
        }
      }

      .svg_close {
        @include widthHeight(0.64rem, 0.64rem);

        svg {
          display: block;
          @include widthHeight(100%, 100%);
        }
      }
    }

    .register-link {
      float: right;
      margin-top: 6rem;
      alignment: center;
      align-items: center;
      text-align: center;
      font-size: 0.375rem;
    }

    .useid_border {
      border-color: #45c01a;
    }

    .login_botton {
      margin-top: 1.536rem;
      text-align: center;
      background: #1aad19;
      border: 1px solid #179e16;
      border-radius: 5px;
      line-height: 1.6rem;
      @include sizeColor(.7rem, #fff);
    }
  }
</style>
