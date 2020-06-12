//朋友圈数据
/*
*wx_id:微信号
*head_url：微信头像
*sex:性别(男0女1)
*pet_name：昵称
*remarks：备注
*statements:发标的文字
*post_image:发表的图片
*like:点赞
*comment:评论
*
*reviewshow:	评论的弹层显示时的动画
*reviewhide: 	评论的弹层消失时的动画
*criticism:		评论的弹层是否显示
*flag:			点击判断
*suporthtml:	赞

*/

import {imgurl} from 'src/config/env';

export const circle = [
  {
    "wx_id": "wx812571880",
    "head_url": imgurl + 'chen.jpg',
    "pet_name": "遮光之门",
    "sex": 1,
    "remarks": "",
    "statements": "星光和梦同在",
    "time": "5分钟前",
    "post_image": [
      imgurl + 'chen.jpg', imgurl + 'cd.jpg', imgurl + 'cc.jpg', imgurl + 'h.jpg', imgurl + 'aaa  .jpg', imgurl + 'fengmian.jpg',
    ],
    "like": [
      "嗯", //remarks?remarks:pet_name
    ],
    "comment": [
      {
        "wxid": "enen",
        "petname": "嗯",
        "remarks": "嗯",
        "commentext": "看好你呦！"
      },
      {
        "wxid": "achuqiao",
        "petname": "a楚乔",
        "remarks": "楚乔",
        "commentext": "披荆斩棘",
      },
    ],
    "reviewshow": false,
    "reviewhide": false,
    "criticism": false,
    "flag": true,
    "suporthtml": "赞",
  }
]

