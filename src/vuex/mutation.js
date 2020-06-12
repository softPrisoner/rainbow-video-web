//写方法
import {
  CHANGE_RED,
  CHANGE_SHEETVISIBLE,
  COMPUTER_SHOW,
  GET_ALLGROUP,
  GET_USERINFO,
  LOGIN_COVER,
  RECORD_MUTE,
  SAVE_BEGINDIALOGUE,
  SAVE_DIALOGUE,
  SAVE_MESSAGE,
  SAVE_THEMIMG
} from './mutation-types.js'

export default {
  //记录是否电脑静音
  [RECORD_MUTE](state, mutestatus) {
    state.mute = mutestatus;
  },
  //是否电脑登录
  [COMPUTER_SHOW](state, computerstatus) {
    state.computershow = computerstatus;
  },
  //保存联系人信息
  [SAVE_MESSAGE](state, infor) {
    state.infor = {};
    state.infor = infor;
  },
  //获取的数据先保存
  [SAVE_BEGINDIALOGUE](state, arrayData) {
    state.contactList = arrayData;

  },
  //增加对话人列表
  [SAVE_DIALOGUE](state, obj) {
    state.contactList = [obj, ...state.contactList];
    //数组去重
    const newArr = new Set(state.contactList);
    state.contactList = [...newArr];
    alert(JSON.stringify(state.contactList))
  },
  //获取用户信息
  [GET_USERINFO](state, userInfo) {
    state.userInfo = userInfo
  },
  //上传主题图片
  [SAVE_THEMIMG](state, {
    newImg,
    imagestatus
  }) {
    state.newImg = newImg;
    state.imagestatus = imagestatus
  },
  //改变朋友圈红色提醒显隐
  [CHANGE_RED](state, firendwarn) {
    state.firendwarn = firendwarn;
  },
  //登录覆盖
  [LOGIN_COVER](state, consumerthing) {
    state.consumerthing = consumerthing;
  },
  //获取所有群聊人信息
  [GET_ALLGROUP](state, allgroup) {
    state.allgroup = allgroup
  },
  [CHANGE_SHEETVISIBLE](state, sheetVisible) {
    state.sheetVisible = sheetVisible;
  },
  // [SAVE_DIALOG](state, friend_wx_id, data) {
  //如果存在，直接将数据存入其中
  //如果不存在，将创建
  //   const newData = {
  //     friend_wx_id: [data]
  //   }
  //   var isFind = false;
  //   state.conversine.forEach(item => {
  //     if (item.friend_wx_id == friend_wx_id) {
  //       isFind = true;
  //       item.data.push(data)
  //     }
  //
  //   });
  //   if (false == isFind) {
  //     item.push(
  //       {
  //         "friend_wx_id": friend_wx_id,
  //         data: [data]
  //       }
  //     )
  //   } else
  //     state.conversine.push(newData)
  // }
  // }
}
