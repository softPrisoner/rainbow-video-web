<template>
  <section class="child_page">
    <head-top crossover="朋友圈" clickrefresh="friendcicle" @refreshPage="freshPage" camera-part="true">
    </head-top>
    <section class="friend_wipe" ref="friend">
      <section class="friend">
        <!--主题-->
        <div class="theme">
          <div class="themeinit" @click="exportInput"></div>
          <div :class="{shoowimg : !imagestatus}" @click="exportInput">
            <img :src="newImg" id="imgSrc" ref="imgSrc" class="imgSrc"/>
          </div>
          <div class="themetext" :class="{shoowimg : imagestatus}">轻触更换主题照片</div>
          <div class="personImg">
            <div class="personame">{{this.$store.state.userInfo.pet_name}}</div>
            <div class="headimg" @click="personInfor">
              <img :src="userHeader" alt="">
            </div>
          </div>
        </div>
        <div class="coverinput" :class="{shoowinput: afterclcik}">
          <div class="coverinputbg" @click="hideIput"></div>
          <div class="coverfiletext">
            <!--如何将数据保存到网络端-->
            <div class="wipeinput">
              更换相册封面
              <input class="coverfile" id="input_file" type="file" name="cover" accept="image/*"/>
            </div>
          </div>
        </div>
        <!--//判断朋友圈数据是否存在-->
        <div class="condition" v-if="circleData.length>0">
          <ul>
            <!--遍历朋友圈数据-->
            <li class="condition_li" v-for="(item,index) in circleData" :key="index">
              <div class="condition_left">
                <!--用户头像-->
                <div style="display: none">{{item.circle_id}}</div>
                <img :src="item.head_url" alt="">
              </div>
              <!--判断是否使用昵称-->
              <div class="condition_right">
                <h1>{{item.remarks ? item.remarks : item.pet_name}}归尘黎月</h1>
                <div class="publishtext">
                  {{item.text_title}}
                </div>
                <!--发布的动态图片-->
                <div class="publishimg clear" v-show=" item.pictures.length>0">
                  <img :src="value" alt="" v-for="value in item.pictures"
                       :class="{releaseimg : item.pictures.length >= 2 ? true : false}">
                </div>
                <!--评论按钮-->
                <div class="commentbutton">
                  <div class="button_left clear">
                    <!--评论发布的时间-->
                    <span>{{updateTimeShow(item.create_time)}}</span>
                    <!--判断是否是自己发布的评论，并提供删除按钮-->
                    <span v-if="userInfo.wx_id == item.wx_id ? true : false" @click="deleteCommon">删除</span>
                  </div>

                  <div class="button_right">
                    <svg class="button_svg" @click="showDiscuss(item)">
                      <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#comment"></use>
                    </svg>
                    <div class="discuss" v-if="item.criticism"
                         :class="{discusshow : item.reviewshow, discusshide : item.reviewhide}">
                      <div @click="supportThing(item)">
                        <svg fill="#fff" :class="{surportdiv : likediv}">
                          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#like"></use>
                        </svg>
                        <span ref="suporttext">{{item.suporthtml}}</span>
                      </div>
                      <div @click="criticismThing(item)">
                        <svg fill="#fff">
                          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#discuss"></use>
                        </svg>
                        <span>评论</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="retext" v-show="item.thumbUpInfos.length >0 || item.reviews.length > 0">
                  <svg class="retext_trigon" fill="#efefef">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#trigon"></use>
                  </svg>
                  <div class="retext_like clear" :class="{likeborder : item.reviews.length >0 }"
                       v-show="item.thumbUpInfos.length > 0">
                    <svg class="retext_like_svg" fill="#8792b0">
                      <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#like"></use>
                    </svg>
                    <span v-for="(value,index) in item.thumbUpInfos">{{value}}<i>,</i></span>
                  </div>
                  <div class="retext_revert" v-show="item.reviews.length > 0">
                    <ul>
                      <li v-for="value in item.reviews">
                        <span>{{value.remarks ? value.remarks: value.petname}}</span>：{{value.commentext}}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="conditionelse" v-else>
          ________________________没有更多了_______________________
        </div>
        <!-- 评论区的显示-->
        <section class="criticism" v-if="criticismstate">
          <div class="criticism_con">
            <textarea name="" id="" cols="30" rows="10" ref="textinput" v-model="textareaVlue" @input="inputCriticism"
                      @keyup.enter="enterThing"></textarea>
            <span :class="{notempty:changeinput}" @click="commentSend">发送</span>
          </div>
        </section>
      </section>
    </section>
  </section>
