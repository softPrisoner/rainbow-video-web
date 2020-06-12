<template>
  <section class="dialogue">
    <!-- 头部 -->
    <head-top logo-part="true" search-part="true" add="true"></head-top>
    <div class="dialogue_con">
      <!-- 电脑登录 -->
      <section class="computer" v-if="computershow">
        <router-link to='/computer' class="computer_link">
          <section class="computer_icon">
            <svg>
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#computer"></use>
            </svg>
          </section>
          <section class="computer_text">Windows 微信已登录<span v-if="mute">， 手机通知已关闭</span></section>
        </router-link>
      </section>
      <!-- 对话列表 -->
      <section class="conversation">
        <ul>
          <router-link :to="`/singlechat/${item.wx_id}`" @click.native="refreshInfor(item)" tag="li"
                       v-for="item in dialogueList">
            <div class="imgwipe">
              <i class="redicon_num" v-if="newinfor">
              </i>
              <i class="redicon" v-if="newtext"></i>
              <!--用户头像-->
              <div class="imgstyle">
                <img :src="item.head_url" alt="">
              </div>
            </div>
            <div class="infordetail">
              <div class="infordetail_top clear">
                <span class="left ellipsis">{{item.remarks ?item.remarks : item.pet_name}}</span>
                <span class="right">{{updateTimeShow(item.create_time)}}</span>
              </div>
              <div class="infordetail_bot ellipsis">
                <!--表情处理-->
                <div class="whatsay_text" v-html="item.message.replace(/\#[\u4E00-\u9FA5]{1,3}\;/gi, emotion)"/>
              </div>
            </div>
          </router-link>
        </ul>
        <ul>
          <router-link to="/groupchat" tag="li">
            <div class="imgwipe">
              <i class="redicon_num" v-if="newinfor">1</i>
              <i class="redicon" v-if="newtext"></i>
              <div class="imgstyle imgstyletwo">
                <img :src="item.avatar" alt="" v-for="item in groupHead">
              </div>
            </div>
            <div class="infordetail">
              <div class="infordetail_top clear">
                <span class="left ellipsis">群聊</span>
                <span class="right">12:07</span>
              </div>
              <div class="infordetail_bot ellipsis">
                请文明交流~~~
              </div>
            </div>
          </router-link>
        </ul>
      </section>
    </div>
    <!-- 底部导航 -->
    <foot-guide></foot-guide>
    <transition name="router-show">
      <router-view></router-view>
    </transition>
  </section>
