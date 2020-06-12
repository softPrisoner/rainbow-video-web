<template>
  <section class="child_page">
    <head-top crossover="详细资料"></head-top>
    <div class="details">
      <div class="details_li">
        <div class="details_left">
          <img :src="this.infor.head_url" alt="">
        </div>
        <div class="details_right">
          <div class="details_right_top">
            <span>{{infor.remarks ? infor.remarks : infor.pet_name}}</span>
            <div class="sexsvg">
              <svg>
                <use xmlns:xlink="http://www.w3.org/1999/xlink" :href="infor.sex == 0 ? '#boy' : '#girl'"></use>
              </svg>
            </div>
          </div>
          <div class="details_right_obt">
            <div>微信号：{{infor.wx_id}}</div>
          </div>
          <div class="details_right_obt">
            <div>
              地区: {{infor.district}}
            </div>
          </div>
        </div>
      </div>
      <div class="details_person">
        <div class="person_photo">
          <router-link to='' class="details_person_a">
            <div class="person_photo_left">
              朋友圈
            </div>
            <div class="person_photo_right clear">
              <img :src="value" alt="" v-for="value in gallery">
            </div>
          </router-link>
        </div>
        <div class="details_person_more">
          <router-link to='/addressbook/details/more' class="clickmore">
            更多信息
          </router-link>
        </div>
      </div>
      <!--//这里需要判断是不是好友如果是好友的话显示sendmessage-->
      <div class="sendmessage" v-if="true">
        <router-link :to="`/singlechat/${infor.wx_id}`" class="send" @click.native="enterdDialogue">
          发消息
        </router-link>
      </div>
      <div class="sendmessage" v-else="isFriend" @click="addFriend">
        添加好友
      </div>
    </div>
    <transition name="router-show">
      <router-view></router-view>
    </transition>
  </section>
</template>
<script>
  import headTop from 'src/components/header/head'
  import {mapMutations, mapState} from 'vuex'

  export default {
    data() {
      return {
        gallery: [],		//个人相册
        isFriend: false  //判断是否是朋友，如果是朋友的话，显示发送消息，非朋友显示添加好友
      }
    },
    created() {

    },
    mounted() {
      //这里直接分割字符串
      this.gallery = this.infor.gallery;
    },
    components: {
      headTop,
    },
    computed: {
      ...mapState([
        "infor", "contactList", "conversine"
      ]),

    },
    methods: {
      ...mapMutations([
        "SAVE_DIALOGUE",
      ]),
      addFriend() {
        this.$axios.post("http://192.168.43.17:8087/v1/user/friend/add", {
          "wx_id": window.localStorage.getItem("wx_id"),
          "friend_wx_id": "wx232323"
        }).then(response => {
            if (response.status == 200) {
            } else {
              this.$toast("发送添加朋友消息失败！");
            }
          }
        ).catch(error => {
          this.$toast("网络异常 " + error)
        })

      },
      enterdDialogue() {
        this.SAVE_DIALOGUE(this.infor);
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../../style/public";

  .router-show-enter-active, .router-show-leave-active {
    transition: all .4s;
  }

  .router-show-enter, .router-show-leave-active {
    transform: translateX(100%)
  }

  .child_page {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 203;
    background-color: #ebebeb;
  }

  .details {
    width: 100%;
    padding-top: 2.9226633rem;

    .details_li {
      padding: 0.512rem 0.5973333333rem;
      background: #fff;
      margin-bottom: 0.8533333333rem;
      @include justify(flex-start);

      .details_left {
        margin-right: 1.024rem;

        img {
          display: block;
          @include widthHeight(2.7306666667rem, 2.7306666667rem);
        }
      }

      .details_right {
        .details_right_top {
          @include justify(flex-start);
          align-items: center;
          margin-top: 0.256rem;
          margin-bottom: 0.4266666667rem;

          span {
            display: block;
            @include sizeColor(0.64rem, #000);
            margin-right: 0.4266666667rem;
          }

          .sexsvg {
            @include widthHeight(.64rem, .90rem);
            @include align(top);

            svg {
              @include widthHeight(100%, .64rem);
            }
          }
        }

        .details_right_obt {
          @include sizeColor(0.512rem, #666);
        }
      }

      .setnote {
        display: block;
        width: 100%;
        @include sizeColor(0.64rem, #000);
      }

    }

    .details_person {
      padding: 0.512rem 0.5973333333rem;
      background: #fff;

      .details_person_top {
        @include justify(flex-start);
        border-bottom: 1px solid #e2e2e2;
        padding-bottom: 0.6826666667rem;

        .area_details_left {
          @include sizeColor(0.64rem, #000);
        }

        .area_details_right {
          @include sizeColor(0.512rem, #666);
          margin-left: 2.432rem;
          @include align(center);
        }

      }

      .details_person_more {
        .clickmore {
          display: block;
          width: 100%;
          padding-top: 0.7253333333rem;
          @include sizeColor(0.64rem, #000);
        }
      }

      .person_photo {
        border-bottom: 1px solid #e2e2e2;

        .details_person_a {
          display: block;
          @include justify(flex-start);

          .person_photo_left {
            @include sizeColor(0.64rem, #000);
            @include align(center);
          }

          .person_photo_right {
            margin-left: 1.0666666667rem;
            padding: 0.3413333333rem 0;

            img {
              float: left;
              @include widthHeight(2.56rem, 2.56rem);
              margin-right: 16px;
            }
          }
        }
      }
    }

    .sendmessage {
      align-items: center;
      alignment: center;
      width: 14.1653333333rem;
      margin: 0.8533333333rem 0rem 0rem auto;

      .send {
        display: block;
        border-radius: 5px;
        text-align: center;
        width: 14.1226666667rem;
        border: 1px solid #3e8d3e;
        background: #1aad16;
        @include sizeColor(0.7253333333rem, #fff);
        letter-spacing: 4px;
        line-height: 2.0053333333rem;
      }
    }
  }
</style>
