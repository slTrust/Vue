# no

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

# 去除默认样式引入base.css

``` bash
#  src/assets/css/base.css
引入的时候在App.vue里的style上
@import './assets/css/base.css';
```

# 移动端适配

> step1 安装依赖

```
npm i lib-flexible  postcss-px2rem --save-dev
```

> step2 引入相关模块 

```
# main.js
import 'lib-flexible'
```
> step3 修改.postcssrc.js 添加如下插件

```
"postcss-px2rem":{
      remUnit: 75
}
```

# 加载图片资源

```
//组件内两种方式   引入src/assets里的或者  静态目录的 static
import img from '../assets/logo.png';
export default {
  name: 'Login',
  data () {
    return {
      msg: 'Welcome to IF+',
      img:img,
      img2:'../../static/img/aa.png'
    }
  }
}


...
# 页面使用
<img :src="img" alt="">
<img :src="img2" alt="">

# .vue里的style里使用
#box{
    background:url('../../static/img/aa.png') no-repeat;
}
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