</template>
<script>
  import headTop from 'src/components/header/head'
  import footGuide from 'src/components/footer/foot'
  import {mapActions, mapMutations, mapState} from 'vuex'
  import {updateTimeShow} from 'src/service/data/timerHelper'
  import {initWebSocket} from "../../service/data/websocket";

  export default {
    data() {
      return {
        newinfor: false,		//未静音时新消息提醒
        newtext: false,		//静音时消息提醒
        consumer: false,
        borderColor: true,		//下边框颜色
        borderColortwo: false,
        timer: null,
        groupHead: [],
        dialogueList: []
      }
    },
    created() {
    },
    beforeDestroy() {
    },
    beforeMount() {
      //获取联系人的信息
      this.getAddressList();
    },
    handleEmotion(i) {
      this.inputmessage += i
      this.light = true;
    },
    // 将匹配结果替换表情图片
    emotion(res) {
      let word = res.replace(/\#|\;/gi, '')
      const list = ['微笑', '撇嘴', '色', '发呆', '得意', '流泪', '害羞', '闭嘴', '睡', '大哭', '尴尬', '发怒', '调皮', '呲牙', '惊讶', '难过', '酷', '冷汗', '抓狂', '吐', '偷笑', '可爱', '白眼', '傲慢', '饥饿', '困', '惊恐', '流汗', '憨笑', '大兵', '奋斗', '咒骂', '疑问', '嘘', '晕', '折磨', '衰', '骷髅', '敲打', '再见', '擦汗', '抠鼻', '鼓掌', '糗大了', '坏笑', '左哼哼', '右哼哼', '哈欠', '鄙视', '委屈', '快哭了', '阴险', '亲亲', '吓', '可怜', '菜刀', '西瓜', '啤酒', '篮球', '乒乓', '咖啡', '饭', '猪头', '玫瑰', '凋谢', '示爱', '爱心', '心碎', '蛋糕', '闪电', '炸弹', '刀', '足球', '瓢虫', '便便', '月亮', '太阳', '礼物', '拥抱', '强', '弱', '握手', '胜利', '抱拳', '勾引', '拳头', '差劲', '爱你', 'NO', 'OK', '爱情', '飞吻', '跳跳', '发抖', '怄火', '转圈', '磕头', '回头', '跳绳', '挥手', '激动', '街舞', '献吻', '左太极', '右太极']
      let index = list.indexOf(word);
      this.light = true;
      return `<img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${index}.gif" align="left">`
    },
    //这里获取离线消息,如果上线了，应该等待推送消息，而不是每次去拉取离线消息
    mounted() {
      //初始化websocket
      const wx_id = window.localStorage.getItem("wx_id");
      //初始化websocket
      initWebSocket(wx_id);
      this.$axios.post("http://192.168.43.52:8087/v1/msg/get", {
        "wx_id": wx_id
      }).then(response => {
        this.dialogueList = response.data.data;
        alert(JSON.stringify(this.dialogueList))
        this.dialogueList.sort(function (a, b) {
          let x = a['create_time'];
          let y = b['create_time'];
          return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        })
      }).catch(error => {
        alert("net work exception" + error)
      });
    },
    components: {
      headTop,
      footGuide
    },
    computed: {
      ...mapState([
        'mute', 'computershow', 'infor', 'contactList', 'consumerthing',
      ])
    },
    methods: {
      ...mapActions([
        'getAddressList'
      ]),
      ...mapMutations([
        "SAVE_MESSAGE", "LOGIN_COVER", 'GET_USERINFO'
      ]),
      // 解决输入法被激活时 底部输入框被遮住问题
      focusIpt() {
        this.timer = setInterval(function () {
          document.body.scrollTop = document.body.scrollHeight
        }, 100)
      },
      blurIpt() {
        clearInterval(this.timer)
      },
      updateTimeShow(time) {
        return updateTimeShow(time);
      },
      refreshInfor(item) {
        this.SAVE_MESSAGE(item)
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
      clearCode() {
        this.inputcode = "";
        this.code = false;
      },
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../style/public";

  .router-show-enter-active, .router-show-leave-active {
    transition: all .4s;
  }

  .router-show-enter, .router-show-leave-active {
    transform: translateX(100%)
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  .consumer {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 100;

    .consumerbg {
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      background: #000;
      opacity: .5;
    }

    .consumercon {
      @include center;

      .login {
        background: #fff;
        border-radius: 5px;
        padding: 1rem;
        width: 12.3786666667rem;
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
            margin-left: .5rem;
            @include widthHeight(5.1rem, 2.0266666667rem);

            input {
              display: inline-block;
              width: 5.1rem;
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
    }
  }

  .consumeradd {
    animation: fadeOut .4s 1 linear both;
  }

  .dialogue {
    margin-left: 0px;
    width: 100%;
    background: #fff;

    .dialogue_con {
      margin-bottom: 2rem;
      padding-top: 2.06933rem;
      -webkit-overflow-scrolling: touch;

      .computer {
        @include widthHeight(100%, 1.9626666667rem);
        background: #f5f5f5;
        border-bottom: 1px solid #e0e0e0;

        .computer_link {
          @include justify(flex-start);

          .computer_icon {
            @include widthHeight(1.2933333333rem, 1.9626666667rem);
            margin-left: 1.0666666667rem;
            margin-right: 0.96rem;
            @include align;

            svg {
              @include widthHeight(100%, 1rem);
            }
          }

          .computer_text {
            line-height: 1.9626666667rem;
            @include sizeColor(0.5546666667rem, #474747);

            span {
              display: inline-block;
              @include sizeColor(0.5546666667rem, #474747);
            }
          }
        }
      }

      .conversation {
        width: 100%;

        ul {
          width: 100%;

          li {
            padding: 0.3413333333rem 0.5973333333rem;
            box-sizing: border-box;
            border-bottom: 1px solid #e0e0e0;
            @include justify(flex-start);

            .imgwipe {
              @include widthHeight(2.0906666667rem, 2.0906666667rem);
              position: relative;
              margin-right: 0.512rem;

              .redicon_num {
                position: absolute;
                right: -0.4rem;
                top: -0.3rem;
                @include widthHeight(0.8106666667rem, 0.8106666667rem);
                @include sizeColor(0.512rem, #fff);
                line-height: 0.8806666667rem;
                padding: 0 4px;
                text-align: center;
                @include bg('../../images/warn.png');
              }

              .redicon {
                position: absolute;
                right: -0.21rem;
                top: -0.21rem;
                @include widthHeight(0.4266666667rem, 0.4266666667rem);
                @include bg('../../images/warn.png');
                border-radius: 50%;
              }

              .imgstyle {
                @include widthHeight(2.0906666667rem, 100%);
                display: flex;
                justify-content: center;
                flex-flow: row wrap;
                align-items: flex-start;
                align-content: flex-start;
                overflow: hidden;
                background: #dddbdb;

                img {
                  width: 10%;
                  height: auto;
                  border: 0;
                  flex-grow: 2;
                }
              }

              .imgstyletwo {
                img {
                  width: 50%;
                  height: 50%;
                  flex-grow: 0;
                }
              }
            }

            .infordetail {
              width: 11.5626666667rem;
              padding-top: 0.2133333333rem;

              .infordetail_top {
                width: 100%;
                padding-bottom: 0.2133333333rem;

                span:nth-of-type(1) {
                  width: 8.7466666667rem;
                  @include sizeColor(0.5973333333rem, #38373c);
                }

                span:nth-of-type(2) {
                  @include sizeColor(0.4266666667rem, #b2b6b9);
                }
              }

              .infordetail_bot {
                width: 9.5573333333rem;
                @include sizeColor(0.512rem, #9e9e9e);
              }

            }

          }
        }
      }
    }

  }

</style>