</template>
<script>
  import headTop from 'src/components/header/head'
  import uploadPreview from 'src/config/uploadPreview.js'
  import {animate} from 'src/config/mUtils'
  import {mapActions, mapMutations, mapState} from 'vuex'
  import {updateTimeShow} from '../../../service/data/timerHelper'

  window.navigator
  export default {

    data() {
      return {
        filevalue: '',
        imageSrc: false,			//显示的是图片还是文字
        afterclcik: true,		//点击显示上传图片的input
        releaseimgnum: true,		//上传的图片数是否大于1
        timer: null,				//定时器
        timers: null,			//点赞定时器
        bordercss: true,			//点赞的下边框
        likenum: true,			//点赞的人数
        circleData: [],
        likediv: false,			//点击时svg图放大
        textareaValue: '',		//评论输入的内容
        changeinput: false,		//控制发送按钮状态的改变
        criticismstate: false,	//评论显隐
        itemlist: {},			//点击当前的li
        userInfoData: {},			//用户信息
        userHeader: '', //用户头像
        actions: [{
          name: '拍摄',
          method: function () {
            //调用摄像头进行拍照
          }
        },
          {
            name: '从相册中选择',
            method: function () {
              // 从相册中选择
            }
          }]
      }
    },
    created() {
      //获取朋友圈数据
      let wx_id = window.localStorage.getItem("wx_id");
      this.$axios.post("http://192.168.43.52:8087/v1/circle/get", {
        "wx_id": wx_id,
      }).then((res) => {
        if (res.status == 200) {
          this.circleData = res.data.data;
          alert(JSON.stringify(this.circleData))
        }
      })
    },
    beforeDestroy() {
      this.CHANGE_SHEETVISIBLE(false)
      clearTimeout(this.timer);
      clearTimeout(this.timers);
    },
    beforeMount() {
    },
    mounted: function () {
      this.userInfoData = this.$store.state.userInfo;
      this.userHeader = this.$store.state.userInfo.head_url
      //上传图片并展示图片（无剪裁功能）
      new uploadPreview({
        UpBtn: "input_file",
        ImgShow: "imgSrc",
        ImgType: ["gif", "jpeg", "jpg", "bmp", "png"],
        callback: () => {
          this.afterclcik = true;
          this.newImg = this.$refs.imgSrc.src
          this.SAVE_THEMIMG({newImg: this.$refs.imgSrc.src, imagestatus: true})
        }
      });

    },
    components: {
      headTop,
    },
    computed: {
      ...mapState([
        "newImg", "userInfo", "imagestatus", "sheetVisible"
      ])
    },
    methods: {
      ...mapMutations([
        "SAVE_THEMIMG", "SAVE_MESSAGE", "CHANGE_SHEETVISIBLE"
      ]),
      ...mapActions([
        "getUserInfo",
      ]),
      deleteCommon() {
        //删除评论
      },
      enterThing() {
        this.commentSend()
      },
      updateTimeShow(time) {
        return updateTimeShow(time)
      },
      exportInput() {
        this.afterclcik = false;
      },
      hideIput() {
        this.afterclcik = true;
        this.SAVE_THEMIMG(this.$refs.imgSrc.src)
      },
      commentShow(item) {
        item.criticism = true;
        item.reviewshow = true;
        item.reviewhide = false;
        item.flag = false;
      },
      commentHide(item) {
        item.reviewshow = false;
        item.reviewhide = true;
        this.timer = setTimeout(() => {
          clearTimeout(this.timer);
          item.criticism = false;
        }, 1000)
        item.flag = true;
      },
      showDiscuss(item) { //点击评论按钮点赞与评论出现
        if (item.flag) {
          this.commentShow(item)
        } else {
          this.commentHide(item);
        }
      },
      freshPage() {//点击头部页面滚动到顶部
        const getBody = document.getElementsByTagName("body")[0];
        animate(getBody, {scrollTop: 0})
      },
      personInfor() {//点击头像进入个人资料页
        this.SAVE_MESSAGE(this.userInfoData);
        this.$router.push('/addressbook/details');
      },
      supportThing(item) {//点赞
        this.likediv = true;
        clearTimeout(this.timers);
        this.timers = setTimeout(() => {
          this.likediv = false;
        }, 200);
        this.commentHide(item);
        if (item.suporthtml == "赞") {
          item.suporthtml = "取消";
          item.like.push(this.userInfoData.name)
        } else {
          item.suporthtml = "赞";
          item.like.pop();
        }
      },
      criticismThing(item) {//评论
        this.itemlist = {};
        this.itemlist = item;
        alert(this.itemlist)
        this.criticismstate = true;
        this.$nextTick(() => {
          this.$refs.textinput.focus();
        })
        this.commentHide(item);
      },
      inputCriticism() {//文本框是否为空
        this.textareaVlue ? this.changeinput = true : this.changeinput = false;
      },

      commentSend() {//评论点击发送
        if (this.changeinput) {
          if (this.textareaVlue) {
            this.itemlist.comment.push({
              wxid: this.userInfoData.id,
              petname: this.userInfoData.name,
              commentext: this.textareaVlue
            })
            this.$axios.post("http://192.168.43.52:8087/friend/circle/review",
              {
                "wx_id": this.userInfoData.id,
                "pet_name": this.userInfoData.name,
                "textcontext": this.textareaVlue

              })
              .then(response => {
                if (response.status == 200) {

                }
              })
              .catch(error => {

              })
          }
          this.criticismstate = false;
          this.textareaVlue = '';
          this.changeinput = false;
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../../style/public";

  .friendcirclecamera {
  }

  .conditionelse {
    width: 100%;
    margin: 1.0875rem;
    font-size: small;
    color: #9a9e9d;
  }

  .child_page {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 203;
    background-color: #f8f8f8;
  }

  .refresh {
    position: absolute;
    @include widthHeight(12rem, 2rem);
    background: #fff;
    left: 2rem;

  }

  .friend_wipe {
    width: 100%;
    padding-bottom: 1rem;
    background-color: #f8f8f8;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;

    .friend {
      padding-top: 2.06933rem;
      background-color: #f8f8f8;

      .theme {
        width: 100%;
        margin-top: -1px;
        height: 11.3706666667rem;
        position: relative;

        .themeinit {
          width: 100%;
          height: 11.3706666667rem;
          position: absolute;
          top: 0;
          left: 0;
          background: #000;
          opacity: .6;
        }

        .imgSrc {
          display: block;
          position: absolute;
          top: 0;
          z-index: 4;
          width: 100%;
          height: 11.3706666667rem;
        }

        .shoowimg {
          display: none;
        }

        .themetext {
          @include center;
          @include sizeColor(0.6rem, #000);
          z-index: 2;
        }

        .personImg {
          position: absolute;
          right: 0.512rem;
          z-index: 6;
          bottom: -1.3866666667rem;
          @include justify(flex-end);

          .personame {
            display: block;
            margin-right: 0.512rem;
            @include sizeColor(0.64rem, #fff);
            margin-top: 0.96rem;
          }

          .headimg {
            background: #fff;
            border: 1px solid #e2e2e2;

            img {
              margin: 0.064rem;
              display: block;
              @include widthHeight(3.4133333333rem, 3.4133333333rem);
            }
          }
        }
      }

      .coverinput {
        position: absolute;
        z-index: 11;
        top: 0;
        width: 100%;
        height: 100%;

        .coverinputbg {
          position: fixed;
          width: 100%;
          height: 100%;
          top: 0;
          background: #000;
          opacity: .3;
        }

        .coverfiletext {
          @include center;
          z-index: 5;
          width: 11rem;
          height: 2.048rem;
          line-height: 2.048rem;
          background: #fff;
          border-radius: 3px;
          @include sizeColor(0.64rem, #333);

          .wipeinput {
            position: relative;
            padding-left: 1rem;

            .coverfile {
              position: absolute;
              display: block;
              top: 0;
              left: 0;
              width: 11rem;
              height: 2.048rem;
              opacity: 0;
            }
          }

        }
      }

      .shoowinput {
        display: none;
      }

      .condition {
        width: 100%;
        height: 100%;
        padding-top: 1.5786666667rem;

        ul {
          width: 100%;

          .condition_li {
            padding: 0.512rem;
            border-bottom: 1px solid #e2e2e2;
            @include justify(flex-start);

            .condition_left {
              width: 1.792rem;
              margin-right: 0.2986666667rem;

              img {
                display: block;
                @include widthHeight(1.792rem, 1.792rem);
              }
            }

            .condition_right {
              width: 12.9026666667rem;

              h1 {
                display: block;
                padding-top: 0.1706666667rem;
                @include sizeColor(0.5546666667rem, #8792b0);
              }

              .publishtext {
                margin-top: 0.064rem;
                width: 100%;
                @include sizeColor(0.5546666667rem, #333);
                line-height: 0.7466666667rem;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 6;
                -webkit-box-orient: vertical;
                word-break: break-all;
              }

              .publishimg {
                width: 100%;
                margin-top: 0.3413333333rem;

                img {
                  width: 40%;
                  float: left;
                  height: auto;
                }

                .releaseimg {
                  width: 3.6266666667rem;
                  margin-right: 0.1066666667rem;
                  margin-bottom: 0.1066666667rem;
                  height: 3.6266666667rem;
                }
              }

              .commentbutton {
                @include justify;

                .button_left {
                  margin-top: 0.576rem;

                  span {
                    float: left;
                    @include sizeColor(0.4693333333rem, #666);
                    margin-right: 0.4266666667rem;
                  }

                  span + span {
                    color: #8792b0;
                  }
                }

                .button_right {
                  margin-top: 0.6826666667rem;
                  position: relative;
                  @include widthHeight(0.9386666667rem, 0.64rem);

                  .button_svg {
                    display: block;
                    @include widthHeight(100%, 100%);
                  }

                  .discuss {
                    position: absolute;
                    @include widthHeight(8.2346666667rem, 1.7066666667rem);
                    background: #373b3e;
                    border-radius: 3px;
                    right: 1.408rem;
                    top: -0.5973333333rem;
                    box-sizing: border-box;
                    @include align;

                    div {
                      width: 50%;
                      float: left;
                      @include justify(center);

                      svg {
                        display: block;
                        @include widthHeight(0.768rem, 0.768rem);
                        margin-right: 0.2133333333rem;
                      }

                      span {
                        display: block;
                        @include sizeColor(0.5546666667rem, #fff);
                      }
                    }

                    div:first-child {
                      border-right: 2px solid #2f3336;
                    }

                    .surportdiv {
                      animation: pulse 0.5s;
                    }
                  }

                  .discusshow {
                    animation: flipInX 1s 1 ease-in-out both;
                  }

                  .discusshide {
                    animation: flipOutX 1s 1 ease-in-out both;
                  }

                }
              }

              .retext {
                margin-top: 0.128rem;

                .retext_trigon {
                  display: block;
                  @include widthHeight(.8rem, .4rem);
                  margin-left: 0.4266666667rem;
                }

                .retext_like {
                  background: #efefef;
                  padding: 0.3413333333rem;

                  .retext_like_svg {
                    float: left;
                    @include widthHeight(0.512rem, 0.512rem);
                    margin-right: 0.2133333333rem;
                    margin-top: 0.064rem;
                  }

                  span {
                    float: left;
                    margin-right: 0.2133333333rem;
                    @include sizeColor(0.512rem, #8792b0);

                    i {
                      @include sizeColor(0.512rem, #8792b0);
                    }
                  }

                  span:last-child {
                    @include sizeColor(0.512rem, #8792b0);

                    i {
                      display: none;
                    }
                  }
                }

                .likeborder {
                  border-bottom: 1px solid #e2e2e2;
                }

                .retext_revert {
                  background: #efefef;

                  ul {
                    padding: 0.3413333333rem;

                    li {
                      border: 0;
                      padding-bottom: 0.1rem;
                      @include sizeColor(0.5546666667rem, #333);

                      span {
                        display: inline-block;
                        color: #8792b0;
                      }
                    }
                  }
                }
              }
            }
          }

          .condition_li:last-child {
            border: 0;
          }
        }

      }

      .criticism {
        position: fixed;
        left: 0;
        z-index: 10;
        bottom: 0;
        width: 100%;
        background: #ebebeb;

        .criticism_con {
          padding: 0.4266666667rem 0.64rem;
          @include justify(space-between);

          textarea {
            display: block;
            width: 12rem;
            height: 1.5rem;
            max-height: 3.2rem;
            border: 0;
            border-bottom: 2px solid #18ae17;
            resize: none;
            @include sizeColor(0.64rem, #333);
            line-height: 0.768rem;
            background: none;
            padding-top: 0.32rem;
          }

          span {
            display: block;
            width: 1.8rem;
            @include sizeColor(0.5546666667rem, #d2d2d2);
            border: 1px solid #d7d7d7;
            text-align: center;
            border-radius: 5px;
            line-height: 1.3653333333rem;
          }

          .notempty {
            background: #18ae17;
            color: #fff;
            border-color: #3e8d3e;
          }
        }
      }
    }
  }


  @keyframes flipInX {
    from {
      -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
      transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
      opacity: 0;
    }

    40% {
      -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
      transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }

    60% {
      -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
      transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
      opacity: 1;
    }

    80% {
      -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
      transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
    }

    100% {
      -webkit-transform: perspective(400px);
      transform: perspective(400px);
    }
  }

  @keyframes flipOutX {
    from {
      -webkit-transform: perspective(400px);
      transform: perspective(400px);
    }

    30% {
      -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
      transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
      opacity: 1;
    }

    100% {
      -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
      transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
      opacity: 0;
    }
  }

  @keyframes pulse {
    from {
      -webkit-transform: scale3d(1, 1, 1);
      transform: scale3d(1, 1, 1);
    }

    50% {
      -webkit-transform: scale3d(1.1, 1.1, 1.1);
      transform: scale3d(1.1, 1.1, 1.1);
    }

    100% {
      -webkit-transform: scale3d(1, 1, 1);
      transform: scale3d(1, 1, 1);
    }
  }
</style>
