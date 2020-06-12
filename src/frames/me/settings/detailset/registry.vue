<template>
  <div>
    <section class="child_page">
      <head-top class="qr-head-top" crossover="返回"></head-top>
      手机号注册
      <section class="registry">
        <div class="useid" :class="{'useid_border' : borderColor}">
          <div class="mark">昵称</div>
          <div class="input_mark"><input type="text" placeholder="例如 陈晨" v-model="pet_name" @input="inpuMark"
                                         @click="accountsMark"/></div>
        </div>
        <div class="useid" :class="{'useid_border' : borderColor}">
          <div class="mark" @click="selectCountry">国家/地区 <font color="#7fff00">中国+86</font></div>
        </div>
        <div class="useid" :class="{'useid_border' : borderColor}">
          <div class="mark">手机号</div>
          <div class="input_mark"><input type="text" placeholder="请填写手机号" v-model="phone " @input="inpuMark"
                                         @click="accountsMark"/></div>
        </div>
        <div class="useid" :class="{'useid_border' : borderColor}">
          <div class="mark">密码</div>
          <div class="input_mark"><input type="password" placeholder="填写密码" maxlength="16" @input="inpuCode"
                                         v-model="password" @click="accountsCode"/></div>
        </div>
        <div class="registry_botton" @click="registerSuccess">
          注册
        </div>
      </section>
    </section>
  </div>
</template>

<script>
  import headTop from 'src/components/header/head'

  export default {
    data() {
      return {
        pet_name: "",
        country: "",
        phone: "",
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
      headTop,
    },
    computed: {},
    methods: {
      selectCountry() {
        alert("你选择了中国")
      },
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
        this.inputcode = "";
        this.code = false;
      },
      registerSuccess() {
        //这边用axios进行消息转发
        if (this.pet_name && this.phone && this.password) {
          this.$axios.post('http://192.168.43.52:8087/v1/user/reg',
            {
              'pet_name': this.pet_name,
              'phone': this.phone,
              'password': this.password
            }
          ).then(
            (response) => {
              alert(response.data.status)
              if (response.data.status == "200") {
                this.LOGIN_COVER(false)
                alert("注册成功" + error)
                this.$router.push('/login')
              }
            }
          ).catch(error)
          {
            alert("用户名或密码不正确" + error)
          }
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../../../style/public";

  .child_page {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 203;
    background-color: #fff;
  }

  .registry {
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
        /*letter-spacing: 0.5546666667rem;*/
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

    .useid_border {
      border-color: #45c01a;
    }

    .registry_botton {
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
