<template>
  <section class="child_page">
    <head-top crossover="聊天信息"></head-top>
    <section class="groupchat">
      <ul class="groupchat_ul clear" ref="groupUl" :class="{ beforeUl : notlook, afterUl : looking}">
        <li v-for="item in allPeople">
          <img :src="imgurl + item.avatar" alt="">
          <span class="ellipsis">{{item.name}}</span>
        </li>
      </ul>
      <div class="lookmore" v-if="lookgroup" @click="lookAll">
        查看全部群成员
      </div>
    </section>
    <section class="chat">
      <ul>
        <li>
          <div>群聊名称</div>
          <div class="voice-music">{{gropname}}</div>
        </li>
        <li>
          <div>群公告</div>
        </li>
      </ul>
      <ul>
        <li>
          <div>查看聊天记录</div>
        </li>
        <li>
          <div>消息免打扰</div>
          <div class="push-button">
            <input class='tgl tgl-light' id='new' type='checkbox'>
            <label class='tgl-btn' for='new'></label>
          </div>
        </li>
        <li>
          <div>置顶聊天</div>
          <div class="push-button">
            <input class='tgl tgl-light' id='video' type='checkbox' checked="checked">
            <label class='tgl-btn' for='video'></label>
          </div>
        </li>
        <li>
          <div>保存到通讯录</div>
          <div class="push-button">
            <input class='tgl tgl-light' id='video1' type='checkbox' checked="checked">
            <label class='tgl-btn' for='video'></label>
          </div>
        </li>
      </ul>
    </section>
    <transition name="router-show">
      <router-view></router-view>
    </transition>
  </section>
</template>

<script>
  import headTop from 'src/components/header/head';
  import {allgroup, groupChat} from 'src/service/getData';
  import {imgurl} from 'src/config/env';

  export default {
    data() {
      return {
        allPeople: [],
        imgurl: imgurl,
        gropname: '',
        looking: false,		//看全部
        notlook: false,		//多出隐藏
        lookgroup: false,	//查看全部群成员按钮
      }
    },
    created() {

    },
    computed: {},
    mounted() {
      allgroup().then((res) => {
        if (res.status == 200) {
          this.allPeople = res.users
          if (this.allPeople.length > 20) {
            this.lookgroup = true
            this.notlook = true;
          }
        } else {
          alert("获取数据失败，请检查网络是否正常！")
        }

      });
      groupChat().then((res) => {
        this.gropname = res.petname;
      });
    },

    components: {
      headTop,
    },
    methods: {
      lookAll() {
        this.notlook = false;
        this.looking = true;
        this.lookgroup = false;
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../../style/public";

  .router-show-enter-active, .router-show-leave-active {
    transition: all .4s;
  }

  .router-show-enter, .router-show-leave {
    transform: translateX(100%)
  }

  .child_page {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 203;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    background-color: #ebebeb;
  }

  .groupchat {
    padding-top: 2.9rem;
    background: #fff;
    padding: 2.9rem 0.8533333333rem 0;

    .groupchat_ul {
      box-sizing: border-box;

      li {
        float: left;
        margin-right: 0.8533333333rem;
        margin-bottom: 0.4266666667rem;
        width: 2.048rem;

        img {
          display: block;
          width: 2.048rem;
          height: 2.048rem;
        }

        span {
          display: block;
          width: 2.048rem;
          line-height: .7rem;
          font-size: 0.5333333333rem;
          color: #666;
          text-align: center;
          margin-top: 10px;
        }
      }

      li:nth-of-type(5n+5) {
        margin-right: 0;
      }
    }

    .beforeUl {
      max-height: 14rem;
      overflow: hidden;
    }

    .afterUl {
      overflow: auto;
      height: auto;
    }

    .lookmore {
      padding: 0.64rem 0 0.8533333333rem;
      text-align: center;
      @include sizeColor(0.64rem, #666);
    }
  }

  .chat {
    margin-top: 0.8533333333rem;

    .chatrecord {
      padding-left: 0.64rem;
      padding-bottom: 0.2133333333rem;
      @include sizeColor(0.6rem, #888);
    }

    ul {
      background: #fff;
      padding: 0 0.64rem;
      margin-bottom: 1rem;

      li {
        border-bottom: 1px solid #f1f1f1;
        padding: 0.4266666667rem 0;
        @include sizeColor(0.64rem, #333);
        @include justify;
        align-items: center;

        .voice-music {
          @include sizeColor(0.6rem, #9c9c9c);
        }
      }

      li:last-child {
        border: 0;
      }
    }

    .newshow {
      li {
        display: inherit;

        .newshow_choose {
          @include justify;
          align-items: center;
        }

        .newshow_text {
          @include sizeColor(0.5546666667rem, #909090);
          margin-top: 0.2133333333rem;
        }
      }
    }
  }
</style>
