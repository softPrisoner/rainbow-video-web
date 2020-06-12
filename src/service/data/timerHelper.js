export function updateTimeShow(time) {
  let localTime = new Date(); //当前系统时间
  let createTime = new Date(time) //消息创建时间
  // alert(createTime)
  let diff = localTime - createTime;
  if (diff < 1000)
    return '刚刚'
  else if (diff < (1000 * 60))
    return "1分钟内"
  else if (diff < 1000 * 60 * 60)
  //多少分钟
    return (parseInt(diff / (1000 * 60))) + '分钟前'
  else if (diff < 1000 * 60 * 60 * 24)
    return (parseInt(diff / (1000 * 60 * 60))) + '小时前'
  else if (diff < (1000 * 60 * 60 * 24 * 7))
    return (parseInt(diff / (1000 * 60 * 60 * 24))) + '天前'
  else if (diff < 1000 * 60 * 60 * 24 * 30) {
  }

}
