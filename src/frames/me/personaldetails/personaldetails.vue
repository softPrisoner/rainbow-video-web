<template>
  <section class="child_page">
    <head-top crossover="个人信息"></head-top>
    <section class="privacy">
      <section class="privacy_top">
        <div class="privacy_child">
          <span>头像</span>
          <img :src="userHeader" alt="">
        </div>
        <div class="privacy_child">
          <span>昵称</span>
          <span>{{userInfo.pet_name}}</span>
        </div>
        <div class="privacy_child">
          <span>微信号</span>
          <span>{{userInfo.wx_id}}</span>
        </div>
        <router-link to="/qrcode">
          <div class="privacy_child">
            <span>二维码名片</span>
            <svg fill="#949494">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#QRcode"></use>
            </svg>
          </div>
        </router-link>
        <router-view></router-view>
        <div class="privacy_child">
          <span>我的地址</span>
          <span>{{userInfo.district}}</span>
        </div>
      </section>
      <section class="privacy_top">
        <div class="privacy_child">
          <span>性别</span>
          <span>{{userInfo.sex == 1 ? '女' : '男' }}</span>
        </div>
        <div class="privacy_child">
          <span>地区</span>
          <span>{{userInfo.district}}</span>
        </div>
        <div class="privacy_child">
          <span>个性签名</span>
          <span>{{userInfo.sdasd}}</span>
        </div>
      </section>
    </section>
  </section>
</template>

<script>
  import headTop from 'src/components/header/head'
  import {mapActions, mapState} from 'vuex'

  export default {
    data() {
      return {
        userinfo: {},			//用户信息
        userHeader: ''			//用户头像
      }
    },
    created() {
    },
    beforeMount() {

    },
    mounted() {
      //读取本地缓存从中获取数据
      let wx_id = localStorage.getItem('wx_id')
      // 这边用axios进行消息转发
      if (wx_id) {
        this.$axios.post(
          'http://192.168.43.52:8087/v1/user/get',
          {
            "wx_id": wx_id,
          }
        ).then(
          (response) => {
            if (response.status == 200) {
              let info = response.data
              alert(info.data.phone)
              if (info != null) {
                this.$store.state.userInfo = info.data
                alert(JSON.stringify(1111))
                this.userHeader = this.$store.state.userInfo.head_url
              }
            } else {
              this.$toast("获取信息失败");
            }
          }
        ).catch(error => {
          this.$toast("网络异常");
        })
      }
    },
    components: {
      headTop,
    },
    computed: {
      ...mapState([
        "userInfo",
      ]),
    },
    methods: {
      ...mapActions([
        'getUserInfo',
      ])
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../../../src/style/public";

  .child_page {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 203;
    background-color: #ebebeb;
  }

  .privacy {
    padding-top: 3.06933rem;

    .privacy_top {
      background: #fff;
      margin-bottom: 0.8533333333rem;
      padding: 0 0.5973333333rem;

      .privacy_child {
        @include justify(space-between);
        border-bottom: 1px solid #e2e2e2;
        align-items: center;
        position: relative;

        span {
          display: block;
          @include sizeColor(0.64rem, #333);
          @include align;
          line-height: 2.0266666667rem;
        }

        span + span {
          @include sizeColor(0.5546666667rem, #999);
        }

        img {
          display: block;
          @include widthHeight(2.7306666667rem, 2.7306666667rem);
          margin: 0.3413333333rem 0;
        }

        svg {
          display: block;
          @include widthHeight(0.768rem, 0.768rem);
        }
      }

      .privacy_child:last-child {
        border: 0;
      }
    }
  }
</style>
