//我的收藏
/*通讯录所以联系人
*	wxid:微信号
*	headurl:头像图片地址
*	petname:昵称
*	sex:性别(男0女1)
*	remarks:备注
*collect_text:收藏的文本
*collect_img:收藏的图片
*	collect_time:收藏的时间
*
*
*	imgurl:图片地址
*/

import {imgurl} from 'src/config/env';

export const collect = [
  {
    "wx_id": "wx23423434",
    "head_url": imgurl + 'chuqiao.jpg',
    "pet_name": "张杰",
    "sex": 1,
    "remarks": "张杰",
    "collect_text": "哈哈哈哈哈哈哈",
    "collect_img": "",
    "collect_time": "今天",
  },
  {
    "wx_id": "wx34234234",
    "head_url": imgurl + 'caiwei.jpg',
    "pet_name": "消防官兵",
    "sex": 1,
    "remarks": "",
    "collect_text": "",
    "collect_img": imgurl + 'd.jpg',
    "collect_time": "昨天",
  },
  {
    "wx_id": "wx43423423423",
    "head_url": imgurl + 'liangshaoqing.jpg',
    "pet_name": "归尘黎月",
    "sex": 0,
    "remarks": "",
    "collect_text": "",
    "collect_img": imgurl + 'd.jpg',
    "collect_time": "昨天",
  },
  {
    "wx_id": "wx3323232142",
    "head_url": imgurl + 'chenchangsheng.jpg',
    "pet_name": "刘德华",
    "sex": 0,
    "remarks": "",
    "collect_text": "思落",
    "collect_img": "",
    "collect_time": "昨天",
  },
  {
    "wx_id": "wx323324234234",
    "head_url": imgurl + 'yuwenyue.jpg',
    "pet_name": "死亡宣告",
    "sex": 0,
    "remarks": "",
    "collect_text": "",
    "collect_img": imgurl + 'chenyuan.jpg',
    "collect_time": "昨天",
  },
]

