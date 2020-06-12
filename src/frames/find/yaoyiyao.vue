<template xmlns:v-touch="http://www.w3.org/1999/xhtml">
  <div class="_full_router component-yao-yi-yao">

    <head-top class="qr-head-top" crossover="微信摇一摇"></head-top>
    <div class="_full_inner">
      <top-handle :back-text="topModel.backText" :cur-text="topModel.curText" :decline="decline"
                  :next-path="topModel.nextPath" :next-icon="topModel.nextIcon">
      </top-handle>
      <div class="_cover-content _effect" :class="{'_effect--30':decline}">
        <div class="yao-yi-yao-panel">
          <div class="mobile-hand">
            <audio src="yaoyiyao.mp3" ref="shakeAudio">
              您的浏览器不支持 audio 标签。
            </audio>
          </div>
        </div>
        <!--<div>-->
        <!--<dic name="yao-left"></dic>-->
        <!--<img :src="info.head_url"/>-->
        <!--<router-link :to="`/details/info.wx_id`"></router-link>-->
        <!--<div name="yao-right">-->
        <!--&lt;!&ndash;{{map.distance}}&ndash;&gt;-->
        <!--</div>-->
        <!--</div>-->
        <ul class="yao-yi-yao-footer">
          <li v-for="item in menu" :class="[item.type,{'current':current===$index}]" v-touch:tap='chooseItem($index)'>
            <div @click="shakeEventDidOccur"></div>
            <p v-text="item.name"></p>
          </li>
        </ul>
      </div>
    </div>
    <!-- router -->
    <router-view transition="cover"></router-view>
  </div>
</template>
<script>
  import headTop from 'src/components/header/head'
  import Shake from 'shake.js'

  export default {
    vuex: {
      getters: {},
      actions: {}
    },
    route: {
      activate({
                 from,
                 to,
                 next
               }) {
        //do something...
        this.$parent.$emit('route-pipe', true)
        next()
      },
      deactivate({
                   from,
                   to,
                   next
                 }) {
        this.$parent.$emit('route-pipe', false)
        next()
      }
    },
    data() {
      return {
        decline: false,
        current: 0,
        info: {},
        menu: [{
          type: 'people',
          name: '人',
        }, {
          type: 'music',
          name: '歌曲',
        }, {
          type: 'tv',
          name: '电视',
        }],

        topModel: {
          backText: '返回',
          curText: '摇一摇',
          nextPath: {
            path: ''
          },
          nextIcon: ''
        }
      }
    },
    methods: {
      chooseItem(index) {
        this.current = index;
      },
      // 摇动的回调函数
      shakeEventDidOccur() {
        // 获取音频标签
        const wx_id = window.localStorage.getItem("wx_id");
        let audio = this.$refs.shakeAudio;
        // 播放音频
        audio.play();
        this.$axios.post("http://192.168.174.132", {
          "wx_id": wx_id
        }).then(response => {
          if (response.status == 200) {
            alert(response.data.data);
            this.info = response.data.data;
            // if (window.navigator.vibrate) {
            //   navigator.vibrate(500)
            // }
            //直接从redis生成一个随机数，然后根据数量进行莫运算
            //先找到两个正在摇一摇的人，随机匹配，匹配完成后从表中清除，
            // 清除完成后，将数据通过wesocket通知双方，双发接受数据后，可以查看对方信息
            //获取相应下标，找到对应的人，并通过websocket通知对方，
            //websocket通知双方

          }
        })
      }
    }
    ,
    events: {
      'route-pipe'(_decline) {
        this.decline = _decline
        this.$parent.$emit('route-pipe', _decline)
      }
    }
    ,
    created() {

    }
    ,
    ready() {

    }
    ,
    mounted() {
      // 实例化一个 shake 对象
      let myShakeEvent = new Shake({
        threshold: 20, // 默认摇动阈值
        timeout: 1200 // 默认两次事件间隔时间
      })
      // 监听设备的动作
      myShakeEvent.start();
      // 添加一个事件监听
      window.addEventListener('shake', this.shakeEventDidOccur, false);
    }
    ,
    components: {
      headTop
    }
  }
</script>
<style scoped>
  ._cover-content {
    color: #979797;
    background-color: #2d3031;
  }

  .yao-yi-yao-panel {
    height: calc(100% - 90px);
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .yao-yi-yao-panel .mobile-hand {
    margin-top: 12rem;
    width: 50%;
    padding-top: 50%;
    background-image: url(../../assets/images/yao-yi-yao/mobile-hand.png);
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;
  }

  .yao-yi-yao-footer {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 20px;
    width: 100%;
    left: 0;
  }

  .yao-yi-yao-footer li {
    size: 2rem;
    margin-right: 1rem;
    text-align: center;
    padding: 0 20px;
  }

  .yao-yi-yao-footer li div {
    width: 40px;
    height: 40px;
    margin-bottom: 5px;
    background-size: contain;
    background-repeat: no-repeat;
  }


  .yao-yi-yao-footer li.people div {
    background-image: url(../../assets/images/yao-yi-yao/shake_icon_people.png);
  }

  .yao-yi-yao-footer li.music div {
    background-image: url(../../assets/images/yao-yi-yao/shake_icon_music.png);
  }

  .yao-yi-yao-footer li.tv div {
    background-image: url(../../assets/images/yao-yi-yao/shake_icon_tv.png);
  }

  .yao-yi-yao-footer li.people.current div {
    background-image: url(../../assets/images/yao-yi-yao/shake_icon_people-hl.png);
  }

  .yao-yi-yao-footer li.music.current div {
    background-image: url(../../assets/images/yao-yi-yao/shake_icon_music-hl.png);
  }

  .yao-yi-yao-footer li.tv.current div {
    background-image: url(../../assets/images/yao-yi-yao/shake_icon_tv-hl.png);
  }

</style>
