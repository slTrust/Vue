import Vue from 'vue'

import App from './App'
// 引入路由
import router from './router'
//路由守卫
import BeforeRouter from './router/router'

//引入axios 
import axios from 'axios'

//使用iview ui
import iview from 'iview'
import 'iview/dist/styles/iview.css';
Vue.use(iview)

// 引入工具包
import Util from './util/util'
// 引入接口
import API from './api/index'

//组件间通信 bus对象
let eventHub = new Vue();
Vue.prototype.eventHub = eventHub;

Vue.config.productionTip = false

//将请求方法挂载到Vue上
Vue.prototype.$http= axios

// 路由跳转之前的处理
BeforeRouter(router)

// 挂载实例
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
