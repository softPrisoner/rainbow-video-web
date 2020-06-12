export function ackMessage(wx_id, message_id) {

  this.$axios.post("http://192.168.43.52:8087/v1/msg/ack", {
    "wx_id": wx_id,
    "message_id": message_id
  })
    .then(response => {
      if (reponse.data.status == 200) {
        alert("确认消息成功")
      }
    }).catch(error => {
    log.error("网络异常")
  })
}
