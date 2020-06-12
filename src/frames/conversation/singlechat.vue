<template>
  <section>
    <head-top :crossover="this.$route.params.id">
      <section class="coversPart" slot="person">
        <router-link to='/singlechat/chatmessage' class="person_link">
          <svg fill="#fff" class="icon-search">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#person"></use>
          </svg>
        </router-link>
      </section>
    </head-top>
    <section class="coversation" ref="singleHeight">
      <section class="coversationlist" @click="bottomHide">
        <div class="underscore">————&nbsp;我是归尘黎月，现在我们可以聊天了&nbsp;————</div>
        <ul>
          <!-- 对方 -->
          <li v-for="item in conversine">
            <div class="other" :class="{mysay : item.sendobject !== 1 }">
              <img :src="item.headurl" @click="enlargeImg(item.headurl)" alt="">
              <div class="whatsay">
                <div class="whatsay_svg">
                  <svg>
                    <use xmlns:xlink="http://www.w3.org/1999/xlink"
                         :xlink:href="item.sendobject !== 1 ? '#trigon-right' : '#trigon-left'"></use>
                  </svg>
                </div>
                <div class="whatsay_text" v-html="item.Messageblob.replace(/\#[\u4E00-\u9FA5]{1,3}\;/gi, emotion)">
                </div>
              </div>
            </div>
          </li>
        </ul>
      </section>
    </section>
    <footer :class="{footshow : clickmore}">
      <section class="foot_top">
        <div @click="VoiceInputStateChange()">
          <svg v-show="isInput">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#voice"></use>
          </svg>
          <div v-show="!isInput">
            <svg style="overflow-x: visible;overflow-y: visible">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#keyboard"></use>
            </svg>
          </div>
        </div>
        <div>
          <div v-if="isInput">
            <input id="inputId" v-model="inputmessage" maxlength="100" @input="whatInput" @focus="focusIpt"
                   @blur="blurIpt"
                   @click="inputBottomHide" :class="{lightborder : light}" @keyup.enter="enterThing"/>
          </div>
          <div v-else>
            <voice-input></voice-input>
          </div>
        </div>
        <!--voice  input-->
        <div>
          <div @click="showFace">
            <svg>
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#face"></use>
            </svg>
          </div>
        </div>
        <div>
          <div class="send" v-if="light" @click="clickSend">
            <span>发送</span>
          </div>
          <svg v-else @click="showPlus">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#addthing"></use>
          </svg>
        </div>
      </section>
      <section class="foot_bottom">
        <div class="swiper-container" v-show="isPlus">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(value,item) in chatData">
              <ul class="clear">
                <li v-for="v in value">

                  <div class="swiper_svg" @click="camera">

                    <svg fill="#7a8187">
                      <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="v.chatSvgid"></use>
                    </svg>
                  </div>
                  <div class="swiper_text">
                    {{value.chatSvgname}}
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
        <transition name="router-show" v-show="isFace">
          <emotion @emotion="handleEmotion" :height="700"></emotion>
        </transition>
      </section>
    </footer>
    <section class="enlarge" v-if="enlarge" @click="enlargeHide"
             :class="{'movein-animate' : enlargeShow, 'moveout-animate-leave' : enlargehides}">
      <img :src="enlargeurl" alt="">
    </section>
  </section>
