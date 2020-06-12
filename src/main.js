import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/router'
import store from './vuex/'
import './style/public.scss'
import './config/rem'
import FastClick from 'fastclick'
import Axios from 'axios'
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css'

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body);
  }, false);
}
Vue.use(VueRouter);
Vue.use(MintUI);
Vue.prototype.$axios = Axios;
Vue.prototype.$toast = MintUI.Toast;
//调用原生安卓手机功能
const router = new VueRouter({
  routes,
  mode: 'history', //路由模式
  strict: process.env.NODE_ENV !== 'production',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: to.meta.savedPosition || 0
      }
    }
  }
})
router.beforeEach((to, from, next) => {
  if (from.meta.keepAlive) {
    from.meta.savedPosition = document.body.scrollTop;
  }
  next()
})

new Vue({
  router,
  store,
}).$mount("#weixin")
