import Vue from 'vue'
import App from './App.vue'
// 适配方案
import 'lib-flexible/flexible.js'


new Vue({
  el: '#app',
  render: h => h(App)
})
