//对话列表
/*
*
*headurl:对话人头像
*remarks:对话人名字
*newmeassage:对话最新一条消息
*sendobject:发送信息的对象(1是别人0是自己)
*Messageblob:消息内容
*/
import {imgurl} from 'src/config/env';

export const dialog = [
  {
    "wx_id": "fileTransfer",
    "head_url": imgurl + 'robot.jpg',
    "pet_name": "张学友",
    "remarks": "你好我是张学友",
    "new_message": "请从通讯录的联系人进入机器人单人聊天",
    "send_object": 1,
  },
]
