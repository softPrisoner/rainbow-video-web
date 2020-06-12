//处理数据
import {dialog} from 'src/service/getData'
import {GET_USERINFO, SAVE_BEGINDIALOGUE, SAVE_DIALOGUE} from './mutation-types.js'
import axios from 'axios'
import {contacts} from '../service/data/contacts'

export default {
  //获取用户信息
  async getUserInfo({
                      commit,
                      state
                    }) {
    const wx_id = window.localStorage.getItem('wx_id')
    if (wx_id) {
      axios.post(
        'http://192.168.43.52:8087/v1/user/get',
        {
          "wx_id": wx_id,
        }
      ).then(
        (response) => {
          if (response.status == 200) {
            let info = response.data
            if (info != null) {
              let res = info.data
              commit(GET_USERINFO, res)
            }
          }
        }
      ).catch(error => {
        alert(error);
      })
    }
    //用户信息
  },
  async getDialog({
                    commit,
                    state
                  }) {
    if (state.contactList.length > 0) return;
    let res = await dialog();

    commit(SAVE_BEGINDIALOGUE, res);
  }
  ,
  async getAddressList({
                         commit,
                         state
                       }) {
    //从缓存中加载用户wx_id
    const wx_id = window.localStorage.getItem('wx_id')
    if (wx_id) {
      await axios.post(
        'http://192.168.43.52:8087/v1/user/friend/get',
        {
          "wx_id": wx_id,
        }
      ).then(
        (response) => {
          if (response.status == 200) {
            let info = response.data
            let isEmpty = JSON.stringify(info.data)
            if (isEmpty != '[]') {
              let res = info.data
              alert("concat" + JSON.stringify(res))
              // alert(JSON.stringify(res ))
              //这里需要判断是否已经是好友了，如果是好友的话直接从list中添加好友
              //需要将数据存到localStore
              res.forEach(item => {
                let exsist = contacts.A.find((n) => n.wx_id == item.wx_id)
                if (!exsist) {
                  contacts.A.push(item)
                }
              })
              alert(JSON.stringify(contacts.A))
              commit(SAVE_DIALOGUE, res)
            }
          }
        }
      ).catch(error => {
        alert(error)
      })
    }
  }


}
