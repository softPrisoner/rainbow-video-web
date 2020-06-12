<template>
  <div class="dialogue">
    <div class="component-dialogue-bar-person">
      <div class="chat-way">
        <div class="chat-say" v-press>
          <span class="one" style="font-size: 1.485rem" >按住 说话</span>
          <span class="two">松开 结束</span>
        </div>
      </div>
      <div class="recording" style="display: none;" id="recording">
        <div class="recording-voice" style="display:none;" id="recording-voice">
          <div class="voice-inner">
            <div class="voice-icon"></div>
            <div class="voice-volume">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <p style="font-size: 0.625rem;alignment: bottom;margin-top: 4.5rem">手指上划,取消发送</p>
        </div>
        <div class="recording-cancel" style="display: none;">
          <div class="cancel-inner">
          </div>
          <p style="font-size: 0.465rem">松开手指,取消发送</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        pageName: this.$route.query.name,
        currentChatWay: true, //ture为键盘打字 false为语音输入
        timer: null
        // sayActive: false // false 键盘打字 true 语音输入
      }
    },

    directives: {
      press: {
        inserted(element, binding) {
          var recording = document.querySelector('.recording'),
            recordingVoice = document.querySelector('.recording-voice'),
            recordingCancel = document.querySelector('.recording-cancel'),
            startTx, startTy;

          element.addEventListener('touchstart', function (e) {
            // 用bind时，vue还没插入到dom,故dom获取为 undefine，用 inserted 代替 bind,也可以开个0秒的定时器
            element.className = "chat-say say-active"
            recording.style.display = recordingVoice.style.display = "block"
            // console.log('start')
            var touches = e.touches[0]
            startTx = touches.clientX
            startTy = touches.clientY
            e.preventDefault()
          }, false)
          element.addEventListener('touchend', function (e) {
            element.className = "chat-say"
            recordingCancel.style.display = recording.style.display = recordingVoice.style.display = "none"
            // console.log('end')
            e.preventDefault()
          }, false)
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
            e.preventDefault()
          }, false);
        }
      },
      more: {
        bind(element, binding) {
          var startTx, startTy
          element.addEventListener('touchstart', function (e) {
            var msgMore = document.getElementById('msg-more'),
              touches = e.touches[0];
            startTx = touches.clientX
            startTy = touches.clientY

            clearTimeout(this.timer)
            this.timer = setTimeout(() => {
              // 控制菜单的位置
              msgMore.style.left = ((startTx - 18) > 180 ? 180 : (startTx - 18)) + 'px'
              msgMore.style.top = (element.offsetTop - 33) + 'px'
              msgMore.style.display = "block"
              element.style.backgroundColor = '#e5e5e5'
            }, 500)
          }, false)
          element.addEventListener('touchmove', function (e) {
            var touches = e.changedTouches[0],
              disY = touches.clientY;
            if (Math.abs(disY - startTy) > 10) {
              clearTimeout(this.timer)
            }
          }, false)
          element.addEventListener('touchend', function (e) {
            clearTimeout(this.timer)
          }, false)
        }
      }
    },
    methods: {
      // 解决输入法被激活时 底部输入框被遮住问题
      focusIpt() {
        this.timer = setInterval(function () {
          document.body.scrollTop = document.body.scrollHeight
        }, 100)
      },
      blurIpt() {
        clearInterval(this.timer)
      },
      // 点击空白区域，菜单被隐藏
      MenuOutsideClick(e) {
        var container = document.querySelectorAll('.text'),
          msgMore = document.getElementById('msg-more')
        if (e.target.className === 'text') {
        } else {
          msgMore.style.display = 'none'
          container.forEach(item => item.style.backgroundColor = '#fff')
        }
      }
    }
  }
</script>
<style>
  @import "../assets/css/dialogue.css";

  .say-active {
    background: #c6c7ca;
  }
</style>
