/*通讯录所以联系人
*	wx_id:微信号
*	head_url:头像图片地址
*	pet_name:昵称
*	sex:性别(男0女1)
*	remarks:备注
* sdasd:个性签名
*	phone:电话号码
*	gallery:相册
*	district:地区
*	source:添加来源
*	Messageblob:对话内容,
*	newmeassage:对话最新一条消息
*	sendobject:发送信息的对象(1是别人0是自己)
*
*
*
*	imgurl:图片地址
*/
import {imgurl} from 'src/config/env';
//同学录数据
export const contacts = {
  A:
    [
      {
        "wx_id": "wx_wavvv222",
        "head_url": imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png',
        "pet_name": "a张杰",
        "sex": 1,
        "remarks": "小明",
        "sdasd": "披荆斩棘",
        "phone": "15638509418",
        "gallery": [
          imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png', imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png', imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png'
        ],
        "district": "中国",
        "source": "通过搜索手机号添加",
        "newmeassage": "你号码",
        "message_blob": "",
        "sendobject": 1
      }
    ],
  B:
    [],
  C:
    [
      {
        "wx_id": "wx_wavvv222",
        "head_url": imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png',
        "pet_name": "归尘黎月",
        "sex": 0,
        "remarks": "",
        "sdasd": "2015郑大快毕业了",
        "phone": "13002566500",
        "district": "中国",
        "gallery": [
          imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png', imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png', imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png'
        ],
        "source": "通过搜索微信号添加",
        "newmeassage": "最近还好吗",
        "sendobject": 1,
        "Messageblob": "",
      }
    ],
  D:
    [
      {
        "wx_id": "wx_wavvv222",
        "head_url": imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png',
        "pet_name": "丁澜",
        "sex": 0,
        "remarks": "临惜",
        "sdasd": "",
        "phone": "13002566500",
        "gallery": [
          imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png', imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png', imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png'
        ],
        "district": "艾尔巴尼亚",
        "source": "通过搜索微信号添加",
        "newmeassage": "看过中国好声音吗?",
        "sendobject": 1,
        "Messageblob": "",
      }
    ],
  E:
    [],
  F:
    [
      {
        "wx_id": "wx_wavvv222",
        "head_url": imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png',
        "pet_name": "风眠",
        "sex": 0,
        "remarks": "风眠",
        "sdasd": "",
        "phone": "13002566500",
        "gallery": [
          imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png', imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png', imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png'
        ],
        "district": "燕洵的书童",
        "source": "通过群聊添加",
        "newmeassage": "看过中国好声音吗?",
        "sendobject": 1,
        "Messageblob": "",
      }
    ],
  G:
    [],
  H:
    [
      {
        "wx_id": "wx_wavvv222",
        "head_url": imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png',
        "pet_name": "贺萧",
        "sex": 0,
        "remarks": "",
        "sdasd": "",
        "phone": "13002566500",
        "gallery": [
          imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png', imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png', imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png'
        ],
        "district": "中国",
        "source": "通过搜索手机号添加",
        "source1": "通过群聊添加",
        "newmeassage": "今年都快要毕业了",
        "sendobject": 1,
        "Messageblob": "",
      }
    ],
  I:
    [],
  J:
    [
      {
        "wx_id": "wx_wavvv222",
        "head_url": imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png',
        "pet_name": "啊啊啊啊",
        "sex": 0,
        "remarks": "",
        "sdasd": "",
        "phone": "13000000000",
        "gallery": [
          imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png', imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png', imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png'
        ],
        "district": "啊啊啊啊",
        "source": "通过群聊添加",
        "newmeassage": "春节发现，原来“喜新厌旧”还可以说成“辞旧迎新”这般高尚！",
        "sendobject": 1,
        "Messageblob": "",
      },
      {
        "wx_id": "wx_wavvv222",
        "head_url": imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png',
        "pet_name": "不不不",
        "sex": 1,
        "remarks": "",
        "sdasd": "",
        "phone": "13000000000",
        "gallery": [
          imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png', imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png', imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png'
        ],
        "district": "中国",
        "source": "通过群聊添加",
        "newmeassage": "aaaaacxxxx”",
        "sendobject": 1,
        "Messageblob": "",
      },
    ],
  K:
    [],
  L:
    [
      {
        "wx_id": "wx_wavvv222",
        "head_url": imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png',
        "pet_name": "啊啊啊啊",
        "sex": 1,
        "remarks": "哎哎哎",
        "sdasd": "",
        "phone": "13000000000",
        "gallery": [
          imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png', imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png', imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png'
        ],
        "district": "大魏淑仪，来历成谜。",
        "source": "通过群聊添加",
        "newmeassage": "名人用过的东西叫“文物”；凡人用过的视为“废物”。",
        "sendobject": 1,
        "Messageblob": "",
      },
      {
        "wx_id": "wx_wavvv222",
        "head_url": imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png',
        "pet_name": "还在吗",
        "sex": 0,
        "remarks": "",
        "sdasd": "",
        "phone": "13000000000",
        "gallery": [
          imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png', imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png', imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png'
        ],
        "district": "中国",
        "source": "通过搜索手机号添加",
        "newmeassage": "sdadasdasdasdsa。",
        "sendobject": 1,
        "Messageblob": "",
      },
      {
        "wx_id": "wx_wavvv222",
        "head_url": imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png',
        "pet_name": "李策",
        "sex": 0,
        "remarks": "",
        "sdasd": "默默守护",
        "phone": "13000000000",
        "gallery": [
          imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png', imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png', imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png'
        ],
        "district": "中国",
        "source": "通过群聊添加",
        "newmeassage": "名人蓬头垢面谓“艺术气质”；凡人不修边幅叫“流里流气”。",
        "sendobject": 1,
        "Messageblob": "",
      },
    ],
  M:
    [
      {
        "wx_id": "wx_wavvv222",
        "head_url": imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png',
        "pet_name": "蒙枫",
        "sex": 1,
        "remarks": "",
        "sdasd": "dasdadas！",
        "phone": "13000000000",
        "gallery": [
          imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png', imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png', imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png'
        ],
        "district": "中国",
        "source": "通过搜索手机号添加",
        "newmeassage": "名人的空话谓“指导”；凡人的实话叫“唠叨”。",
        "sendobject": 1,
        "Messageblob": "",
      },
    ],
  N:
    [],
  O:
    [],
  P:
    [],
  Q:
    [],
  R:
    [],
  S:
    [
      {
        "wx_id": "wx_wavvv222",
        "head_url": imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png',
        "pet_name": "asdadsadasd",
        "sex": 1,
        "remarks": "",
        "sdasd": "asdasdsadasdas~",
        "phone": "13000000000",
        "gallery": [
          imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png', imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png', imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png'
        ],
        "district": "中国",
        "source": "通过群聊添加",
        "newmeassage": "dasdadasdadasdsa。",
        "sendobject": 1,
        "Messageblob": "",
      },
    ],
  T:
    [],
  U:
    [],
  V:
    [],
  W:
    [
      {
        "wx_id": "wx_wavvv222",
        "head_url": imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png',
        "pet_name": "dadadsadas",
        "sex": 0,
        "remarks": "",
        "sdasd": "sadadsad~",
        "phone": "13000000000",
        "gallery": [
          imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png', imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png', imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png'
        ],
        "district": "sadasdasd",
        "source": "通过群聊添加",
        "newmeassage": "dasdasdasdasdasdasdassd",
        "sendobject": 1,
        "Messageblob": "",
      },
    ],
  X:
    [
      {
        "wx_id": "wx_wavvv222",
        "head_url": imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png',
        "pet_name": "sdadsad",
        "sex": 1,
        "sdasd": "sadasdsadas",
        "phone": "15800319949",
        "sendobject": 1,
        "gallery": [
          imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png', imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png', imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png'
        ],
        "district": "dasdad dsadadsa",
        "newmeassage": "dadas，dasdadsadadasdada",
        "Messageblob": "",
      },
      {
        "wx_id": "wx_wavvv222",
        "head_url": imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png',
        "pet_name": "dasdadas",
        "sex": 1,
        "remarks": "dsadad",
        "sdasd": "dasdasd，dasdadsa~",
        "phone": "13000000000",
        "gallery": [
          imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png', imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png', imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png'
        ],
        "district": "中国",
        "source": "通过群聊添加",
        "newmeassage": "dadadasdasdasda",
        "sendobject": 1,
        "Messageblob": "",
      },
      {
        "wx_id": "wx_wavvv222",
        "head_url": imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png',
        "pet_name": "aaaaaa",
        "sex": 1,
        "remarks": "",
        "sdasd": "dasdadasdasda~",
        "phone": "13000000000",
        "gallery": [
          imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png', imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png', imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png'
        ],
        "district": "中国",
        "source": "通过群聊添加",
        "newmeassage": "dsadasdasdadasdasdasda。 ",
        "sendobject": 1,
        "Messageblob": "",
      }
    ],
  Y:
    [
      {
        "wx_id": "wx_wavvv222",
        "head_url": imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png',
        "pet_name": "dsdasda",
        "sex": 0,
        "remarks": "",
        "sdasd": "dsdasdadas",
        "phone": "13000000000",
        "gallery": [
          imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png', imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png', imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png'
        ],
        "district": "dsadas",
        "source": "通过群聊添加",
        "newmeassage": "dasdad；dasdada；dasdad；dadadasd。",
        "sendobject": 1,
        "Messageblob": "",
      },
      {
        "wx_id": "wx_wavvv222",
        "head_url": imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png',
        "pet_name": "dasdasd",
        "sex": 1,
        "remarks": "",
        "sdasd": "dasdasd",
        "phone": "13000000000",
        "gallery": [
          imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png', imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png', imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png'
        ],
        "district": "dadsadas",
        "source": "通过群聊添加",
        "newmeassage": "dsadads；dsadasda；dsadas；sda。",
        "sendobject": 1,
        "Messageblob": "",
      },
    ],
  Z:
    [
      {
        "wx_id": "wx_wavvv222",
        "head_url": imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png',
        "pet_name": "adsdsdas",
        "sex": 0,
        "remarks": "",
        "sdasd": "avaddasdsds",
        "phone": "13000000000",
        "gallery": [
          imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png', imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png', imgurl + 'wx_wavvv222/2019/04/07/1554647719086790.png'
        ],
        "district": "大魏十三皇子",
        "source": "通过群聊添加",
        "newmeassage": "翼德是莽撞的；粗中是有细的；嗓门是挺大的；睡觉是睁眼的。",
        "sendobject": 1,
        "Messageblob": "",
      },
    ]
}