</template>
<script>
  import headTop from 'src/components/header/head';
  import {mapActions, mapState,} from 'vuex';
  import {chatData, userWord} from 'src/service/getData';
  import 'src/config/swiper.min.js';
  import 'src/style/swiper.min.css';
  import Emotion from './chatmessage/foot/face/index';
  import VoiceInput from './chatmessage/wechatfooter';
  import {contacts} from "../../service/data/contacts";
  import {imgurl} from "../../config/env";

  export default {
    data() {
      return {
        inputmessage: '',//输入的文本内容
        light: false,	//输入框不为空时，input下边框变色
        clickmore: false,	//点击加号底  部显示、隐藏
        chatname: '',		//聊天名字
        ifme: false,			//发消息的对象是否是自己
        enlargeurl: '',		//头像地址
        enlargehides: false,
        enlargeShow: false,
        enlarge: false,
        timer: null,
        isPlus: false,    //是否点击的是+号
        isFace: false,     //是否点击是表情
        isInput: true,      //是否点击是输入
        isVoiceInput: false,
        conversine: [],		//对话列表
        robotCont: '',
        newInfo: {},
        chatData: {},
        userInfoData: {},
      }
    },
    /**
     * voice input 5-5 started
     */
    directives: {
      press: {
        inserted(element, binding) {
          var recording = document.querySelector('.recording'),
            recordingVoice = document.querySelector('.recording-voice'),
            recordingCancel = document.querySelector('.recording-cancel'),
            startTx, startTy;

          element.addEventListener('touchstart', function (e) {
            // 用bind时，vue还没插入到dom,故dom获取为 undefine，用 inserted 代替 bind,也可以开个0秒的定时器
            element.className = "chat-say say-active";
            recording.style.display = recordingVoice.style.display = "block";
            // console.log('start');
            var touches = e.touches[0];
            startTx = touches.clientX;
            startTy = touches.clientY;
            e.preventDefault()
          }, false)
          element.addEventListener('touchend', function (e) {
            element.className = "chat-say";
            recordingCancel.style.display = recording.style.display = recordingVoice.style.display = "none";
            e.preventDefault();
          }, false);
          element.addEventListener('touchmove', function (e) {
            var touches = e.changedTouches[0],
              endTx = touches.clientX,
              endTy = touches.clientY,
              distanceX = startTx - endTx,
              distanceY = startTy - endTy;
            if (distanceY > 50) {
              element.className = "chat-say"
              recordingVoice.style.display = "none"
              recordingCancel.style.display = "block"
            } else {
              element.className = "chat-say say-active"
              recordingVoice.style.display = "block"
              recordingCancel.style.display = "none"
            }
            // 阻断事件冒泡 防止页面被一同向上滑动
            e.preventDefault();
          }, false);
        }
      },
      more: {
        bind(element, binding) {
          var startTx, startTy
          element.addEventListener('touchstart', function (e) {
            var msgMore = document.getElementById('msg-more'),
              touches = e.touches[0];
            startTx = touches.clientX;
            startTy = touches.clientY;
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
              // 控制菜单的位置
              msgMore.style.left = ((startTx - 18) > 180 ? 180 : (startTx - 18)) + 'px';
              msgMore.style.top = (element.offsetTop - 33) + 'px';
              msgMore.style.display = "block";
              element.style.backgroundColor = '#e5e5e5';
            }, 500)
          }, false)
          element.addEventListener('touchmove', function (e) {
            var touches = e.changedTouches[0],
              disY = touches.clientY;
            if (Math.abs(disY - startTy) > 10) {
              clearTimeout(this.timer);
            }
          }, false)
          element.addEventListener('touchend', function (e) {
            clearTimeout(this.timer);
          }, false)
        }
      }
    },
    /**
     * voice input 5-5 end
     */
    created() {

    },
    mounted() {
      //首先登陆后初始化所有数据
      var friend_wx_id = this.$route.params.id;
      //这里本来是要从数组中查找出相对应的数据
      var item = contacts.A.find(item => item.wx_id == friend_wx_id);
      alert(JSON.stringify(item))
      chatData().then((res) => {
        this.chatData = res;
      }).then(() => {
        //初始化swiper
        new Swiper('.swiper-container', {
          pagination: '.swiper-pagination',
          loop: false,
        });
      })
      this.chatname = this.infor.remarks ? this.infor.remarks : this.infor.pet_name;
      this.userInfoData = this.userInfo;
      userWord().then((res) => {
        this.conversine = [...res]
      });
    },
    components: {
      headTop,
      Emotion,
      VoiceInput
    },
    computed: {
      ...mapState([
        "infor", "userInfo",
      ]),

    },
    beforeDestroy() {
      clearTimeout(this.timer);
    },
    methods: {
      ...mapActions([
        'getUserInfo',
      ]),
      focusIpt() {
        document.getElementById("inputId").scrollIntoView();
      },
      blurIpt() {
        clearInterval(this.timer);
      },
      camera() {
        let wx_id = window.localStorage.getItem("wx_id");
        this.$axios.post("http://192.168.43.52:8087/v1/msg/media/create", {
          "wx_id": wx_id,
          "friend_wx_id": this.$route.params.id,
          "media_type": 102
        }).then(response => {
          alert(JSON.stringify(response.data));
          if (response.status == 200) {
            if (response.data.data) {
              const token = null;
              const room_name = response.data.data.room_name;
              const room_data = null;
              const room_id = response.data.data.room_id;
              callMedia.callAndroidMedia(token, room_name, room_data, room_id);
            }
          }
        }).catch(error => {
          this.$toast("用户名发起会话失败");
          return;
        })
      },
      showPlus() {
        this.clickmore = !this.clickmore;
        this.isFace = false;
        this.isPlus = true;
      }
      ,
      VoiceInputStateChange() {
        this.isInput = !this.isInput;
        this.clickmore = false;
      }
      ,
      showFace() {
        this.clickmore = !this.clickmore;
        this.isPlus = false;
        this.isFace = true;
        this.isInput = true;
      },
      whatInput() {
        if (this.inputmessage.replace(/\s+/g, "") == '') {
          this.light = false;
        } else {
          this.light = true;
        }
      },
      enterThing() {
        if (this.light) {
          this.clickSend();
        }
      },
      bottomShow() {
        this.clickmore = true;
        isFace = true;
      },
      voiceInput() {
        this.$toast({
          message: '发送消息成功！',
          position: 'middle',
          duration: 5000,
          className: 'toasts'
        });
      },

      bottomHide() {
        this.clickmore = false;
      },
      inputBottomHide() {
        this.clickmore = false;
      },
      async clickSend() {
        // 将每一条消息进行本地存储
        this.conversine.push({
          "wxid": "xulianjie442154157",
          "friend_wx_id": this.$route.params.id,
          "headurl": imgurl + this.userInfoData.avatar,
          "sendobject": 0,
          "Messageblob": this.inputmessage,
        });
        const inputmessage = this.inputmessage;
        this.inputmessage = '';
        this.isFace = false;
        //修改数据
        this.isPlus = true;
        this.light = false;
        this.$axios.post("http://192.168.43.52:8087/v1/msg/send", {
          "head_url": "",
          "msg": inputmessage,
          "wx_id": window.localStorage.getItem("wx_id"),
          "to_list": this.$route.params.id,
        }).then((response) => {
          if (response.status == 200) {
            this.$toast("发送成功")
          }
        }).catch((error) => {
          this.$toast("网络异常")
        })
        this.$nextTick(() => {
          window.scrollTo(0, this.$refs.singleHeight.offsetHeight - window.innerHeight)
        })
      },
      enlargeImg(enlargeImg) {
        this.enlargeurl = enlargeImg;
        this.enlarge = true;
        this.enlargeShow = true;
        this.enlargehides = false;
      },
      enlargeHide() {
        clearTimeout(this.timer)
        this.enlargehides = true;
        this.enlargeShow = false;
        this.timer = setTimeout(() => {
          this.enlarge = false;
        }, 400)
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
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../style/public";
  @import "./assets/css/dialogue.css";

  .mint-toast {
    background-color: red !important;
  }

  .toasts {
    width: 1.6rem !important;
    height: .6rem;
    background-color: red;
  }

  .router-show-enter-active, .router-show-leave-active {
    transition: all .4s;
  }

  .router-show-enter, .router-show-leave-active {
    transform: translateX(100%)
  }

  .coversPart {
    @include topcenter;
    right: 0.5973333333rem;
    @include widthHeight(0.8533333333rem, 0.8533333333rem);

    .person_link {
      display: block;
      @include widthHeight(0.8533333333rem, 0.8533333333rem);

      svg {
        @include widthHeight(100%, 100%);
      }
    }
  }

  .coversation {
    background-color: #ebebeb;
    -webkit-overflow-scrolling: touch;
    padding-top: 2.06933rem;

    .coversationlist {
      position: relative;
      padding: 0 .32rem;
      overflow: auto;
      margin: 0 auto;

      .underscore {
        padding-top: 0.2rem;
        text-align: center;
        @include sizeColor(0.5546666667rem, #999);
      }

      ul {
        padding-top: .4rem;
        padding-bottom: 2.2rem;
        width: 15.4rem;
        overflow-scrolling: touch;
        -webkit-overflow-scrolling: touch;
        top: 0;

        li {
          .other {
            width: 100%;
            @include justify(flex-start);
            margin-bottom: 0.512rem;
            align-items: normal;

            img {
              display: block;
              @include widthHeight(1.7493333333rem, 1.7493333333rem);
            }

            .whatsay {
              position: relative;

              .whatsay_svg {
                @include widthHeight(0.4266666667rem, 0.64rem);
                position: absolute;
                top: .5546667rem;
                left: .36rem;
                z-index: 2;

                svg {
                  display: block;
                  @include widthHeight(0.4266666667rem, 0.64rem);
                }
              }

              .whatsay_text {
                margin-left: 0.6399997rem;
                max-width: 10.3253333333rem;
                background: #fff;
                padding: 0.42rem 0.384rem;
                border: 1px solid #d9d9d9;
                border-radius: 8px;
                @include sizeColor(0.64rem, #333);
                line-height: 0.8533333333rem;
                word-break: break-all;
              }
            }

          }

          /***
          voice input  style  2019-5-5
           */
          .say-active {
            background: #c6c7ca;
          }

          .mysay {
            display: flex;
            flex-direction: row-reverse;

            .whatsay {
              .whatsay_svg {
                right: .36rem;
                left: auto;
              }

              .whatsay_text {
                margin-right: 0.6399997rem;
                margin-left: 0;
                height: 100%;
                background: #9fe658;
              }
            }
          }
        }
      }

    }
  }

  footer {
    position: fixed;
    z-index: 10;
    border-top: 1px solid #e0e0e0;
    background: #f5f5f5;
    bottom: -11.712rem;
    width: 100%;

    .foot_top {
      padding: 0 0.512rem;
      height: 2.0053333333rem;
      background: #f3f3f3;
      @include justify(flex-start);
      align-items: center;

      div:nth-of-type(1), div:nth-of-type(3), div:nth-of-type(4) {
        @include widthHeight(1.3653333333rem, 1.3653333333rem);
        margin-right: 0.3413333333rem;

        svg {
          @include widthHeight(100%, 100%);
          display: block;
          float: left;
        }
      }

      div:nth-of-type(2) {
        margin-right: 0.3413333333rem;
        width: 9.8rem;
        height: 1.152rem;
        border-bottom: 1px solid #e0e0e0;

        div {
          display: block;
          width: 9.8rem;
          padding: 0 0.4133333333rem;
          line-height: 1.152rem;
          height: 1.152rem;
          border: 0;
          background: none;
          @include sizeColor(0.64rem, #000);
          border-bottom: 1px solid #e0e0e0;
        }

        input {
          display: block;
          width: 9.8rem;
          padding: 0 0.4133333333rem;
          line-height: 1.152rem;
          height: 1.152rem;
          border: 0;
          background: none;
          @include sizeColor(0.64rem, #000);
          border-bottom: 1px solid #e0e0e0;
        }

        .lightborder {
          border-color: #19ad17;
        }
      }

      div:nth-of-type(4) {
        margin-right: 0;

        .send {
          width: 1.8133333333rem;
          background: #16af17;
          height: 1.3653333333rem;
          padding: .682666rem 0;
          border-radius: 5px;
          @include justify(center);
          align-items: center;

          span {
            display: block;
            @include sizeColor(0.5973333333rem, #fff);
          }
        }

        .send:active {
          background: #33c034;
        }
      }
    }

    .foot_bottom {
      height: 11.712rem;
      border-top: 1px solid #e0e0e0;

      .swiper-container {
        width: 100%;
        height: 11.712rem;
        overflow: hidden;

        .swiper-slide {
          width: 100%;

          ul {
            padding: 1.408rem 1.1946666667rem 0;
            box-sizing: border-box;

            li {
              float: left;
              width: 2.5466666667rem;
              margin-right: 1rem;
              margin-bottom: 1.1946666667rem;

              .swiper_svg {
                @include widthHeight(2.5466666667rem, 2.5466666667rem);
                background: #fcfcfc;
                border: 1px solid #d3d3d3;
                border-radius: 10px;
                @include justify(center);
                align-items: center;

                svg {
                  @include widthHeight(1.28rem, 0.9386666667rem);
                  display: block;
                }
              }

              .swiper_text {
                width: 100%;
                margin-top: 0.256rem;
                text-align: center;
                @include sizeColor(0.4693333333rem, #7a8187);
              }
            }

            li:nth-of-type(4n+4) {
              margin-right: 0;
            }
          }
        }
      }
    }
  }

  .footshow {
    flex: auto;
    bottom: 0rem;
    transition: all .2s;
  }

  .enlarge {
    position: fixed;
    @include widthHeight(100%, 100%);
    background: #000000;
    top: 0;
    z-index: 100;

    img {
      display: block;
      width: 100%;
      height: 15.0186666667rem;
      position: absolute;
      top: 50%;
      left: 0;
      margin-top: -7.5093333333rem;
    }
  }

  .enlarge_part {
    display: none;
  }

  body .movein-animate {
    transition: all 1s;
    animation: fadeIn .6s;
  }

  body .moveout-animate-leave {
    transition: all 1s;
    animation: zoomOut .6s;
  }

  @-webkit-keyframes fadeIn {
    from {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  @-webkit-keyframes zoomOut {
    from {
      opacity: 1;
    }

    50% {
      opacity: 0;
      -webkit-transform: scale3d(.3, .3, .3);
      transform: scale3d(.3, .3, .3);
    }

    100% {
      opacity: 0;
    }
  }

  @keyframes zoomOut {
    from {
      opacity: 1;
    }

    50% {
      opacity: 0;
      -webkit-transform: scale3d(.3, .3, .3);
      transform: scale3d(.3, .3, .3);
    }

    100% {
      opacity: 0;
    }
  }
</style>
