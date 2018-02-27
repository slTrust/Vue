// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import 'lib-flexible'


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  mounted(){
    console.log( this.$router.push)
    setTimeout(function(){
      //添加一个路由
      //router.push({path:'login'});
      //替换路由      
      //router.replace({path:'user'});
    },1000)
  }
})
