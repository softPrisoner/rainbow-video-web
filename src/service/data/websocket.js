import {
  MESSAGE_AUDIO_REQUEST,
  MESSAGE_CIRCLE_REQUEST,
  MESSAGE_FRIEND_REQUEST,
  MESSAGE_MESSAGE_REQUEST,
  MESSAGE_VIDEO_REQUEST
} from "../reqtype";

export function initWebSocket(wx_id) {
  if (wx_id) {
    const ws_uri = "ws://192.168.43.52:8087/rainbow/" + wx_id;
    this.websock = new WebSocket(ws_uri);//这里面的this都指向vue
    this.websock.onopen = this.onWSOpen;
    this.websock.onmessage = this.onWSMessage;
    this.websock.onclose = this.onWSClose;
    this.websock.onerror = this.onWSError;
  }
}

export function onWSOpen() {//打开
  console.log("WebSocket连接成功")
}

export function onWSMessage(response) { //数据接收
  if (response.data.status === 200) {
    //正常确认包,不处理,三次握手
    if (response.data.type === MESSAGE_VIDEO_REQUEST || response.data.type === MESSAGE_AUDIO_REQUEST) {
      alert(JSON.stringify(JSON.parse(response.data)));
      const token = null;
      const room_name = response.data.data.room_name;
      const room_data = null;
      const room_id = response.data.data.room_id;
      const type = response.data.data.type;
      //JNI调用android摄像头
      callMedia.callAndroidMedia(token, room_name, room_data, room_id, type);
    } else if (MESSAGE_MESSAGE_REQUEST === response.data.type) {
      //如果是消息的话直接推送消息

    } else if (MESSAGE_CIRCLE_REQUEST === response.data.type) {
      //朋友圈请求的话希望是主动推送吗？

    } else if (MESSAGE_FRIEND_REQUEST === response.data.type) {
    }
  }
}

export function onWSClose() {  //关闭
  this.websock.close();
}

export function onWSError() {  //失败
}
