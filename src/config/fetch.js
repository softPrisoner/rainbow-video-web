import {baseUrl} from './env'
import axios from 'axios'

export default async (url = '', data, type = 'GET') => {
  type = type.toUpperCase();
  url = baseUrl + url;
  let result;
  if (type == 'GET') {
    let dataStr = ''; //数据拼接字符串
    Object.keys(data).forEach(key => {
      dataStr += key + '=' + data[key] + '&';
    })
    if (dataStr !== '') {
      //去除最后一个&
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
      url = url + '?' + dataStr;
    }
    axios.get(url).then(response => {
      if (response.status == 200) {
        result = response.data
      } else {
        //服务器异常
      }
    })
  } else if (type == 'POST') {
    axios.post(url, {
      'wx_id': data.wx_id
    }).then(response => {
      result = response.data
    }).catch(error => {
      //发生异常，需要处理
    })
  }
  return result;
}
