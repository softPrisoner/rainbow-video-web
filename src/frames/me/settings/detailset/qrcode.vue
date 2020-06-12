<template>
  <div>
    <head-top class="qr-head-top" crossover="二维码名片"></head-top>
    <div class="qr-template">
      <div class="qr-body">
        <div class="qr-top">
          <img src="./warn.png" width="1rem" height="1rem">
        </div>
        <div class="qr-content">
          <!--设置图片-->
          <!--:logoSrc="config.logo"-->
          <vue-qr class="vue-qr" :text="config.text" :logoScale="50" :size="300"></vue-qr>
        </div>
        <div class="qr-bottom">扫一扫上方的二维码图案，加我微信</div>
      </div>
    </div>
  </div>
</template>
<script>
  import VueQr from 'vue-qr'
  import headTop from 'src/components/header/head'

  export default {
    data() {
      /**
       * text: "wx_idasssdddeesss2214 2"
       *  string.split("%20")
       *  [wx_idassdddesss2214,2]
       *  callQRCode()
       *  base64
       *  base64
       */
      return {
        config: {
          logo: './warn.jpg',//默认二维码中间图片
          text: "http://www.baidu.com 2"
        }
      }
    },
    components: {
      VueQr,
      headTop
    },
    methods: {
      //adroidToJs Function
      callJsQRCode(wx_id) {
        if (!type) {
          this.toast("扫码失败");
          return;
        }
        this.$router.push("/addressbook/details/" + wx_id);
      }
    }
  }
</script>
<style scoped>
  .qr-head-top {
    margin-top: 0px;
  }

  .qr-template {
    float: left;
    margin-top: 2rem;
  }

  .qr-body {
    margin-top: 2rem;
    width: 14rem;
    height: 17rem;
    margin-left: 1rem;
    display: block;
    background-color: white;
    vertical-align: center;
    alignment: center;
    text-align: center;
  }

  .qr-top {
  }

  .qr-content {
    margin-top: 2rem;
    vertical-align: center;
    margin-left: 2rem;
    alignment: center;
    width: 10rem;
    height: 11rem;
    background: linear-gradient(to top right, #8BC34A 10%, #10aeff 70%, hotpink 10%);
  }

  .vue-qr {
    width: 5rem;
    height: 5rem;
    margin-top: 2.5rem;
    /*alignment: center;*/
    /*text-align: center;*/
    /*vertical-align: center;*/
  }

  .qr-bottom {
    margin-top: 1.375rem;
    font-size: 0.625rem;
    color: #9a9e9d;
    text-align: center;
  }

</style>
