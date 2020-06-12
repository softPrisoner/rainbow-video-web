//获取图片地址基础地址
const imgurl = 'http://192.168.43.173/';
let baseUrl;
if (process.env.NODE_ENV == 'development') {
  baseUrl = 'http://192.168.43.52:8087'
} else {
  baseUrl = 'http://192.168.43.52:8087'
}
export {
  baseUrl,
  imgurl
}
